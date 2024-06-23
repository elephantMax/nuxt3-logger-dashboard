<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { useAuthStore } from '~/shared/stores/auth-store';
import { isValidationError } from '~/shared/api/exceptions';

const authStore = useAuthStore();

const formSchema = toTypedSchema(z.object({
  login: z.string().min(1),
  password: z.string().min(1),
}));

const { defineField, handleSubmit, meta, errors, setFieldError } = useForm({
  validationSchema: formSchema,
  initialValues: {
    login: '',
    password: '',
  },
});

const [login, loginProps] = defineField('login');
const [password, passwordProps] = defineField('password');

const submitHandler = handleSubmit(async (form) => {
  try {
    await authStore.login(form.login, form.password);
    navigateTo('/dashboard');
  }
  catch (error) {
    if (isValidationError(error)) {
      const { errors } = error.data.data;

      Object.keys(errors).forEach((key) => {
        if (key in errors) {
          setFieldError(key as 'login' | 'password', errors[key]);
        }
      });
    }
  }
});
</script>

<template>
  <form
    class="flex flex-col items-start gap-2"
    @submit.prevent="submitHandler"
  >
    <div class="flex flex-col gap-2 w-full">
      <label>{{ $t('login_label') }}</label>
      <BaseInput
        v-model="login"
        v-bind="loginProps"
        data-test="login-input"
        :validation="{
          isInValid: !!errors.login,
          message: errors.login,
        }"
        type="text"
        placeholder="Login"
      />
    </div>
    <div class="flex flex-col gap-2 mb-2 w-full">
      <label>{{ $t('password_label') }}</label>
      <BaseInput
        v-model="password"
        v-bind="passwordProps"
        :validation="{
          isInValid: !!errors.password,
          message: errors.password,
        }"
        data-test="password-input"
        type="password"
        placeholder="Password"
      />
    </div>
    <UButton
      :disabled="!meta.valid || meta.pending"
      :label="$t('sign_in_button')"
      type="submit"
    />
  </form>
</template>
