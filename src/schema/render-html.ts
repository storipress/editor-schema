import type { DOMOutputSpec } from '@tiptap/pm/model'
import { htmlToOutputSpec } from '~/utils/convert'

export function renderHTML(html: string, allowIframe = false): DOMOutputSpec[] {
  if (!html) {
    return []
  }

  const content: any = h('div', {}, htmlToOutputSpec(html, allowIframe))
  const lastChild = content[content.length - 1]
  // if last child is a text node, remove it
  const hasEmptyChild = Array.isArray(lastChild) && (lastChild.length === 0 || lastChild[0].trim() === '')

  return [hasEmptyChild ? content.slice(0, -1) : content]
}

export function h(
  tag: string,
  attr: Record<string, string>,
  ...children: DOMOutputSpec[] | [DOMOutputSpec[]]
): DOMOutputSpec {
  if (isNestedOutputSpec(children)) {
    return [tag, attr || {}, ...children[0].filter(Boolean)]
  }

  return [tag, attr || {}, ...children.filter(Boolean)]
}

function isOutputSpecArray(x: unknown[]): x is DOMOutputSpec[] {
  if (Array.isArray(x[0]) && typeof x[0][0] === 'string') {
    return true
  }
  return false
}

function isNestedOutputSpec(x: unknown[]): x is [DOMOutputSpec[]] {
  if (!Array.isArray(x[0])) {
    return false
  }

  const first = x[0].filter(Boolean)
  return isOutputSpecArray(first)
}
