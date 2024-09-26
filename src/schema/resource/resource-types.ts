export interface RenderBookmarkHTMLInput {
  iframe0?: string
  html: string
}

export interface BookmarkMetaContent extends RenderBookmarkHTMLInput {
  author?: string
  description?: string
  icon?: string
  publisher?: string
  title?: string
  url?: string
  thumbnail?: string
}

export interface EmbedMeta extends RenderBookmarkHTMLInput {
  provider_name: string
  type: string
}

export interface Attr {
  meta?: string
}
