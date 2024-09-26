import type { Fragment, Node } from '@tiptap/pm/model'

import type { Visitor } from './types'
import { mapChildren } from './map-children'

export function walkChildren(fragment: Fragment, visitor: Visitor): Promise<Fragment> {
  return mapChildren(fragment, (node: Node) => {
    const handler = visitor[node.type.name]
    if (handler) {
      return handler(node)
    }
  })
}
