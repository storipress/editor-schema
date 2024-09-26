import type {} from 'typed-query-selector'

export function fixGalleryLayout(root: Document | Element = document) {
  const images = root.querySelectorAll<HTMLImageElement>('[data-format="gallery"][data-ver="2"] img')
  images.forEach((image) => {
    const container = image.closest('div') as HTMLElement
    const img = new Image()
    img.onload = function () {
      if (container) {
        const ratio = img.width / img.height
        container.style.flex = `${ratio} 1 0%`
      }
    }
    img.src = image.src
  })
}
