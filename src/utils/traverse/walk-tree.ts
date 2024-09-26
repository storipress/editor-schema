import type { Node } from '@tiptap/pm/model'

import type { Visitor } from './types'
import { mapChildren } from './map-children'

export async function walkTree(node: Node, visitor: Visitor): Promise<Node> {
  const children = await mapChildren(node.content, (node: Node) => {
    const handler = visitor[node.type.name]
    if (handler) {
      return handler(node)
    }
  })
  return node.type.create(node.attrs, children)
}
