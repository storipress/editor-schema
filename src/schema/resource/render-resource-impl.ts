import type { DOMOutputSpec } from '@tiptap/pm/model'
import type { BookmarkMetaContent } from './resource-types'

import htm from 'htm'
import { h } from '../render-html'

const html = htm.bind(h)

export function renderBookmarkImpl(meta: BookmarkMetaContent): DOMOutputSpec[] {
  return [
    html`<a class="bookmark__link" href=${meta.url}>
      <div class="bookmark">
        <div class="bookmark__info">
          <div class="bookmark__headline">${meta.title}</div>

          <div class="bookmark__description">
            <div class="bookmark__content">${meta.description || ''}</div>
          </div>

          <div class="bookmark__meta">
            ${[
              meta.icon ? html`<img class="bookmark__icon" src=${meta.icon} alt="icon" />` : null,
              meta.author ? html`<span class="bookmark__author">${meta.author}</span>` : null,
              meta.author ? html`<span class="bookmark__dot">•</span>` : null,
              html`<span>${meta.publisher || ''}</span>`,
            ]}
          </div>
        </div>
      </div>
    </a>` as DOMOutputSpec,
  ]
}
