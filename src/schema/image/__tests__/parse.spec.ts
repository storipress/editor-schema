import { html } from 'proper-tags'
import { parse } from '~/dev-helpers/parse'
import { ImageSchema } from '../schema'

// source: https://worawisut.wixsite.com/worawisut/ai-is-coming-sooner-than-we-think
it('wix image', () => {
  const node = parse(
    ImageSchema,
    html`
      <div id="viewer-pmsoi5563" class="_2vd5k iG0hRj">
        <div class="_3CWa- N9BmOG N9BmOG _3mymk">
          <div data-hook="imageViewer" class="_2kEVY" role="button" tabindex="-1" data-restore-tabindex="0">
            <div class="_3WJnn _2i-Gt _2Ybje" id="new-image25425126" style="--dim-height: 1982; --dim-width: 1284">
              <wow-image
                id="98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png"
                class="gXpdtc"
                data-image-info='{"containerId":"new-image25425126","displayMode":"fill","isLQIP":true,"isSEOBot":false,"lqipTransition":"blur","imageData":{"width":1284,"height":1982,"uri":"98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png","name":"","displayMode":"fill"}}'
                data-bg-effect-name=""
                data-has-ssr-src=""
                data-animate-blur=""
                data-src="https://static.wixstatic.com/media/98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png/v1/fill/w_740,h_1142,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png"
                data-transitioned=""
                ><img
                  src="https://static.wixstatic.com/media/98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png/v1/fill/w_740,h_1142,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png"
                  alt=""
                  style="
              width: 740px;
              height: 1142px;
              object-fit: cover;
              object-position: 50% 50%;
            "
                  data-pin-url="https://worawisut.wixsite.com/worawisut/ai-is-coming-sooner-than-we-think"
                  data-pin-media="https://static.wixstatic.com/media/98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png/v1/fill/w_1284,h_1982,al_c,q_95/98fa91_350303d2aeb94852a92ea6cb4f0bbf50~mv2.png"
                  fetchpriority="high"
                  data-load-done=""
              /></wow-image>
              <div class="-D6i8">
                <svg viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg" class="_2Lky3">
                  <path
                    d="M15.071 8.371V4.585l-4.355 4.356a.2.2 0 0 1-.283 0l-.374-.374a.2.2 0 0 1 0-.283l4.356-4.355h-3.786a.2.2 0 0 1-.2-.2V3.2c0-.11.09-.2.2-.2H16v5.371a.2.2 0 0 1-.2.2h-.529a.2.2 0 0 1-.2-.2zm-6.5 6.9v.529a.2.2 0 0 1-.2.2H3v-5.371c0-.11.09-.2.2-.2h.529c.11 0 .2.09.2.2v3.786l4.355-4.356a.2.2 0 0 1 .283 0l.374.374a.2.2 0 0 1 0 .283L4.585 15.07h3.786c.11 0 .2.09.2.2z"
                    fill="#000"
                    fill-rule="nonzero"
                    data-darkreader-inline-fill=""
                    style="--darkreader-inline-fill: #e8e6e3"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  )

  expect(node).toContainsNode(ImageSchema)
})

it('parse shopify img', () => {
  const node = parse(
    ImageSchema,
    html`
      <p><img src="https://cdn.shopify.com/s/files/1/0738/0228/5362/files/1_480x480.png?v=1689231086" alt="cat" /></p>
    `,
  )
  expect(node).toContainsNode(ImageSchema)
})

it('parse img with caption', () => {
  const node = parse(
    ImageSchema,
    html`
      <figure class="wp-block-image size-large">
        <img
          src="https://magazin.adeba.de/wp-content/uploads/2021/12/bike-473748_1280-1024x768.jpg"
          alt="Gebrauchtes Fahrrad kaufen: Der Kaufvertrag"
          class="wp-image-52276"
        />
        <figcaption>Gebrauchtes Fahrrad kaufen: Der Kaufvertrag</figcaption>
      </figure>
    `,
  )
  expect(node).toMatchInlineSnapshot(`
    {
      "content": [
        {
          "attrs": {
            "alt": "Gebrauchtes Fahrrad kaufen: Der Kaufvertrag",
            "cid": null,
            "file": null,
            "id": null,
            "link": "",
            "provider": null,
            "source": [],
            "src": "https://magazin.adeba.de/wp-content/uploads/2021/12/bike-473748_1280-1024x768.jpg",
            "style": null,
            "title": "Gebrauchtes Fahrrad kaufen: Der Kaufvertrag",
            "type": "normal",
          },
          "type": "image",
        },
      ],
      "type": "doc",
    }
  `)
})

describe('parse style', () => {
  it('parse img with style with simple img', () => {
    const node = parse(
      ImageSchema,
      html`
        <img
          src="https://andrewsheves.com/wp-content/uploads/2024/03/unrated.png"
          alt="Unrated"
          style="height: 18.5px; width: auto"
        />
      `,
    )
    expect(node).toMatchInlineSnapshot(`
    {
      "content": [
        {
          "attrs": {
            "alt": "Unrated",
            "cid": null,
            "file": null,
            "id": null,
            "link": "",
            "provider": null,
            "source": [],
            "src": "https://andrewsheves.com/wp-content/uploads/2024/03/unrated.png",
            "style": "height: 18.5px; width: auto",
            "title": "",
            "type": "normal",
          },
          "type": "image",
        },
      ],
      "type": "doc",
    }
  `)
  })

  it('parse img with style with simple figure', () => {
    const node = parse(
      ImageSchema,
      html`
        <figure>
          <img src="https://example.com/image.png" alt="Unrated" style="height: 18.5px; width: auto" />
          <figcaption>foo</figcaption>
        </figure>
      `,
    )
    expect(node).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "alt": "Unrated",
              "cid": null,
              "file": null,
              "id": null,
              "link": "",
              "provider": null,
              "source": [],
              "src": "https://example.com/image.png",
              "style": "height: 18.5px; width: auto",
              "title": "foo",
              "type": "normal",
            },
            "type": "image",
          },
        ],
        "type": "doc",
      }
    `)
  })

  it('parse img with style with figure that has style', () => {
    const node = parse(
      ImageSchema,
      html`
        <figure style="margin: 0 auto">
          <img src="https://example.com/image.png" alt="Unrated" style="height: 18.5px; width: auto" />
          <figcaption>foo</figcaption>
        </figure>
      `,
    )
    expect(node).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "attrs": {
              "alt": "Unrated",
              "cid": null,
              "file": null,
              "id": null,
              "link": "",
              "provider": null,
              "source": [],
              "src": "https://example.com/image.png",
              "style": "height: 18.5px; width: auto",
              "title": "foo",
              "type": "normal",
            },
            "type": "image",
          },
        ],
        "type": "doc",
      }
    `)
  })
})
