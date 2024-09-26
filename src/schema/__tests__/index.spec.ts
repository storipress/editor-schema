import { configSanitizer, htmlToOutputSpec, purify } from '../../utils/convert'

describe('embed-editor', (): void => {
  describe('htmlToOutputSpec', (): void => {
    it.skip('convert html to prosemirror output spec', (): void => {
      expect(htmlToOutputSpec('<p><strong>a</strong></p>')).toEqual([['p', {}, ['strong', {}, 'a']]])
    })
  })

  describe('purify', () => {
    let old = {}
    beforeEach(() => {
      old = configSanitizer({})
    })
    afterEach(() => {
      configSanitizer(old)
    })

    describe('when sanitize == false', () => {
      it.skip('purify remove script', () => {
        const html = purify('<div class="some-class"></div><script></script>').innerHTML
        expect(html).toContain('div')
        expect(html).toContain('some-class')
        expect(html).not.toContain('script')
        expect(html).toMatchSnapshot()
      })

      it.skip('purify remove iframe', () => {
        const html = purify('<div class="some-class"></div><iframe></iframe>').innerHTML
        expect(html).toContain('div')
        expect(html).toContain('some-class')
        expect(html).not.toContain('iframe')
        expect(html).toMatchSnapshot()
      })

      it.skip('purify could allow iframe', () => {
        const html = purify('<div class="some-class"></div><iframe></iframe>', true).innerHTML
        expect(html).toContain('div')
        expect(html).toContain('some-class')
        expect(html).toContain('iframe')
        expect(html).toMatchSnapshot()
      })
    })

    describe('when stanitize == true', () => {
      beforeEach(() => {
        configSanitizer({ sanitize: false })
      })

      it('purify allow everything', () => {
        const html = purify('<div class="some-class"></div><iframe></iframe><script></script>').innerHTML
        expect(html).toContain('div')
        expect(html).toContain('some-class')
        expect(html).toContain('iframe')
        expect(html).toContain('script')
        expect(html).toMatchSnapshot()
      })
    })
  })
})
