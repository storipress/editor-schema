import { createStory } from '../../dev-helpers/story'
import { Link } from './schema'

export default {
  title: 'Schema/Link',
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
      defaultValue: 'https://example.com',
    },
    target: {
      control: {
        type: 'text',
      },
      defaultValue: '_blank',
    },
    rel: {
      control: {
        type: 'text',
      },
      defaultValue: 'noopener noreferrer',
    },
  },
}

export const Default = createStory({
  defaultArgs: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  schema: Link,
})
