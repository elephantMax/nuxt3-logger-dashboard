<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'unauthorized',
});
</script>

<template>
  <div class="border py-2 px-4 rounded">
    <h1 class="text-2xl mb-2">
      {{ $t('sign_in_button') }}
    </h1>
    <LoginForm class="w-[300px]" />
  </div>
</template>
