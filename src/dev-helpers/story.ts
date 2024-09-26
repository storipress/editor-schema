import type { Args, StoryObj } from '@storybook/vue3'
import type { AnyExtension, Content, JSONContent } from '@tiptap/core'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { noop } from 'lodash-es'
import { pascalCase } from 'scule'
import { defineComponent, h, watch } from 'vue'
import { baseSchema } from '~/dev-helpers/test-utils'

interface CreateStoryInput<SchemaArgs extends Args> {
  schema: AnyExtension
  attrs?: Record<string, any> | ((args: SchemaArgs) => Record<string, any>)
  content?: JSONContent[] | ((args: SchemaArgs) => JSONContent[])
  setup?: (editor: Editor) => void
  defaultArgs?: SchemaArgs
}

export function createStory<SchemaArgs extends Args>({
  schema,
  attrs: attrsOrFactory,
  content: contentOrFactory,
  setup = noop,
  defaultArgs,
}: CreateStoryInput<SchemaArgs>): StoryObj<SchemaArgs> {
  const name = `Schema${pascalCase(schema.name)}`

  function createContent(args: SchemaArgs): Content {
    const attrs = typeof attrsOrFactory === 'function' ? attrsOrFactory(args) : attrsOrFactory
    const content = typeof contentOrFactory === 'function' ? contentOrFactory(args) : contentOrFactory
    return {
      type: 'doc',
      content: [
        {
          type: schema.name,
          attrs,
          content,
        },
      ],
    }
  }

  return {
    args: defaultArgs,
    render: (args: SchemaArgs) =>
      defineComponent({
        name,
        setup: () => {
          const editor = new Editor({
            editable: true,
            extensions: [...baseSchema, schema],
            content: createContent(args),
          })

          watch(
            () => args,
            (args) => {
              editor.commands.setContent(createContent(args))
            },
            { deep: true },
          )

          setup(editor)

          return () => h(EditorContent, { editor, class: 'max-w-2xl' })
        },
      }),
  }
}
