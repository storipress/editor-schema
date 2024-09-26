import { mergeAttributes } from '@tiptap/core'
import { Link as LinkWithoutType } from '@tiptap/extension-link'

export const Link = LinkWithoutType.extend({
  addAttributes() {
    return {
      id: {
        default: null,
      },
      href: {
        default: null,
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
      class: {
        default: this.options.HTMLAttributes.class,
      },
      rel: {
        default: this.options.HTMLAttributes.rel,
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        rel: HTMLAttributes.rel || 'noopener noreferrer',
      }),
      0,
    ]
  },
}).configure({
  openOnClick: false,
  HTMLAttributes: {
    target: '_blank',
  },
})
