import { html } from 'proper-tags'
import { parseToDom, window } from '../index'

it('can use with DocumentFragment', () => {
  const fragment = window.document.createDocumentFragment()
  fragment.append(window.document.createElement('span'))
  fragment.append(window.document.createElement('div'))
  fragment.append(window.document.createElement('p'))
  fragment.append(window.document.createElement('article'))

  const div = window.document.createElement('div')
  div.append(fragment)

  expect(div.innerHTML).toMatchInlineSnapshot(`"<span></span><div></div><p></p><article></article>"`)
})

it('parse to div with children', () => {
  const dom = parseToDom(
    html`<span></span>
      <article>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </article>
      <p></p>`,
  )

  expect(dom.innerHTML).toMatchInlineSnapshot(`
    "<span></span><article>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </article><p></p>"
  `)
  expect(dom.tagName).toBe('DIV')
})
