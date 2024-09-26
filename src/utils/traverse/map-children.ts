import type { Fragment, Node } from '@tiptap/pm/model'
import type { Promisable } from 'type-fest'
import { removeChild } from '../fragment'

export const REMOVE_CHILD = Symbol('removeChild')

export async function mapChildren(
  fragment: Fragment,
  mapper: (node: Node) => Promisable<Node | void | typeof REMOVE_CHILD>,
): Promise<Fragment> {
  let len = fragment.childCount
  for (let i = 0; i < len; ++i) {
    const node = await mapper(fragment.child(i))
    if (node === REMOVE_CHILD) {
      fragment = removeChild(fragment, i)

      // we need to decrement the loop counter since we removed an element
      len = fragment.childCount
      i -= 1
    } else if (node) {
      fragment = fragment.replaceChild(i, node)
    }
  }
  return fragment
}
