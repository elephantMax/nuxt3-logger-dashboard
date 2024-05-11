<script setup lang="ts">
const formData = reactive({
  login: '',
  password: '',
});

const submitHandler = () => {
  console.log(formData);

  navigateTo('/dashboard');
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
        type="text"
        placeholder="Login"
      />
    </div>
    <div class="flex flex-col gap-2 mb-2">
      <label>{{ $t('password_label') }}</label>
      <UInput
        v-model="formData.password"
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
