// copied from: https://github.com/ueberdosis/tiptap/blob/42039c05f0894a2730a7b8f1b943ddb22d52a824/packages/extension-code-block/src/code-block.ts#L116

import { mergeAttributes } from '@tiptap/core'
import { CodeBlock as CodeBlockWithType } from '@tiptap/extension-code-block'

export const CodeBlock = CodeBlockWithType.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
      },
      wrapCode: {
        default: false,
      },
    }
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        'code',
        {
          class: node.attrs.language ? this.options.languageClassPrefix + node.attrs.language : null,
          ...(node.attrs.wrapCode ? { style: 'white-space: pre-wrap; word-break: break-all;' } : undefined),
        },
        0,
      ],
    ]
  },
})
