import { expect, it } from 'vitest'
import { htmlToOutputSpec } from '../index'

it('htmlToOutputSpec', () => {
  const html = '<div>Hello</div>'
  const outputSpec = htmlToOutputSpec(html)
  expect(outputSpec).toEqual([['div', {}, 'Hello']])
})

it('htmlToOutputSpec with plain text', () => {
  const html = 'Hello text'
  const outputSpec = htmlToOutputSpec(html)
  expect(outputSpec).toEqual([['div', {}, 'Hello text']])
})
