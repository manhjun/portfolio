// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Stylistic choices
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
        },
        singleline: {
          delimiter: 'semi',
        },
      },
    ],
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/operator-linebreak': 'off',

    // Vue-specific stylistic overrides
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
  },
});
