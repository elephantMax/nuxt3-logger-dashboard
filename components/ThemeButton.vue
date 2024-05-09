<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

const icon = computed(() => {
  if (isDarkMode.value) {
    return 'i-heroicons-moon-solid';
  }
  return 'i-heroicons-sun-solid';
});

const toggleTheme = () => {
  colorMode.value = isDarkMode.value ? 'light' : 'dark';
};
</script>

<template>
  <UButton
    :icon="icon"
    color="gray"
    @click="toggleTheme"
  />
</template>
