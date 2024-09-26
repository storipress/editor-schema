import { createStory } from '../../dev-helpers/story'
import { Heading } from './schema'

export default {
  title: 'Schema/Heading',
}

export const Default = createStory<{ content: string; level: number; id: string }>({
  schema: Heading,
  defaultArgs: {
    level: 1,
    id: 'e82e7a2b-fdb2-4503-bc9a-1ef8211a1a5a',
    content: 'This is a 1st level heading',
  },
  attrs: (args) => {
    return {
      level: args.level,
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
