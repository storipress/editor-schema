import type { BookmarkMetaContent } from '../resource-types'
import { getHTMLFromFragment, getSchema } from '@tiptap/core'
import { Fragment } from '@tiptap/pm/model'
import { expect, it } from 'vitest'
import { safeParse } from '~/utils/json'
import { baseSchema } from '../../../dev-helpers/test-utils'
import { renderBookmarkImpl } from '../render-resource-impl'
import { ResourceSchema } from '../schema'

const extensions = [...baseSchema, ResourceSchema]

it('have same html structure between bookmark.vue and render-resource-impl.jsx', () => {
  const schema = getSchema(extensions)
  const meta: BookmarkMetaContent = {
    url: '#',
    title: 'title',
    thumbnail: 'thumbnail',
    publisher: 'publisher',
    icon: 'icon',
    description: 'description',
    author: 'Author',
    html: '<div>title</div>',
  }
  const staticHTML = getHTMLFromFragment(
    Fragment.fromArray([schema.nodes.resource.create({ meta: JSON.stringify(meta), type: 'bookmark' })]),
    schema,
  )
  expect(staticHTML).toMatchSnapshot()
  expect(staticHTML).not.toContain('template')

  const div = document.createElement('div')
  div.innerHTML = staticHTML
  const bookmarkHTML = div.querySelector('.bookmark__link')?.innerHTML
  expect(bookmarkHTML).toBeDefined()
  expect(bookmarkHTML).toMatchSnapshot()
})

it('render success when no author', () => {
  const schema = getSchema(extensions)
  const meta: BookmarkMetaContent = {
    url: '#',
    title: 'title',
    thumbnail: 'thumbnail',
    publisher: 'publisher',
    icon: 'icon',
    html: '<div>foo</div>',
    description: 'description',
    author: undefined,
  }
  const staticHTML = getHTMLFromFragment(
    Fragment.fromArray([schema.nodes.resource.create({ meta: JSON.stringify(meta), type: 'bookmark' })]),
    schema,
  )

  expect(staticHTML).toMatchSnapshot()
})

it('render success when no html', () => {
  const schema = getSchema(extensions)
  const meta: BookmarkMetaContent = {
    url: '#',
    title: 'title',
    thumbnail: 'thumbnail',
    publisher: 'publisher',
    icon: 'icon',
    html: '',
    description: 'description',
    author: undefined,
  }
  const staticHTML = getHTMLFromFragment(
    Fragment.fromArray([schema.nodes.resource.create({ meta: JSON.stringify(meta), type: 'bookmark' })]),
    schema,
  )

  expect(staticHTML).toMatchSnapshot()
})

it('render success for a lot of empty data', () => {
  const schema = getSchema(extensions)
  const meta: BookmarkMetaContent = {
    title: "Chairman's Letter - 1980",
    description: '',
    author: '',
    icon: '',
    url: 'https://www.berkshirehathaway.com/letters/1980.html',
    thumbnail: '',
    aspectRadio: 1,
  } as any

  const staticHTML = getHTMLFromFragment(
    Fragment.fromArray([schema.nodes.resource.create({ meta: JSON.stringify(meta), type: 'bookmark' })]),
    schema,
  )

  expect(staticHTML).toMatchSnapshot()
})

it('renderer prefer iframe0 data', () => {
  const schema = getSchema(extensions)
  const meta: BookmarkMetaContent = {
    url: '#',
    title: 'title',
    thumbnail: 'thumbnail',
    publisher: 'publisher',
    icon: 'icon',
    html: '<div>foo</div>',
    iframe0: '<div>iframe0</div>',
    description: 'description',
    author: undefined,
  }
  const staticHTML = getHTMLFromFragment(
    Fragment.fromArray([schema.nodes.resource.create({ meta: JSON.stringify(meta), type: 'bookmark' })]),
    schema,
  )

  expect(staticHTML).toMatch('iframe0')
  expect(staticHTML).toMatchSnapshot()
})

it('render impl should not contain className', () => {
  const meta =
    '{"title":"Create a Winning Editorial Calendar: Steps for Streamlined Content Strategy","description":"Learn to create an editorial calendar for content success in 2023. Boost organization, consistency, and collaboration with our step-by-step guide.","author":"","icon":"https://storipress.com/images/favicon.png","url":"https://storipress.com/blog/posts/how-to-create-an-editorial-calendar-for-content-marketing-success-in-2023","thumbnail":"https://assets.stori.press/media/images/9f5cb308-01d5-4b34-8664-a05e138fa648.png","html":"<div><div style=\\"left: 0; width: 100%; height: 140px; position: relative;\\"><iframe data-iframely-url=\\"https://cdn.iframe.ly/api/iframe?app=1&url=https%3A%2F%2Fstoripress.com%2Fblog%2Fposts%2Fhow-to-create-an-editorial-calendar-for-content-marketing-success-in-2023&key=6d002d15348823942403bf5e779d2cca\\" style=\\"top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;\\" allowfullscreen></iframe></div></div>","aspectRadio":1.5}'
  expect(JSON.stringify(renderBookmarkImpl(safeParse(meta)))).not.toContain('className')
  expect(JSON.stringify(renderBookmarkImpl(safeParse(meta)))).not.toContain('classname')
})
