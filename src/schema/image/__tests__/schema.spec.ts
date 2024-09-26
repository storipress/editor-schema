import { Editor } from '@tiptap/vue-3'
import { baseSchema } from '~/dev-helpers/test-utils'
import { ImageSchema } from '../schema'

it('will respect paste attributes', () => {
  const editor = new Editor({
    extensions: [
      ...baseSchema,
      ImageSchema.configure({
        pasteAttributes: {
          provider: 'external_url',
        },
      }),
    ],
  })

  editor.view.pasteHTML('https://example.com/foo.png')

  expect(editor.state.doc.child(0).attrs).toHaveProperty('provider', 'external_url')
})
