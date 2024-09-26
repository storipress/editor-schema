import type { DOMOutputSpec } from '@tiptap/pm/model'
import type { Node } from 'unist'
import type { Element } from './to-h'

import { fromDom } from 'hast-util-from-dom'
import { window } from '../environment'
import { sanitize } from './sanitize'
import { text, toH } from './to-h'

export { sanitize } from './sanitize'

function h(tag: string, attr: Record<string, string>, children: DOMOutputSpec[]): DOMOutputSpec {
  if (!tag) {
    return ''
  }
  return [tag, attr, ...children]
}

const globalConfig = { sanitize: false }

export function configSanitizer(config: Partial<typeof globalConfig>) {
  const old = { ...globalConfig }
  Object.assign(globalConfig, config)
  return old
}

export function purify(content: string, allowIframe = false, allowScript = true): HTMLElement {
  if (globalConfig.sanitize) {
    return sanitize(content, {
      RETURN_DOM: true,
      FORCE_BODY: allowScript,
      ADD_TAGS: [allowIframe && 'iframe', allowScript && 'script'].filter((e): e is string => Boolean(e)),
    })
  }
  const container = window.document.createElement('div')
  container.innerHTML = content
  return container
}

export function htmlToHast(content: string, allowIframe: boolean): Node[] {
  return (fromDom(purify(content, allowIframe)) as any).children
}

export function hastToOutputSpec(hast: Element): DOMOutputSpec {
  return toH(h, hast)
}

export function htmlToOutputSpec(content: string, allowIframe = false) {
  const nodes = htmlToHast(content, allowIframe)
  return nodes.map((node): DOMOutputSpec => {
    if (text(node)) {
      return ['div', {}, node.value]
    }
    return hastToOutputSpec(node as Element)
  })
}
