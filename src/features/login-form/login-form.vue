<script setup lang="ts">
import { useAuthStore } from '~/shared/stores/auth-store';

const authStore = useAuthStore();

const formData = reactive({
  login: '',
  password: '',
});

const submitHandler = async () => {
  try {
    await authStore.login(formData.login, formData.password);
    navigateTo('/dashboard');
  }
  catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <form
    class="flex flex-col items-start gap-2"
    @submit.prevent="submitHandler"
  >
    <div class="flex flex-col gap-2">
      <label>{{ $t('login_label') }}</label>
      <UInput
        v-model="formData.login"
        data-test="login-input"
        type="text"
        placeholder="Login"
      />
    </div>
    <div class="flex flex-col gap-2 mb-2">
      <label>{{ $t('password_label') }}</label>
      <UInput
        v-model="formData.password"
        data-test="password-input"
        type="password"
        placeholder="Password"
      />
    </div>
    <UButton
      :label="$t('sign_in_button')"
      type="submit"
    />
  </form>
</template>
