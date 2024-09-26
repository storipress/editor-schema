import { Editor } from '@tiptap/core'
import { expect, it } from 'vitest'
import { fullSchema } from '../dev-helpers/test-utils'

it('paste image url should covert to image', () => {
  const editor = new Editor({ extensions: fullSchema })
  editor.view.pasteHTML('https://robohash.org/image.png')

  expect(editor.getJSON()).toMatchInlineSnapshot(`
    {
      "content": [
        {
          "attrs": {
            "alt": "",
            "cid": null,
            "file": null,
            "id": null,
            "link": "",
            "provider": null,
            "source": [],
            "src": "https://robohash.org/image.png",
            "style": "",
            "title": "",
            "type": "regular",
          },
          "type": "image",
        },
      ],
      "type": "doc",
    }
  `)
})

const IMAGE_URLS = [
  'https://robohash.org/image.png',
  'https://robohash.org/image.jpg',
  'https://robohash.org/image.jpeg',
  'https://robohash.org/image.webp',
  'https://robohash.org/image.webp?foo=bar',
  'https://robohash.org/image.webp#hash',
  'https://robohash.org/image.webp?foo=bar#hash',
  'https://images.unsplash.com/photo-1695422078549-335effc4e98c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1960&q=80',
  'https://images.pexels.com/photos/18110788/pexels-photo-18110788/free-photo-of-italian-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]

it.each(IMAGE_URLS)('paste image url should covert to image', (url) => {
  const editor = new Editor({ extensions: fullSchema })
  editor.view.pasteHTML(url)
  expect(editor.state.doc.firstChild).toBeDefined()
  expect(editor.state.doc.firstChild?.type.name).toBe('image')
  expect(editor.state.doc.firstChild?.attrs.src).toBe(url)
})

it('paste other link should be covert to resource', () => {
  const editor = new Editor({ extensions: fullSchema })
  editor.view.pasteHTML('https://www.youtube.com/watch?v=IYiHNzFoA8g')

  expect(editor.getJSON()).toMatchInlineSnapshot(`
    {
      "content": [
        {
          "attrs": {
            "caption": "",
            "id": null,
            "meta": null,
            "showMenu": true,
            "target": null,
            "type": "embed",
            "url": "https://www.youtube.com/watch?v=IYiHNzFoA8g",
          },
          "type": "resource",
        },
      ],
      "type": "doc",
    }
  `)
})
