import { createStory } from '../../dev-helpers/story'
import { ImageSchema } from './schema'

export default {
  title: 'Schema/Image',
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
      defaultValue: 'https://picsum.photos/id/1/600/300',
    },
    link: {
      control: {
        type: 'text',
      },
      defaultValue: 'https://example.com',
    },
  },
}

export const Default = createStory({
  schema: ImageSchema,
  defaultArgs: {
    src: 'https://picsum.photos/id/1/600/300',
    link: 'https://example.com',
    title: 'Image title',
  },
  attrs: (args) => {
    return {
      src: args.src,
      link: args.link,
      title: 'Image title',
    }
  },
})

export const Wide = createStory({
  schema: ImageSchema,
  defaultArgs: {
    src: 'https://picsum.photos/id/1/600/300',
    link: 'https://example.com',
  },
  attrs: (args) => {
    return {
      src: args.src,
      link: args.link,
      title: 'Image title',
      type: 'wide',
    }
  },
})

export const Full = createStory({
  schema: ImageSchema,
  defaultArgs: {
    src: 'https://picsum.photos/id/1/600/300',
    link: 'https://example.com',
  },
  attrs: (args) => {
    return {
      src: args.src,
      link: args.link,
      title: 'Image title',
      type: 'full-width',
    }
  },
})

export const CustomStyle = createStory({
  schema: ImageSchema,
  defaultArgs: {
    src: 'https://andrewsheves.com/wp-content/uploads/2024/03/unrated.png',
    link: 'https://andrewsheves.com/wp-content/uploads/2024/03/unrated.png',
  },
  attrs: (args) => {
    return {
      src: args.src,
      link: args.link,
      title: 'Image title',
      style: 'height: 18.5px; width: auto',
    }
  },
})
