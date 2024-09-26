import { createStory } from '../../dev-helpers/story'
import { ResourceSchema } from './schema'

export default {
  title: 'Schema/resource',
}

export const Default = createStory({
  schema: ResourceSchema,
  attrs: () => {
    return {
      url: 'https://storipress.com/blog/posts/how-to-create-an-editorial-calendar-for-content-marketing-success-in-2023',
      type: 'embed',
      meta: '{"title":"Create a Winning Editorial Calendar: Steps for Streamlined Content Strategy","description":"Learn to create an editorial calendar for content success in 2023. Boost organization, consistency, and collaboration with our step-by-step guide.","author":"","icon":"https://storipress.com/images/favicon.png","url":"https://storipress.com/blog/posts/how-to-create-an-editorial-calendar-for-content-marketing-success-in-2023","thumbnail":"https://assets.stori.press/media/images/9f5cb308-01d5-4b34-8664-a05e138fa648.png","html":"<div><div style=\\"left: 0; width: 100%; height: 140px; position: relative;\\"><iframe data-iframely-url=\\"https://cdn.iframe.ly/api/iframe?app=1&url=https%3A%2F%2Fstoripress.com%2Fblog%2Fposts%2Fhow-to-create-an-editorial-calendar-for-content-marketing-success-in-2023&key=6d002d15348823942403bf5e779d2cca\\" style=\\"top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;\\" allowfullscreen></iframe></div></div>","aspectRadio":1.5}',
    }
  },
})

export const NoHtml = createStory({
  schema: ResourceSchema,
  attrs: () => {
    return {
      url: 'https://www.ruby-lang.org/en/',
      type: 'bookmark',
      meta: '{"title":"Ruby Programming Language","description":"A dynamic, open source programming language with a focus on\\n    simplicity and productivity. It has an elegant syntax that is\\n    natural to read and easy to write.","author":"","icon":"https://www.ruby-lang.org/favicon.ico","url":"https://www.ruby-lang.org/en/","thumbnail":"","aspectRadio":1}',
    }
  },
})

export const HasHtml = createStory({
  schema: ResourceSchema,
  attrs: () => {
    return {
      url: 'https://vitejs.dev/',
      type: 'bookmark',
      meta: '{"title":"Vite","description":"Next Generation Frontend Tooling","author":"","icon":"https://vitejs.dev/logo.svg","publisher":"vite_js","url":"https://vitejs.dev","thumbnail":"https://vitejs.dev/og-image.png","html":"<div><div style=\\"left: 0; width: 100%; height: 140px; position: relative;\\"><iframe data-iframely-url=\\"https://cdn.iframe.ly/api/iframe?card=1&app=1&url=https%3A%2F%2Fvitejs.dev%2Fguide%2F&key=6d002d15348823942403bf5e779d2cca\\" style=\\"top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;\\" allowfullscreen></iframe></div></div>","aspectRadio":1.9969278033794162}',
    }
  },
})
