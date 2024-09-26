import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'

import { createSchemaExtensions } from '../schema'

export const baseSchema = [Document, Paragraph, Text]

export const fullSchema = createSchemaExtensions()
