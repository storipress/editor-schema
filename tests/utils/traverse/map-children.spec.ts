import { Fragment } from '@tiptap/pm/model'
import { describe, expect, it } from 'vitest'

// eslint-disable-next-line ts/no-require-imports
const TipTapSchema = require('../../../dist/editor-schema.cjs')

const { REMOVE_CHILD, mapChildren, schema } = TipTapSchema

describe('mapChildren', () => {
  it('remove child when return REMOVE_CHILD', async () => {
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

    const res = await mapChildren(frag, (node) => {
      if (node.type.name === 'embed') {
        return REMOVE_CHILD
      }
    })

    expect(res.childCount).toBe(2)
    expect(res.firstChild!.type.name).toBe('paragraph')
    expect(res.firstChild!.childCount).toBe(1)
    expect(res.firstChild!.firstChild!.text).toBe('Hello World')
    expect(res.lastChild!.type.name).toBe('paragraph')
    expect(res.lastChild!.childCount).toBe(1)
    expect(res.lastChild!.firstChild!.text).toBe('foo')
  })
})
