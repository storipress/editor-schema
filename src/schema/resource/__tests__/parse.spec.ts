import { html } from 'proper-tags'
import { expect, it } from 'vitest'
import { parse } from '~/dev-helpers/parse'
import { ResourceSchema } from '../schema'

// source: https://worawisut.wixsite.com/worawisut/amazon-kindle-scribe-review
it('wix youtube', () => {
  const node = parse(
    ResourceSchema,
    html`
      <div id="viewer-akeav" class="QHjDE iG0hRj">
        <div class="gO6aa N9BmOG N9BmOG flaqF">
          <div class="cZYzi tzVaOA" style="padding-bottom: 56.2162%;">
            <div tabindex="-1" data-hook="reactPlayerWrapper" data-restore-tabindex="0">
              <div class="_1IUhX" style="width: 100%; height: 100%;" data-loaded="true">
                <div style="width: 100%; height: 100%;">
                  <iframe
                    frameborder="0"
                    allowfullscreen="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    title="Introducing Amazon's Kindle Scribe | Amazon News"
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/QSl721wVaqI?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Fworawisut.wixsite.com&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"
                    id="widget2"
                    tabindex="-1"
                    data-restore-tabindex="null"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  )
  expect(node).toContainsNode(ResourceSchema)
})

it('simple iframe', () => {
  const node = parse(
    ResourceSchema,
    html`
      <iframe
        frameborder="0"
        allowfullscreen="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="Introducing Amazon's Kindle Scribe | Amazon News"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/QSl721wVaqI?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Fworawisut.wixsite.com&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"
        id="widget2"
        tabindex="-1"
        data-restore-tabindex="null"
      ></iframe>
    `,
  )
  expect(node).toContainsNode(ResourceSchema)
})

it('parse shopify iframe', () => {
  const node = parse(
    ResourceSchema,
    html`
      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/FyVXpCSjApg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen=""
        ></iframe>
      </p>
    `,
  )
  expect(node).toContainsNode(ResourceSchema)
})

it('parse not figure iframe', () => {
  const node = parse(
    ResourceSchema,
    html`
      <figure class="table">
        <table></table>
      </figure>
    `,
  )
  expect(node).not.toContainsNode(ResourceSchema)
})

it('parse figure iframe', () => {
  const node = parse(
    ResourceSchema,
    html`
      <figure class="table">
        <iframe src="test"> </iframe>
      </figure>
    `,
  )
  expect(node).toContainsNode(ResourceSchema)
})

it('parse pure text', () => {
  const node = parse(ResourceSchema, html`<p>This is an apple</p>`)
  expect(node).not.toContainsNode(ResourceSchema)
})
