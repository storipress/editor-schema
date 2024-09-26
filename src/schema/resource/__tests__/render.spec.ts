import { getByRole, queryByRole } from '@testing-library/dom'
import { expect, it } from 'vitest'
import { render } from '~/schema/schema-helpers'

it('should not render link for youtube embed', () => {
  const html = render({
    type: 'doc',
    content: [
      {
        type: 'resource',
        attrs: {
          type: 'embed',
          url: 'https://www.youtube.com/watch?v=21bCrsGt050',
          meta: '{"title":"Mili - Entertainment / "Goblin Slayer 2" Opening [Full]","description":"Mili on Patreon: https://www.patreon.com/project_mili\n\nMili Merch & Goods: https://projectmili.store/\n\nFollow Mili\nSpotify: https://open.spotify.com/artist/0K05TDnN7xPwIHDOwD2YYs\nApple Music: https://itunes.apple.com/jp/artist/mili/906934266\nTwitter (X): https://twitter.com/ProjectMili\nInstagram: https://www.instagram.com/projectmili/\nFacebook: https://www.facebook.com/ProjectMili\nHomepage: http://projectmili.com/\n\nLyrics: Cassie Wei\nMusic: Cassie Wei & Yamato Kasai\nArrangement: Yamato Kasai, arai tasuku\n\nArtwork: AO FUJIMORI\n\nMixing Engineer: Satoshi Yoneda ( https://en.satoshiyoneda.com/ )\nMastering: Akihiro Shiba (TEMAS)\n\n\nMili members on Twitter (X)\nCassie Wei: https://twitter.com/momocashew\nYamato Kasai: https://twitter.com/HAMOloid/\nYukihito: https://twitter.com/going_man\nShoto Yoshida: https://twitter.com/shoto_0y\nAo Fujimori: https://twitter.com/pioooooon\n\n#Mili","author":"Mili","icon":"https://www.youtube.com/s/desktop/6ee70b2c/img/favicon_32x32.png","publisher":"YouTube","url":"https://www.youtube.com/watch?v=21bCrsGt050","thumbnail":"https://i.ytimg.com/vi/21bCrsGt050/maxresdefault.jpg","html":"<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe data-iframely-url="https://cdn.iframe.ly/api/iframe?playerjs=1&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D21bCrsGt050&key=6d002d15348823942403bf5e779d2cca" data-img style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="autoplay *; accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"></iframe></div></div>","iframe0":"<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/21bCrsGt050?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"></iframe></div>","aspectRadio":1}',
        },
      },
    ],
  })
  const container = document.createElement('div')
  container.innerHTML = html

  expect(queryByRole(container, 'link')).toBeFalsy()
})

it('should render link for youtube card', () => {
  const html = render({
    type: 'doc',
    content: [
      {
        type: 'resource',
        attrs: {
          type: 'bookmark',
          url: 'https://www.youtube.com/watch?v=21bCrsGt050',
          meta: '{"title":"Mili - Entertainment / "Goblin Slayer 2" Opening [Full]","description":"Mili on Patreon: https://www.patreon.com/project_mili\n\nMili Merch & Goods: https://projectmili.store/\n\nFollow Mili\nSpotify: https://open.spotify.com/artist/0K05TDnN7xPwIHDOwD2YYs\nApple Music: https://itunes.apple.com/jp/artist/mili/906934266\nTwitter (X): https://twitter.com/ProjectMili\nInstagram: https://www.instagram.com/projectmili/\nFacebook: https://www.facebook.com/ProjectMili\nHomepage: http://projectmili.com/\n\nLyrics: Cassie Wei\nMusic: Cassie Wei & Yamato Kasai\nArrangement: Yamato Kasai, arai tasuku\n\nArtwork: AO FUJIMORI\n\nMixing Engineer: Satoshi Yoneda ( https://en.satoshiyoneda.com/ )\nMastering: Akihiro Shiba (TEMAS)\n\n\nMili members on Twitter (X)\nCassie Wei: https://twitter.com/momocashew\nYamato Kasai: https://twitter.com/HAMOloid/\nYukihito: https://twitter.com/going_man\nShoto Yoshida: https://twitter.com/shoto_0y\nAo Fujimori: https://twitter.com/pioooooon\n\n#Mili","author":"Mili","icon":"https://www.youtube.com/s/desktop/6ee70b2c/img/favicon_32x32.png","publisher":"YouTube","url":"https://www.youtube.com/watch?v=21bCrsGt050","thumbnail":"https://i.ytimg.com/vi/21bCrsGt050/maxresdefault.jpg","html":"<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe data-iframely-url="https://cdn.iframe.ly/api/iframe?playerjs=1&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D21bCrsGt050&key=6d002d15348823942403bf5e779d2cca" data-img style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="autoplay *; accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"></iframe></div></div>","iframe0":"<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/21bCrsGt050?rel=0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"></iframe></div>","aspectRadio":1}',
        },
      },
    ],
  })
  const container = document.createElement('div')
  container.innerHTML = html

  expect(getByRole(container, 'link')).toBeDefined()
  expect(getByRole(container, 'link')).toHaveClass('bookmark__link')
})
