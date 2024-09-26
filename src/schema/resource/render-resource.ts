import type { DOMOutputSpec } from '@tiptap/pm/model'
import type { Attr, BookmarkMetaContent, EmbedMeta, RenderBookmarkHTMLInput } from './resource-types'
import { safeParse } from '~/utils/json'
import { h, renderHTML } from '../render-html'
import { renderBookmarkImpl as renderBookmarkImplNoThumbnail } from './render-resource-impl'

function renderBookmarkImpl(meta: BookmarkMetaContent): DOMOutputSpec[] {
  return meta.thumbnail
    ? [h('div', { class: 'bookmark__link' }, ...renderBookmarkHTML(meta))]
    : renderBookmarkImplNoThumbnail(meta)
}

export function renderBookmark(attr: Attr) {
  const meta: BookmarkMetaContent | null = safeParse(attr.meta)

  if (!meta) {
    return []
  }

  return renderBookmarkImpl(meta)
}

export function renderEmbed(attr: Attr): DOMOutputSpec[] {
  const meta: EmbedMeta | null = safeParse(attr.meta)
  if (!meta) {
    return []
  }

  return renderBookmarkHTML(meta)
}

export function renderBookmarkHTML(meta: RenderBookmarkHTMLInput): DOMOutputSpec[] {
  return renderHTML(meta.iframe0 || meta.html, true)
}
