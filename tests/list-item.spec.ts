/**
 * @vitest-environment node
 */
import { expect, it } from 'vitest'

// eslint-disable-next-line ts/no-require-imports
const TipTapSchema = require('../dist/editor-schema.cjs')

it('listItem to html will contain base-text class', () => {
  const html = TipTapSchema.render({
    type: 'doc',
    content: [
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Hello world',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })
  expect(html).toContain('base-text')
  expect(html).toMatchInlineSnapshot(`"<ul type="bullet"><li class="base-text"><p>Hello world</p></li></ul>"`)
})
