import { mergeAttributes } from '@tiptap/core'
import { Paragraph as ParagraphWithType } from '@tiptap/extension-paragraph'

export const Paragraph = ParagraphWithType.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})
