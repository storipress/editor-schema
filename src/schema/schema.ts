import type { AnyExtension } from '@tiptap/core'
import { getSchema } from '@tiptap/core'
import { Blockquote } from '@tiptap/extension-blockquote'
import { Bold } from '@tiptap/extension-bold'
import { Code } from '@tiptap/extension-code'
import { Document } from '@tiptap/extension-document'
import { HardBreak } from '@tiptap/extension-hard-break'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Italic } from '@tiptap/extension-italic'
import { ListItem } from '@tiptap/extension-list-item'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Strike } from '@tiptap/extension-strike'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'

import { BulletList } from './bullet-list'
import { CodeBlock } from './code-block'
import { ExtraCommands } from './commands'
import { EmbedSchema } from './embed/schema'
import { GallerySchema } from './gallery/schema'
import { Heading } from './heading'
import { ImageSchema } from './image/schema'
import { Link } from './link'
import { PaidContent } from './paid-content'
import { Paragraph } from './paragraph'
import { ResourceSchema } from './resource/schema'
import { Table } from './table'
import { TableOfContentSchema } from './table-of-content/schema'

export { BulletList } from './bullet-list'
export { CodeBlock } from './code-block'
export { ExtraCommands } from './commands'
export { EmbedSchema } from './embed/schema'
export { GallerySchema } from './gallery/schema'
// custom extensions
export { Heading } from './heading'
export { ImageSchema } from './image/schema'
export { Link } from './link'
export { PaidContent } from './paid-content'
export { Paragraph } from './paragraph'
export { ResourceSchema } from './resource/schema'
export { Table } from './table'
export { TableOfContentSchema } from './table-of-content/schema'
// export to prevent from type erasing
export { Blockquote } from '@tiptap/extension-blockquote'
export { Bold } from '@tiptap/extension-bold'
export { Code } from '@tiptap/extension-code'
export { Document } from '@tiptap/extension-document'
export { HardBreak } from '@tiptap/extension-hard-break'
export { HorizontalRule } from '@tiptap/extension-horizontal-rule'
export { Italic } from '@tiptap/extension-italic'
export { ListItem } from '@tiptap/extension-list-item'
export { OrderedList } from '@tiptap/extension-ordered-list'
export { Strike } from '@tiptap/extension-strike'
export { Subscript } from '@tiptap/extension-subscript'
export { Superscript } from '@tiptap/extension-superscript'
export { TableCell } from '@tiptap/extension-table-cell'
export { TableHeader } from '@tiptap/extension-table-header'
export { TableRow } from '@tiptap/extension-table-row'
export { Text } from '@tiptap/extension-text'
export { Underline } from '@tiptap/extension-underline'

export const schemaExtensions: AnyExtension[] = [
  Document,
  Text,
  Paragraph,
  Heading.configure({ levels: [1, 2, 3] }),
  Bold,
  Italic,
  Strike,
  Underline,

  BulletList,
  OrderedList,
  ListItem.configure({
    HTMLAttributes: {
      class: 'base-text',
    },
  }),

  Code,
  CodeBlock,

  Blockquote,
  HorizontalRule,

  PaidContent,
  TableOfContentSchema,

  // for importing
  Subscript,
  Superscript,

  // we don't have table UI but we need these to support table for importing
  Table,
  TableCell,
  TableRow,
  TableHeader,

  Link.configure({
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer',
      class: null,
    },
  }),
  HardBreak,

  EmbedSchema,
  GallerySchema,
  ImageSchema,
  ResourceSchema,

  // This is not a schema plugin, but our schema is depend on this plugin
  ExtraCommands,
]

export const schema = getSchema(schemaExtensions)

export const DEFAULT_TREE = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}

export const richInputExtensions = [
  Document.extend({
    content: 'block',
  }),
  Paragraph,
  Text,
  Bold,
  Italic,
  Underline,
  Link.configure({
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer',
      class: null,
    },
  }),
]
