import { createStory } from '../../dev-helpers/story'
import { CodeBlock } from './schema'

export default {
  title: 'Schema/CodeBlock',
  argTypes: {
    wrapCode: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    language: {
      control: {
        type: 'text',
      },
      defaultValue: 'javascript',
    },
    content: {
      control: {
        type: 'text',
      },
      defaultValue: `for (var i in scripts) {
        if (scripts[i].src == src) {
          longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
        }
      }`,
    },
  },
}

export const Default = createStory<{ wrapCode: boolean; language: string; content: string }>({
  defaultArgs: {
    wrapCode: false,
    language: 'javascript',
    content: `for (var i in scripts) {
      if (scripts[i].src == src) {
        longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
      }
    }`,
  },
  attrs: (args) => {
    return {
      wrapCode: args.wrapCode,
      language: args.language,
      content: args.content,
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
  schema: CodeBlock,
})
