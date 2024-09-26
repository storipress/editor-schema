/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'

describe('parse', () => {
  // eslint-disable-next-line ts/no-require-imports
  const TipTapSchema = require('../dist/editor-schema.cjs')

  it('parse single paragraph', () => {
    expect(TipTapSchema.parse('<p>Hello world</p>').toJSON()).toMatchInlineSnapshot(`
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
    expect(TipTapSchema.parse('<p>Hello world</p><p>Foo bar</p>').toJSON()).toMatchInlineSnapshot(`
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
      TipTapSchema.parse(
        '<figure><a href="https://example.com"><img src="https://robohash.org/foo.png"></a><figcaption>caption</figcaption></figure>',
      ).toJSON(),
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
