export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      dashboard: 'Dashboard',
      logout: 'Logout',
      projects: 'Projects',
      api_keys: 'API keys',
    },
    ru: {
      dashboard: 'Панель управления',
      logout: 'Выйти',
      projects: 'Проекты',
      api_keys: 'API ключи',
    },
  },
}));
