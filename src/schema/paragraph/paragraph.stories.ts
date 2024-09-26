import { createStory } from '../../dev-helpers/story'
import { Paragraph } from './schema'

export default {
  title: 'Schema/Paragraph',
}

export const Default = createStory<{ content: string; id: string }>({
  schema: Paragraph,
  defaultArgs: {
    id: 'e82e7a2b-fdb2-4503-bc9a-1ef8211a1a5a',
    content: 'This is a Paragraph',
  },
  attrs: (args) => {
    return {
      id: args.id,
    }
  },
  content: (args) => {
    return [
      {
        type: 'text',
        text: args.content,
      },
    ]
  },
})
