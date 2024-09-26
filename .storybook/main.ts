import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'node:path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        extensions: ['.browser.ts', '.browser.js', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '~/': `${path.resolve(__dirname, '../src')}/`,
          lodash: 'lodash-es',
        },
        dedupe: ['prosemirror-model'],
        mainFields: ['module', 'main'],
        conditions: ['import', 'module', 'default'],
      },
    }),
  docs: {
    autodocs: true,
  },
}

export default config
