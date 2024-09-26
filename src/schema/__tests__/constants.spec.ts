import { expect, it } from 'vitest'
import { IMAGE_URL_REGEX } from '../constants'

it('iMAGE_URL_REGEX should match image url', () => {
  expect(IMAGE_URL_REGEX.test('https://example.com/image.png')).toBe(true)
})
