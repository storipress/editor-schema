import { parseHTML } from 'linkedom'

const { window: _window } = parseHTML('<div></div>')

export const window = _window as Window

export function parseToDom(html: string): HTMLElement {
  const { document } = parseHTML(html)
  const div = document.createElement('div')
  for (const el of document.children) {
    div.append(el)
  }
  return div
}
