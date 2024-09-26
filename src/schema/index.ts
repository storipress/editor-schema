import type { AnyExtension } from '@tiptap/core'
import type { AnyExtenders, Extenders } from './types'
import { identity } from 'lodash-es'
import { schemaExtensions } from './schema'

export { stopEvent } from './draggable-node'
export { fixGalleryLayout } from './gallery/adjust-layout'
// must export all or command type won't load correctly
export * from './schema'
export { loadDocument, parse, parser, render, renderFragment, renderWithMark, serializer } from './schema-helpers'
export type { AnyExtenders, Extenders } from './types'

export function createSchemaExtensions(
  extenders: Extenders = {
    image: undefined,
    embed: undefined,
    gallery: undefined,
    resource: undefined,
    tableOfContent: undefined,
  },
): AnyExtension[] {
  const exts = extenders as AnyExtenders

  return schemaExtensions.map((extension) => {
    const extend = exts[extension.name] ?? identity
    return extend(extension)
  })
}
