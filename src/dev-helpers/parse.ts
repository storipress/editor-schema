import type { Node } from '@tiptap/core'
import { getSchema } from '@tiptap/core'
import { DOMParser } from '@tiptap/pm/model'
import { baseSchema } from './test-utils'

export function parse(node: Node, html: string) {
  const schema = getSchema([...baseSchema, node])
  const dom = document.createElement('div')
  dom.innerHTML = html

  return DOMParser.fromSchema(schema).parse(dom)
}
