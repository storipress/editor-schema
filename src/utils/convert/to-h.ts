import type { Node } from 'unist'
import { stringify as commaStringify } from 'comma-separated-tokens'
import { find, html } from 'property-information'
import { stringify as spaceStringify } from 'space-separated-tokens'
import { convert } from 'unist-util-is'

export interface Text extends Node {
  type: 'text'
  value: string
}

export interface Element extends Node {
  type: 'element'
  tagName: string
  properties: Record<string, any>
  children: Node[]
}

const element = convert((node): node is Element => node.type === 'element')
export const text = convert((node): node is Text => node.type === 'text')

interface H {
  (tag: string, attr: Record<string, string>, children: any[]): any
}

export function toH(h: H, node: Element): any {
  const name: string = node.tagName as string
  const properties: Record<string, any> = node.properties as Record<string, any>
  const attributes = {}
  const children = node.children as Node[]
  const elements = []
  const length = children ? children.length : 0
  let index

  for (const property in properties) {
    addAttribute(attributes, property, properties[property])
  }

  index = -1

  while (++index < length) {
    const value = children[index]

    if (element(value)) {
      elements.push(toH(h, value))
    } else if (text(value)) {
      elements.push(value.value)
    }
  }

  // Ensure no React warnings are triggered for void elements having children
  // passed in.
  return h(name, attributes, elements)
}

function addAttribute(props: Record<string, any>, prop: string, value: any) {
  const info = find(html, prop)

  // Ignore nully and `NaN` values.
  // Ignore `false` and falsey known booleans for hyperlike DSLs.
  if (value === null || value === undefined || Number.isNaN(value) || value === false || (info.boolean && !value)) {
    return
  }

  if (value !== null && typeof value === 'object' && 'length' in value) {
    // Accept `array`.
    // Most props are space-separated.
    value = (info.commaSeparated ? commaStringify : spaceStringify)(value)
  }

  if (info.boolean) {
    value = ''
  }

  props[info.attribute] = value
}
