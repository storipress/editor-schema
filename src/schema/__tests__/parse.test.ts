import { html } from 'proper-tags'
/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import { parse } from '../schema-helpers'

describe('parse', () => {
  it('parse single paragraph', () => {
    expect(parse(html`<p>Hello world</p>`).toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "id": null,
            },
            "content": [
              {
                "text": "Hello world",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('parse multiple paragraph', () => {
    expect(
      parse(html`
        <p>Hello world</p>
        <p>Foo bar</p>
      `).toJSON(),
    ).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "id": null,
            },
            "content": [
              {
                "text": "Hello world",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
          {
            "attrs": {
              "id": null,
            },
            "content": [
              {
                "text": "Foo bar",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('parse image with link', () => {
    expect(
      parse(html`
        <figure>
          <a href="https://example.com"><img src="https://robohash.org/foo.png" /></a>
          <figcaption>caption</figcaption>
        </figure>
      `).toJSON(),
    ).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "alt": null,
              "cid": null,
              "file": null,
              "id": null,
              "link": "https://example.com",
              "provider": null,
              "source": [],
              "src": "https://robohash.org/foo.png",
              "style": null,
              "title": "caption",
              "type": "normal",
            },
            "type": "image",
          },
        ],
        "type": "doc",
      }
    `)
  })
})

it('parse shopify blog like html', () => {
  expect(
    parse(html`
      <p><iframe src="https://www.youtube.com/watch?v=XZJw5_fwfa8"></iframe></p>
      <p><img src="https://picsum.photos/200/300" alt="image" /></p>
      <p>Hello world</p>
      <p>Hello <strong>TipTap</strong></p>
    `),
  ).toMatchInlineSnapshot(`
    {
      "content": [
        {
          "attrs": {
            "caption": "",
            "id": null,
            "meta": null,
            "showMenu": false,
            "target": null,
            "type": "embed",
            "url": "https://www.youtube.com/watch?v=XZJw5_fwfa8",
          },
          "type": "resource",
        },
        {
          "attrs": {
            "alt": "image",
            "cid": null,
            "file": null,
            "id": null,
            "link": "",
            "provider": null,
            "source": [],
            "src": "https://picsum.photos/200/300",
            "style": "",
            "title": "",
            "type": "normal",
          },
          "type": "image",
        },
        {
          "attrs": {
            "id": null,
          },
          "content": [
            {
              "text": "Hello world",
              "type": "text",
            },
          ],
          "type": "paragraph",
        },
        {
          "attrs": {
            "id": null,
          },
          "content": [
            {
              "text": "Hello ",
              "type": "text",
            },
            {
              "marks": [
                {
                  "type": "bold",
                },
              ],
              "text": "TipTap",
              "type": "text",
            },
          ],
          "type": "paragraph",
        },
      ],
      "type": "doc",
    }
  `)
})

it('parse improper shopify blog like html', () => {
  expect(
    parse(html`
      <p><iframe></iframe></p>
      <p><img /></p>
      <p>Hello world</p>
      <p>Hello <strong>TipTap</strong></p>
    `),
  ).toMatchInlineSnapshot(`
    {
      "content": [
        {
          "attrs": {
            "id": null,
          },
          "type": "paragraph",
        },
        {
          "attrs": {
            "id": null,
          },
          "type": "paragraph",
        },
        {
          "attrs": {
            "id": null,
          },
          "content": [
            {
              "text": "Hello world",
              "type": "text",
            },
          ],
          "type": "paragraph",
        },
        {
          "attrs": {
            "id": null,
          },
          "content": [
            {
              "text": "Hello ",
              "type": "text",
            },
            {
              "marks": [
                {
                  "type": "bold",
                },
              ],
              "text": "TipTap",
              "type": "text",
            },
          ],
          "type": "paragraph",
        },
      ],
      "type": "doc",
    }
  `)
})
