import { Editor } from '@tiptap/core'
import { describe, expect, it } from 'vitest'
import { richInputExtensions, schemaExtensions } from '../schema'

describe('link', () => {
  it('full editor: link default has no nofollow', () => {
    const editor = new Editor({
      extensions: schemaExtensions,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'link',
              },
            ],
          },
        ],
      },
    })
    editor.chain().setTextSelection({ from: 1, to: 5 }).setMark('link', { href: 'https://example.com' }).run()

    expect(editor.getHTML()).toBe(
      '<p><a target="_blank" rel="noopener noreferrer" href="https://example.com">link</a></p>',
    )
  })

  it('rich text input: link default has no nofollow', () => {
    const editor = new Editor({
      extensions: richInputExtensions,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'link',
              },
            ],
          },
        ],
      },
    })
    editor.chain().setTextSelection({ from: 1, to: 5 }).setMark('link', { href: 'https://example.com' }).run()

    expect(editor.getHTML()).toBe(
      '<p><a target="_blank" rel="noopener noreferrer" href="https://example.com">link</a></p>',
    )
  })
})
