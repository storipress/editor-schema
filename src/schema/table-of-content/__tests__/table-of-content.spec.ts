import { describe, expect, it } from 'vitest'
import { parse } from '../../schema-helpers'

describe('tableOfContent', () => {
  it('parse no items tableOfContent', () => {
    expect(parse(`<div data-format="tableOfContent" />`).toJSON()).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "id": null,
              "tocItems": [],
            },
            "type": "tableOfContent",
          },
        ],
        "type": "doc",
      }
    `)
  })
})
