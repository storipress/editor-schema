import { wrappingInputRule } from '@tiptap/core'
import { BulletList as BulletListWithoutType } from '@tiptap/extension-bullet-list'

export const BulletList = BulletListWithoutType.extend({
  addAttributes: () => ({
    type: {
      default: 'bullet',
    },
  }),

  parseHTML: () => [
    {
      tag: 'ul',
      getAttrs(node: string | Node) {
        const dom = node as HTMLElement
        return {
          type: dom.dataset.type ?? 'bullet',
        }
      },
    },
  ],

  addInputRules() {
    const { type } = this

    return [
      wrappingInputRule({
        find: /^\s*(?<bullet>[*-])\s$/,
        type,
        getAttributes: (match: RegExpExecArray) => ({
          type: match.groups?.bullet === '-' ? 'dash' : 'bullet',
        }),
      }),
    ]
  },
})
