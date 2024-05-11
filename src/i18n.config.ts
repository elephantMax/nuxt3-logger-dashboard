export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      dashboard: 'Dashboard',
      logout: 'Logout',
      projects: 'Projects',
      api_keys: 'API keys',
      login_label: 'Login',
      password_label: 'Password',
      sign_in_button: 'Sign in',
    },
    ru: {
      dashboard: 'Панель управления',
      logout: 'Выйти',
      projects: 'Проекты',
      api_keys: 'API ключи',
      login_label: 'Логин',
      password_label: 'Пароль',
      sign_in_button: 'Войти',
    },
  },
}));
