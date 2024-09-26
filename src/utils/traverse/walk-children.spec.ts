import { Fragment, Node } from '@tiptap/pm/model'
import { describe, expect, it } from 'vitest'
import { schema } from '../../schema'
import { REMOVE_CHILD } from './map-children'
import { walkChildren } from './walk-children'

describe('walkChildren', () => {
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

    const res = await walkChildren(frag, {
      embed: () => Promise.resolve(REMOVE_CHILD),
    })

    expect(res.childCount).toBe(2)
    expect(res.firstChild!.type.name).toBe('paragraph')
    expect(res.firstChild!.childCount).toBe(1)
    expect(res.firstChild!.firstChild!.text).toBe('Hello World')
    expect(res.lastChild!.type.name).toBe('paragraph')
    expect(res.lastChild!.childCount).toBe(1)
    expect(res.lastChild!.firstChild!.text).toBe('foo')
  })

  it('replace a child with return', async () => {
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

    const res = await walkChildren(frag, {
      embed: () =>
        Promise.resolve(Node.fromJSON(schema, { type: 'paragraph', content: [{ type: 'text', text: 'bar' }] })),
    })

    expect(res.childCount).toBe(3)
    expect(res.firstChild!.type.name).toBe('paragraph')
    expect(res.firstChild!.childCount).toBe(1)
    expect(res.firstChild!.firstChild!.text).toBe('Hello World')
    expect(res.child(1).type.name).toBe('paragraph')
    expect(res.child(1).childCount).toBe(1)
    expect(res.child(1).firstChild!.text).toBe('bar')
    expect(res.lastChild!.type.name).toBe('paragraph')
    expect(res.lastChild!.childCount).toBe(1)
    expect(res.lastChild!.firstChild!.text).toBe('foo')
  })
})
