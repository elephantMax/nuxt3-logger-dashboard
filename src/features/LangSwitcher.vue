<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();

const changeLanguageHandler = (locale: string) => {
  setLocale(locale);
};
</script>

<template>
  <USelect
    :model-value="locale"
    :options="locales"
    option-attribute="name"
    value-attribute="code"
    @change="changeLanguageHandler"
  />
</template>
