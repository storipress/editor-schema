import type { JSONContent } from '@tiptap/core'
import type { Fragment, ParseOptions } from '@tiptap/pm/model'
import { DOMParser, DOMSerializer, Node } from '@tiptap/pm/model'
import { parseToDom, window as win } from '~/utils/environment'
import { DEFAULT_TREE, schema } from './schema'

export const serializer = DOMSerializer.fromSchema(schema)
export const parser = DOMParser.fromSchema(schema)

export function parse(html: string, options?: ParseOptions, domParser: DOMParser = parser): Node {
  const dom = parseToDom(html)
  return domParser.parse(dom, options)
}

export function render(json: Record<string, unknown> = DEFAULT_TREE) {
  const doc = loadDocument(json)
  return renderFragment(doc.content)
}

export interface ArticleMeta {
  clientId: string
  articleId: string
}

export function renderWithMark(node: JSONContent, meta: ArticleMeta) {
  const dom = parseToDom(render(node))
  dom.firstElementChild?.setAttribute('data-sp-article', `${meta.clientId}.${meta.articleId}`)
  dom.lastElementChild?.setAttribute('data-sp-article-end', `${meta.clientId}.${meta.articleId}`)
  return dom.innerHTML
}

export function loadDocument(json: Record<string, unknown> = DEFAULT_TREE) {
  return Node.fromJSON(schema, json)
}

export function renderFragment(fragment: Fragment): string {
  const domFragment = serializer.serializeFragment(fragment, { document: win.document })

  return Array.from(domFragment.childNodes).reduce(
    (result, node) => result + ((node as any).outerHTML || node.nodeValue),
    '',
  )
}
