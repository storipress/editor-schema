import type { CommandProps } from '@tiptap/core'
import type { DOMOutputSpec } from '@tiptap/pm/model'
import type { RenderHTMLProps } from '../types'
import { Node } from '@tiptap/core'
import { safeParse } from '~/utils/json'
import { IMAGE_URL_REGEX } from '../constants'
import { renderHTML } from '../render-html'
import { blockPasteRule } from '../resource/block-paste-rule'
import { imageClass } from './utils'

interface ImageAttributes {
  src?: string
  source?: string[]
  file?: unknown
  provider?: string
  cid?: string
  alt?: string
  title?: string
  link?: string
  type?: 'regular' | 'wide' | 'full-wide'
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (attrs?: ImageAttributes) => ReturnType
    }
  }
}

export const ImageSchema = Node.create({
  name: 'image',
  group: 'block',
  draggable: true,
  isolating: true,
  atom: true,

  addOptions: () => ({
    pasteAttributes: {} as Record<string, unknown>,
  }),

  addAttributes: () => ({
    src: { default: null },
    source: { default: [] },
    file: { default: null },
    provider: {
      default: null,
    },
    id: {
      default: null,
    },
    cid: {
      default: null,
    },
    alt: {
      default: '',
    },
    title: {
      default: '',
    },
    link: {
      default: '',
    },
    style: {
      default: '',
      parseHTML: () => {},
    },
    type: {
      default: 'regular',
    },
  }),

  addCommands() {
    return {
      setImage:
        (attrs?: ImageAttributes) =>
        ({ commands }: CommandProps) => {
          return commands.insertBlock({ type: this.name, attrs })
        },
    }
  },

  addPasteRules() {
    return [
      blockPasteRule({
        find: IMAGE_URL_REGEX,
        type: this.type,
        getAttributes: (match) => {
          return {
            ...this.options.pasteAttributes,
            src: match[0],
          }
        },
      }),
    ]
  },

  parseHTML: () => [
    {
      tag: 'div[data-format="image"]',
      getAttrs(n: globalThis.Node | string) {
        const el = n as HTMLElement
        return {
          src: el.dataset.src,
          source: safeParse(el.dataset.source) || [],
          alt: el.dataset.alt,
          style: el.getAttribute('style'),
          title: el.dataset.title,
          link: el.dataset.link,
          type: el.dataset.type,
          provider: el.dataset.provider,
          cid: el.dataset.cid,
        }
      },
    },
    {
      tag: 'figure',
      contentElement: 'figcaption',
      getAttrs(node: globalThis.Node | string) {
        const dom = node as HTMLElement
        const img = dom.querySelector('img')
        const title = dom.querySelector('figcaption')
        if (!img) {
          return false
        }
        const link = dom.querySelector('a')?.href || ''
        const source = [...dom.querySelectorAll('source')].map(({ srcset, media, type }) => ({
          srcset,
          media,
          type,
        }))

        return {
          src: img.getAttribute('src'),
          source,
          link,
          alt: img.getAttribute('alt'),
          style: img.getAttribute('style'),
          type: 'normal',
          title: title?.textContent ?? '',
        }
      },
    },
    {
      tag: 'img',
      getAttrs(node: globalThis.Node | string) {
        const img = node as HTMLImageElement
        if (!img) {
          return false
        }

        return {
          src: img.getAttribute('src'),
          source: [],
          alt: img.getAttribute('alt'),
          style: img.getAttribute('style'),
          type: 'normal',
        }
      },
    },
    {
      tag: 'p',
      priority: 100,
      getAttrs: (n: globalThis.Node | string) => {
        const node = n as unknown as HTMLElement
        const img = node.querySelector('img')
        const src = img?.getAttribute('src')
        const alt = img?.getAttribute('alt')
        if (!src) {
          return false
        }

        return {
          type: 'normal',
          src,
          alt,
        }
      },
    },
  ],
  renderHTML({ node }: RenderHTMLProps) {
    return [
      'div',
      {
        class: `clear-both ${imageClass(node)}`,
        id: node.attrs.id,
        'data-format': 'image',
        'data-src': node.attrs.src,
        'data-alt': node.attrs.alt,
        'data-style': node.attrs.style,
        'data-link': node.attrs.link,
        'data-source': JSON.stringify(node.attrs.source),
        'data-title': node.attrs.title,
        'data-type': node.attrs.type,
        'data-provider': node.attrs.provider,
        'data-cid': node.attrs.cid,
      },
      [
        'figure',
        [
          'picture',
          ...(node.attrs.source || []).map((attr: Record<string, string>) => ['source', attr]),
          [
            ...(node.attrs.link
              ? [
                  'a',
                  {
                    href: node.attrs.link,
                    class: 'image_link',
                    target: '_blank',
                  },
                  ['img', node.attrs],
                ]
              : ['img', node.attrs]),
          ],
        ] as unknown as DOMOutputSpec,
        ['figcaption', { class: 'pt-2 block caption-text' }, ...renderHTML(node.attrs.title)],
      ],
    ]
  },
})
