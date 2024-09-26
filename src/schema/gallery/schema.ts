import type { CommandProps } from '@tiptap/core'
import type { DOMOutputSpec } from '@tiptap/pm/model'
import type { Writable } from 'type-fest'
import type { RenderHTMLProps } from '../types'

import { Node } from '@tiptap/core'

interface GalleryAttributes {
  images: string[]
  ratio: number[]
  title: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gallery: {
      /**
       * Add an image
       */
      setGallery: (attrs: GalleryAttributes) => ReturnType
    }
  }
}

export const GallerySchema = Node.create({
  name: 'gallery',
  group: 'block',
  draggable: true,
  isolating: true,

  addAttributes: () => ({
    images: { default: [] },
    ratio: { default: [] },
    title: {
      default: '',
    },
    id: {
      default: null,
    },
  }),

  addCommands() {
    return {
      setGallery:
        (attrs: GalleryAttributes) =>
        ({ commands }: CommandProps) => {
          return commands.insertBlock({ type: this.name, attrs })
        },
    }
  },

  parseHTML: () => [
    {
      tag: 'div[data-format="gallery"]',
      getAttrs(n: globalThis.Node | string) {
        const el = n as HTMLElement
        return {
          images: [...el.querySelectorAll('img')].map(($image: HTMLImageElement): string => $image.src),
          title: el.dataset.title,
        }
      },
    },
  ],

  renderHTML({ node }: RenderHTMLProps) {
    const result: Writable<DOMOutputSpec> = [
      'div',
      {
        class: 'box-border',
        id: node.attrs.id,
        'data-title': node.attrs.title,
        'data-format': 'gallery',
        'data-ver': '2',
      },
    ]

    const rowItem = (start: number, end: number) => {
      return [
        'div',
        { class: 'gallery-row gallery-card' },
        ...node.attrs.images.slice(start, end).map((url: string, index: number): DOMOutputSpec => {
          return [
            'div',
            {
              class: 'gallery-image',
              style: `flex: ${node.attrs.ratio[start + index]} 1 0%`,
            },
            ['img', { src: url }],
          ]
        }),
      ] as DOMOutputSpec
    }
    const noOfImages = node.attrs.images?.length
    if (noOfImages > 0) {
      if (noOfImages < 4) {
        result[2] = rowItem(0, 3)
      } else if (noOfImages === 4) {
        result[2] = rowItem(0, 2)
        result[3] = rowItem(2, 4)
      } else if (noOfImages === 5 || noOfImages === 6) {
        result[2] = rowItem(0, 3)
        result[3] = rowItem(3, 6)
      } else if (noOfImages === 7) {
        result[2] = rowItem(0, 3)
        result[3] = rowItem(3, 5)
        result[4] = rowItem(5, 7)
      } else if (noOfImages >= 8) {
        result[2] = rowItem(0, 3)
        result[3] = rowItem(3, 6)
        result[4] = rowItem(6, 9)
      }
    }
    return result as DOMOutputSpec
  },
})
