import { describe, expect, it } from 'vitest'

// eslint-disable-next-line ts/no-require-imports
const { Node } = require('@tiptap/pm/model')

// eslint-disable-next-line ts/no-require-imports
const TipTapSchema = require('../../dist/editor-schema.cjs')

const { walkTree, schema, parse } = TipTapSchema

describe('parse', () => {
  it('parse to ProseMirror node', () => {
    const res = parse('<p>foo</p><img src="https://example.com" />')
    expect(res.toJSON()).toMatchSnapshot()
  })
})

describe('walkTree', () => {
  it('wrap image src', async () => {
    const frag = Node.fromJSON(schema, {
      type: 'doc',
      content: [
        {
          type: 'image',
          attrs: {
            src: 'https://example.com',
          },
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
      ],
    })

    const res = await walkTree(frag, {
      image: (node) =>
        node.type.create({
          ...node.attrs,
          src: `$${node.attrs.src}$`,
        }),
    })

    expect(res.toJSON()).toMatchSnapshot()
  })
})
