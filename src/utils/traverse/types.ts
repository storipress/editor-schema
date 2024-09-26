import type { Node } from '@tiptap/pm/model'
import type { Promisable } from 'type-fest'
import type { REMOVE_CHILD } from './map-children'

export type Visitor = Record<string, (node: Node) => Promisable<Node | void | typeof REMOVE_CHILD>>
