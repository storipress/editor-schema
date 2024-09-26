import type { Node, Schema } from '@tiptap/pm/model'
import { Fragment } from '@tiptap/pm/model'
import invariant from 'tiny-invariant'
import { getContent } from '../fragment'

interface WrapPaidContentOptions<S extends Schema> {
  doc: Node
  schema: S
}

export function wrapPaidContent<S extends Schema>({ doc, schema }: WrapPaidContentOptions<S>): Node {
  invariant(doc.type.name === schema.topNodeType.name, 'expected doc node')

  const content = flatPaidContent(getContent(doc.content))
  const freeContent = content.slice(0, 3)
  const paidContent = content.slice(3)
  if (paidContent.length === 0) {
    return doc.copy(Fragment.fromArray(freeContent))
  }
  const paidNode = schema.nodes.paidContent.create({}, paidContent)
  return doc.copy(Fragment.fromArray([...freeContent, paidNode]))
}

export function flatPaidContent(content: Node[]): Node[] {
  const result = []
  for (const node of content) {
    if (node.type.name === 'paidContent') {
      result.push(...getContent(node.content))
    } else {
      result.push(node)
    }
  }
  return result
}
