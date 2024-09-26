import type { CommandProps } from '@tiptap/core'
import type { RenderHTMLProps } from '../types'
import { Node } from '@tiptap/core'
import { htmlToOutputSpec } from '~/utils/convert'

interface EmbedAttribute {
  name: 'html'
  content: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embed: {
      setEmbed: (attrs: EmbedAttribute) => ReturnType
    }
  }
}

export const EmbedSchema = Node.create<unknown>({
  name: 'embed',
  group: 'block',
  draggable: true,
  isolating: true,
  atom: true,
  content: 'text*',

  addAttributes: () => ({
    name: {},
    content: { default: '' },
    blockName: {},
    uuid: {},
    id: {
      default: null,
    },
  }),

  addCommands() {
    return {
      setEmbed:
        (attrs: EmbedAttribute) =>
        ({ commands }: CommandProps) => {
          return commands.insertBlock({ type: this.name, attrs })
        },
    }
  },

  parseHTML: () => [
    {
      tag: 'div[data-format="embed"]',
      contentElement: 'pre',
      getAttrs(n: globalThis.Node | string) {
        const el = n as HTMLElement
        return {
          name: el.dataset.name,
        }
      },
    },
  ],

  renderHTML({ node }: RenderHTMLProps) {
    const convert = (source: string) => htmlToOutputSpec(source, true)
    const spec = convert(node.textContent)
    return [
      'div',
      {
        class: 'clear-both',
        id: node.attrs.id,
        'data-format': 'embed',
        'data-name': node.attrs.name,
        'data-block-name': node.attrs.blockName,
        'data-uuid': node.attrs.uuid,
      },
      ['pre', { class: 'hidden', 'aria-hidden': 'true' }, 0],
      ...spec,
    ]
  },
})
