<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <div class="border py-2 px-4 rounded">
    <h1 class="text-2xl mb-2">
      {{ $t('sign_in_button') }}
    </h1>
    <LoginForm />
  </div>
</template>
