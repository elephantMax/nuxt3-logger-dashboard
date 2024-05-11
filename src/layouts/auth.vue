<template>
  <main class="h-full container mx-auto px-4 flex items-center justify-center">
    <div class="absolute top-4 right-10 flex gap-2">
      <ThemeSwitcher />
      <LangSwitcher />
    </div>
    <div class="min-h-[300px] min-w-[300px] max-h-[600px]">
      <NuxtPage />
    </div>
  </main>
</template>
