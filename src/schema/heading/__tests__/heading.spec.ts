import { html } from 'proper-tags'
import { describe, expect, it } from 'vitest'
import { parse, render } from '../../schema-helpers'
import HeadingWithId from './heading-with-id.json'

describe('tableOfContent', () => {
  it('parse headings have id', () => {
    expect(parse(html`<h1 id="test-id">test heading</h1>`).toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "id": "test-id",
              "level": 1,
            },
            "content": [
              {
                "text": "test heading",
                "type": "text",
              },
            ],
            "type": "heading",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('render headings having id', () => {
    const html = render(HeadingWithId)
    expect(html).toMatchInlineSnapshot(
      `"<p>12345</p><h2 id="f5599a19-bea3-4a36-8d8c-7fbfa6939f7c">First</h2><h2 id="99d1d6b2-7ca9-4a4c-9fcf-832a4fee7791">Second</h2>"`,
    )
  })
})
