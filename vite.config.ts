import type { UserConfig } from 'vitest/config'
// only import type
import path from 'node:path'
import process from 'node:process'
import buildResolve from 'esm-resolve'
import { readPackageSync } from 'read-pkg'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const esmResolve = buildResolve('./vite.config.ts', {
  constraints: 'node',
})

const pmPackageJsonPath = esmResolve('@tiptap/pm/package.json')
const pmPackageJson = pmPackageJsonPath ? readPackageSync({ cwd: path.dirname(pmPackageJsonPath) }) : { exports: {} }
const pmModules = Object.keys(pmPackageJson.exports ?? {})
  .filter((key) => key.startsWith('./'))
  .map((key) => `@tiptap/pm/${key.slice(2)}`)

const baseConfig: UserConfig = {
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      lodash: 'lodash-es',
    },
    dedupe: ['prosemirror-model'],
    mainFields: ['module', 'main'],
    conditions: ['import', 'module', 'default'],
  },
  plugins: [
    AutoImport({
      imports: ['vitest'],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),

    Boolean(process.env.ANALYZE) &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ],

  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
        'process.env.FORCE_SIMILAR_INSTEAD_OF_MAP': JSON.stringify('false'),
      },
    },
  },

  build: {
    lib: {
      entry: './src/index.ts',
      name: 'EditorSchema',
      fileName: 'editor-schema',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        '@tiptap/core',
        '@tiptap/vue-3',
        '@tiptap/pm',
        ...pmModules,
        'prosemirror-utils',
        'linkedom',
        'dompurify',
        'tiny-invariant',
      ],
    },
    minify: false,
  },

  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    include: ['src/**/*.{spec,test}.ts', 'tests/**/*.{spec,test}.ts'],
    setupFiles: ['./src/dev-helpers/expect-extend.ts'],
    environment: 'happy-dom',
    coverage: {
      all: true,
      reporter: ['html', 'text', 'json', 'lcov'],
      include: ['**/*.{ts,js,vue}', '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: [
        'public/**',
        'scripts/**',

        // dist
        'dist/**',

        // configs
        'coverage/**',
        '**/*.d.ts',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc}.config.{js,cjs,mjs,ts}',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
        '**/.storybook/**',
        '**/postcss.config.js',
        '**/tailwind.config.js',
        '**/webpack.*.js',
        '**/jest.*.js',
      ],
    },
  },
}

export default defineConfig(({ mode }) => {
  if (mode === 'test') {
    return {
      ...baseConfig,
      resolve: {
        alias: {
          '~/': `${path.resolve(__dirname, 'src')}/`,
          lodash: 'lodash-es',
        },
      },
    }
  }

  const config = {
    ...baseConfig,
    define: {
      'import.meta.vitest': 'undefined',
    },
  }

  if (mode === 'browser') {
    config.resolve!.extensions = ['.browser.ts', '.browser.js', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    config.resolve!.conditions = ['import', 'module', 'browser', 'default']
    config.build!.emptyOutDir = false
    config.build!.ssr = false
    config.build!.lib = {
      entry: './src/index.ts',
      name: 'EditorSchema',
      fileName: 'editor-schema.browser',
      formats: ['es'],
    }
  } else {
    const path = esmResolve('decode-named-character-reference')
    config.resolve!.alias = {
      ...config.resolve!.alias,
      'decode-named-character-reference': path as string,
    }
  }

  return config
})
