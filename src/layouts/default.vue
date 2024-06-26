<script setup lang="ts">
import { useAuthStore } from '~/shared/stores/auth-store';

const route = useRoute();
const { t } = useI18n();

const authStore = useAuthStore();

const links = computed<{ text: string; link: string; icon: string }[]>(() => {
  return [
    {
      text: t('dashboard'),
      link: '/dashboard',
      icon: 'i-heroicons-rectangle-group',
    },
    {
      text: t('projects'),
      link: '/dashboard/projects',
      icon: 'i-heroicons-folder',
    },
    {
      text: t('api_keys'),
      link: '/dashboard/api',
      icon: 'i-heroicons-key',
    }];
});

const pageTitle = computed<string>(() => {
  if (typeof route.meta.title === 'string') {
    return route.meta.title;
  }
  return '';
});

useHead({
  title() {
    return `Web Logger - ${pageTitle.value}`;
  },
});
</script>

<template>
  <div class="flex flex-col h-full">
    <header class="flex">
      <NuxtLink
        to="/"
        class="p-4 flex items-center border-r-2 border-b-2 min-w-[250px] justify-center"
      >
        <UIcon
          name="i-heroicons-home"
          class="size-7 text-primary cursor-pointer"
        />
      </NuxtLink>
      <div class="p-4 flex items-center pr-10 border-b-2 w-full justify-between">
        <h1 class="text-xl">
          {{ pageTitle }}
        </h1>
        <div class="flex gap-2">
          <theme-switcher />
          <lang-switcher />
        </div>
      </div>
    </header>
    <div class="h-full flex">
      <aside class="flex flex-col border-r-2 min-w-[250px]">
        <div class="p-4 border-b-2 text-center">
          <span class="text-lg">
            {{ authStore.userName }}
          </span>
        </div>

        <div class="p-4 border-b-2 h-full">
          <ul class="flex flex-col gap-2">
            <li
              v-for="link in links"
              :key="link.text"
              class="flex items-center gap-2"
            >
              <UIcon
                :name="link.icon"
                class="size-5"
              />
              <NuxtLink
                :to="link.link"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="p-4 border-b-2">
          <logout-button class="w-full" />
        </div>
      </aside>
      <main class="p-4">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
