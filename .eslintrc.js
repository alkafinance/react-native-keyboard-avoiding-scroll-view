/** @type {import('@alkafinance/eslint-config/eslint').ESLintConfig} */
module.exports = {
  extends: [
    '@alkafinance/eslint-config',
    '@alkafinance/eslint-config-typescript',
    '@alkafinance/eslint-config-react/native',
    '@alkafinance/eslint-config-typescript/react-native',
  ],
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    '@typescript-eslint/no-magic-numbers': 'off',
    // https://github.com/benmosher/eslint-plugin-import
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // https://github.com/Intellicode/eslint-plugin-react-native
    'react-native/no-color-literals': 'off',
  },
  overrides: [
    {
      files: ['*.js', '**/.*.js'],
      ...require('@alkafinance/eslint-config/script'),
    },
  ],
};
