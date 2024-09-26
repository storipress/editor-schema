import type { Node } from '@tiptap/pm/model'
import { Fragment } from '@tiptap/pm/model'

interface AmendFragment extends Fragment {
  content: Node[]
}

export function getContent(fragment: Fragment): Node[] {
  return (fragment as AmendFragment).content
}

export function removeChild(fragment: Fragment, index: number): Fragment {
  const content = [...getContent(fragment)]
  content.splice(index, 1)
  return Fragment.fromArray(content)
}
