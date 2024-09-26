import { createStory } from '../../dev-helpers/story'
import { TableOfContentSchema } from './schema'

export default {
  title: 'Schema/TableOfContent',
  argTypes: {
    tocItems: {
      control: {
        type: 'object',
      },
      defaultValue: [
        { id: '1', textContent: 'first', level: '1' },
        { id: '2', textContent: 'second', level: '2' },
      ],
    },
  },
}

export const Default = createStory({
  schema: TableOfContentSchema,
  defaultArgs: {
    tocItems: [
      { id: '1', textContent: 'first', level: '1' },
      { id: '2', textContent: 'second', level: '2' },
    ],
  },
  attrs: (args) => {
    return {
      tocItems: args.tocItems,
    }
  },
})
