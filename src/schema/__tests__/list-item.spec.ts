/**
 * @vitest-environment node
 */
import { expect, it } from 'vitest'
import { render } from '../schema-helpers'

it('listItem to html will contain base-text class', () => {
  const html = render({
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
