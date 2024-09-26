import type { CommandProps, Content } from '@tiptap/core'
import { Node } from '@tiptap/core'
import { assertJSON } from '~/utils/json'
import { IMAGE_URL_REGEX, URL_REGEX } from '../constants'

import { blockPasteRule } from './block-paste-rule'
import { renderBookmark, renderEmbed } from './render-resource'

interface ResourceAttributes {
  url?: string
  meta?: string
  type: 'embed' | 'bookmark'
  caption?: string
  target?: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resource: {
      /**
       * Add a resource
       */
      setResource: (attrs: ResourceAttributes) => ReturnType

      // copy from command so we can use it in the schema
      insertBlock: (content: Content) => ReturnType
    }
  }
}

export const ResourceSchema = Node.create({
  name: 'resource',
  group: 'block',
  draggable: true,
  isolating: true,
  atom: true,
  // add priority to ensure image paste rule will execute
  priority: -1,

  addAttributes: () => ({
    url: { default: null },
    meta: { default: null },
    type: {},
    caption: { default: '' },
    target: {},
    showMenu: { default: false },
    id: {
      default: null,
    },
  }),

  addCommands() {
    return {
      setResource:
        (attrs: ResourceAttributes) =>
        ({ commands }: CommandProps) => {
          return commands.insertBlock({ type: this.name, attrs })
        },
    }
  },

  addPasteRules() {
    const { type } = this
    return [
      blockPasteRule({
        find: URL_REGEX,
        type,
        getAttributes: (match) => {
          if (IMAGE_URL_REGEX.test(match[0])) {
            return false
          }
          return {
            type: 'embed',
            url: match[0],
            showMenu: true,
          }
        },
      }),
    ]
  },

  parseHTML: () => [
    {
      tag: 'div[data-format="resource"]',
      getAttrs: (n: globalThis.Node | string) => {
        const node = n as unknown as HTMLElement
        return {
          url: node.dataset.url,
          meta: assertJSON(node.dataset.meta),
          type: node.dataset.type,
          caption: node.querySelector('figcaption')?.textContent ?? '',
        }
      },
    },
    {
      tag: 'p',
      priority: 100,
      getAttrs: (n: globalThis.Node | string) => {
        const node = n as unknown as HTMLElement
        const url = node.querySelector('iframe')?.getAttribute('src')
        if (!url) {
          return false
        }
        return {
          url,
          type: 'embed',
        }
      },
    },
    {
      tag: 'figure',
      contentElement: 'iframe',
      getAttrs: (n: globalThis.Node | string) => {
        const node = n as unknown as HTMLElement
        const url = node.querySelector('iframe')?.getAttribute('src')
        if (!url) {
          return false
        }
        return {
          url,
          type: 'embed',
          caption: node.querySelector('figcaption')?.textContent ?? '',
        }
      },
    },
    {
      tag: 'div',
      contentElement: 'iframe',
      priority: 10,
      getAttrs: (n: globalThis.Node | string) => {
        const node = n as unknown as HTMLElement
        const url = node.querySelector('iframe')?.getAttribute('src')
        if (!url) {
          return false
        }
        return {
          url,
          type: 'embed',
        }
      },
    },
    {
      tag: 'iframe',
      priority: 5,
      getAttrs: (n: globalThis.Node | string) => {
        const node = n as unknown as HTMLElement
        const url = node.getAttribute('src')
        if (!url) {
          return false
        }
        return {
          url,
          type: 'embed',
        }
      },
    },
  ],

  renderHTML: ({ node }) => {
    const render = node.attrs.type === 'bookmark' ? renderBookmark : renderEmbed
    const figure = ['figure', ...render(node.attrs), ['figcaption', { class: 'text-center' }, node.attrs.caption]]
    return [
      'div',
      {
        class: 'clear-both opacity-100 relative',
        id: node.attrs.id,
        'data-format': 'resource',
        'data-url': node.attrs.url,
        'data-meta': node.attrs.meta,
        'data-type': node.attrs.type,
      },
      node.attrs.type === 'bookmark'
        ? ['a', { href: node.attrs.url, class: 'bookmark__link' }, ['div', { class: 'absolute inset-0 z-10' }], figure]
        : figure,
    ]
  },
})
