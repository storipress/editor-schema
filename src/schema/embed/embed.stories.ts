import { createStory } from '../../dev-helpers/story'
import { EmbedSchema } from './schema'

export default {
  title: 'Schema/Embed',
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      defaultValue:
        '<a data-thrivecart-account="uglytoolco" data-thrivecart-tpl="v2" data-thrivecart-product="10" class="thrivecart-button thrivecart-button-styled thrivecart-button_style-rounded thrivecart-button-gold thrivecart-embeddable" data-thrivecart-embeddable="tc-uglytoolco-10-FAQ1WS" >Buy now!</a><div data-thrivecart-account="uglytoolco" data-thrivecart-tpl="v2" data-thrivecart-product="10" class="thrivecart-embeddable" data-thrivecart-embeddable="tc-uglytoolco-10-FAQ1WS"></div><script async src="//tinder.thrivecart.com/embed/v1/thrivecart.js" id="tc-uglytoolco-10-FAQ1WS"></script>',
    },
  },
}

export const Default = createStory({
  defaultArgs: {
    content:
      '<a data-thrivecart-account="uglytoolco" data-thrivecart-tpl="v2" data-thrivecart-product="10" class="thrivecart-button thrivecart-button-styled thrivecart-button_style-rounded thrivecart-button-gold thrivecart-embeddable" data-thrivecart-embeddable="tc-uglytoolco-10-FAQ1WS" >Buy now!</a><div data-thrivecart-account="uglytoolco" data-thrivecart-tpl="v2" data-thrivecart-product="10" class="thrivecart-embeddable" data-thrivecart-embeddable="tc-uglytoolco-10-FAQ1WS"></div><script async src="//tinder.thrivecart.com/embed/v1/thrivecart.js" id="tc-uglytoolco-10-FAQ1WS"></script>',
  },
  schema: EmbedSchema,
  content: (args) => {
    return [
      {
        type: 'text',
        text: args.content,
      },
    ]
  },
})
