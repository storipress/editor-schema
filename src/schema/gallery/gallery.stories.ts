import { onMounted, onUpdated } from 'vue'
import { createStory } from '../../dev-helpers/story'
import { fixGalleryLayout } from './adjust-layout'
import { GallerySchema } from './schema'
import '@storipress/common-style/style.scss'

export default {
  title: 'Schema/Gallery',
  argTypes: {
    amount: {
      control: {
        type: 'number',
        default: 9,
        min: 1,
        max: 9,
      },
    },
  },
}

const images = [
  'https://picsum.photos/id/1/600/300',
  'https://picsum.photos/id/2/600/300',
  'https://picsum.photos/id/3/200/600',
  'https://picsum.photos/id/4/200/600',
  'https://picsum.photos/id/5/600/300',
  'https://picsum.photos/id/6/600/600',
  'https://picsum.photos/id/7/600/300',
  'https://picsum.photos/id/8/200/600',
  'https://picsum.photos/id/9/600/300',
]

export const Default = createStory<{ amount: number }>({
  schema: GallerySchema,
  defaultArgs: {
    amount: 9,
  },
  attrs: (args) => {
    return {
      images: images.slice(0, args.amount),
    }
  },
  setup: () => {
    onMounted(() => {
      requestAnimationFrame(() => {
        fixGalleryLayout()
      })
    })
    onUpdated(() => {
      requestAnimationFrame(() => {
        fixGalleryLayout()
      })
    })
  },
})
