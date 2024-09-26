import type { AnyExtension } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'

export interface RenderHTMLProps {
  node: Node
}

export type ExtendableExtensions = 'image' | 'gallery' | 'resource' | 'embed' | 'tableOfContent'

export type Extenders = Record<ExtendableExtensions, ((node: AnyExtension) => AnyExtension) | undefined>
export type AnyExtenders = Record<string, (node: AnyExtension) => AnyExtension>
