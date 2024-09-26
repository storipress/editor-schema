import { Fragment } from '@tiptap/pm/model'
import { removeChild } from '..'

import { schema } from '../../../schema'

describe('removeChild', () => {
  it('remove a child', () => {
    const frag = Fragment.fromJSON(schema, [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Hello World',
          },
        ],
      },
      {
        type: 'embed',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'foo',
          },
        ],
      },
    ])

    const res = removeChild(frag, 1)
    expect(res.childCount).toBe(2)
    expect(res.firstChild!.type.name).toBe('paragraph')
    expect(res.firstChild!.childCount).toBe(1)
    expect(res.firstChild!.firstChild!.text).toBe('Hello World')
    expect(res.lastChild!.type.name).toBe('paragraph')
    expect(res.lastChild!.childCount).toBe(1)
    expect(res.lastChild!.firstChild!.text).toBe('foo')
  })
})
