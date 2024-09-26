import { renderWithMark } from '../schema-helpers'

it('can generate html with article mark', () => {
  const html = renderWithMark(
    {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Line 1',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Line 2',
            },
          ],
        },
      ],
    },
    { articleId: 'article_id', clientId: 'client_id' },
  )

  expect(html).toMatchSnapshot()
})

it('can generate multiple line html with article mark', () => {
  const html = renderWithMark(
    {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Line 1',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Line 2',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Line 3',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Line 4',
            },
          ],
        },
      ],
    },
    { articleId: 'article_id', clientId: 'client_id' },
  )

  expect(html).toMatchSnapshot()
})
