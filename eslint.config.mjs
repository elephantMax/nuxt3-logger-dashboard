import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({}).overrideRules({
  '@typescript-eslint/ban-ts-comment': 'off',
});
