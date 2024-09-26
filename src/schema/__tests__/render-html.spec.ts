import { html } from 'proper-tags'
import { h, renderHTML } from '../render-html'

describe('h', () => {
  it('render array children', () => {
    const res = h('div', {}, [null, h('span', {}, 'foo')] as any)

    expect(res).toMatchSnapshot()
  })

  it('render normal children', () => {
    const res = h('div', {}, h('span', {}, 'foo'))

    expect(res).toMatchSnapshot()
  })

  it('render with null children', () => {
    const res = h('div', {}, null as any, h('span', {}, 'foo'))

    expect(res).toMatchSnapshot()
  })
})

describe('renderHTML', () => {
  it('can handle plain text', () => {
    expect(renderHTML('foo')).toMatchInlineSnapshot(`
      [
        [
          "div",
          {},
          [
            "div",
            {},
            "foo",
          ],
        ],
      ]
    `)
  })

  it('can handle html', () => {
    expect(renderHTML(html`<p>foo <strong>bar</strong></p>`)).toMatchInlineSnapshot(`
      [
        [
          "div",
          {},
          [
            "p",
            {},
            "foo ",
            [
              "strong",
              {},
              "bar",
            ],
          ],
        ],
      ]
    `)
  })
})
