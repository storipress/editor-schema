/**
 * @vitest-environment node
 */
import { expect, it } from 'vitest'
import { ensureBuildExist } from './helper'

it('require cjs build should not throw error', async () => {
  await ensureBuildExist()
  expect(() => {
    // eslint-disable-next-line ts/no-require-imports
    require('../dist/editor-schema.cjs')
  }).not.toThrow()
}, 10_000)
