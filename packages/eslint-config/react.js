/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/warnings',
  ],
  overrides: [
    {
      files: ['*.stories.tsx', 'src/pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.mock.ts'],
      rules: {
        'max-lines': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'pathGroups': [
          { pattern: '@/components/**', group: 'internal', position: 'before' },
          { pattern: '@/config/**', group: 'internal', position: 'before' },
          { pattern: '@/features/**', group: 'internal', position: 'before' },
          { pattern: '@/hooks/**', group: 'internal', position: 'before' },
          { pattern: '@/layouts/**', group: 'internal', position: 'before' },
          { pattern: '@/libs/**', group: 'internal', position: 'before' },
          { pattern: '@/schemas/**', group: 'internal', position: 'before' },
          { pattern: '@/stores/**', group: 'internal', position: 'before' },
          { pattern: '@/types/**', group: 'internal', position: 'before' },
          { pattern: '@/utils/**', group: 'internal', position: 'before' },
          { pattern: './**/*.css', group: 'index', position: 'before' },
        ],
      },
    ],
  },
};
