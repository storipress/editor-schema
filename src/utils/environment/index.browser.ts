export const window = globalThis as unknown as Window

export function parseToFragment(html: string): DocumentFragment {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const fragment = document.createDocumentFragment()
  fragment.append(...doc.body.children)
  return fragment
}

export function parseToDom(html: string): HTMLElement {
  const fragment = parseToFragment(html)
  if (fragment.children.length > 1) {
    const div = window.document.createElement('div')
    div.append(fragment)
    return div
  }
  const div = window.document.createElement('div')
  return (fragment.firstElementChild as HTMLElement) || div
}
