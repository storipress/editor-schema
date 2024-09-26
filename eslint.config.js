import { antfu } from '@antfu/eslint-config'
import prettier from 'eslint-plugin-prettier'
import storybook from 'eslint-plugin-storybook'

const ignores = [
  'node_modules/**',
  'dist/**',
  'public/**',
  '*.yml',
  'packages/migrator/src/editor-schema.js',
  '**/*.md',
  '.yarn/**/*',
  '*.toml',
]

export default antfu(
  {
    stylistic: false,
    plugins: {
      storybook,
      prettier,
    },
    rules: {
      'antfu/top-level-function': 'error',
      'prettier/prettier': 'error',
      ...storybook.configs.recommended.rules,
    },
    overrides: {
      vue: {
        'vue/component-tags-order': 'off',
      },
    },

    ignores,
  },

  {
    files: ['packages/migrator/**'],
    rules: {
      'no-console': 'off',
    },
  },
  { ignores },
)
