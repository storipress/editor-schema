import type { CommandProps } from '@tiptap/core'
import type { RenderHTMLProps } from '../types'
import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContent: {
      /**
       * Add a table of content
       */
      addTableOfContent: () => ReturnType
    }
  }
}

export interface ItocItems {
  id: string
  textContent: string
  level: string
}

export const TableOfContentSchema = Node.create({
  name: 'tableOfContent',
  group: 'block',
  draggable: true,
  isolating: true,
  atom: true,

  addAttributes() {
    return {
      tocItems: {
        default: [],
      },
      id: {
        default: null,
      },
    }
  },

  addCommands() {
    return {
      addTableOfContent:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertBlock({ type: this.name })
        },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-format="tableOfContent"]' }]
  },

  renderHTML({ node }: RenderHTMLProps) {
    return [
      'div',
      {
        class: 'h-full w-full flex flex-col',
        id: node.attrs.id,
        'data-format': 'tableOfContent',
      },
      ...(node.attrs.tocItems as ItocItems[]).map((item) => {
        return [
          'div',
          {
            class: 'text-stone-500 hover:bg-gray-100 px-1',
            style: `--level: ${item.level}`,
          },
          [
            'a',
            {
              style: 'padding-left: calc(1rem * (var(--level) - 1))',
              href: `#${item.id}`,
            },
            item.textContent,
          ],
        ]
      }),
    ]
  },
})
