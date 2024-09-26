import { describe, expect, it } from 'vitest'

// eslint-disable-next-line ts/no-require-imports
const { Node } = require('@tiptap/pm/model')

// eslint-disable-next-line ts/no-require-imports
const TipTapSchema = require('../../../dist/editor-schema.cjs')

const { wrapPaidContent, renderFragment, schema } = TipTapSchema

describe('wrapPaidContent', () => {
  it('wrap paragraph to paidContent', () => {
    const doc = Node.fromJSON(schema, {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'free content 1',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'free content 2',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'free content 3',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'paid content 1',
            },
          ],
        },
      ],
    })

    const res = wrapPaidContent({
      doc,
      schema,
    })

    // 3 free + 1 paid wrapper
    expect(res.childCount).toBe(4)
    expect(renderFragment(res.content)).toMatchSnapshot()
  })

  it('flatten exist paidContent', () => {
    const doc = Node.fromJSON(schema, {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'free content 1',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'free content 2',
            },
          ],
        },
        // currently paidContent is only for internal use, so we flatten it
        {
          type: 'paidContent',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'free content 3',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'paid content 1',
                },
              ],
            },
          ],
        },
      ],
    })

    const res = wrapPaidContent({
      doc,
      schema,
    })

    // 3 free + 1 paid wrapper
    expect(res.childCount).toBe(4)
    expect(renderFragment(res.content)).toMatchSnapshot()
  })
})
