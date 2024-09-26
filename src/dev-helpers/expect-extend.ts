import type { JSONContent, Node } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

interface CustomMatchers<R = unknown> {
  toContainsNode: (expectNode: ProseMirrorNode | Node | string) => R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toContainsNode(nodeOrContent: ProseMirrorNode | JSONContent, expectedNode: ProseMirrorNode | Node | string) {
    const content: JSONContent = nodeOrContent instanceof ProseMirrorNode ? nodeOrContent.toJSON() : nodeOrContent

    const expectedNodeName =
      typeof expectedNode === 'string'
        ? expectedNode
        : expectedNode instanceof ProseMirrorNode
          ? expectedNode.type.name
          : expectedNode.name

    const node = findNodeDeep(content, expectedNodeName)
    if (!node) {
      return {
        pass: false,
        message: () => `expected node ${expectedNodeName} to be in the content`,
        actual: content,
      }
    }

    return {
      pass: true,
      message: () => `expected node ${expectedNodeName} not to be in the content`,
      actual: content,
    }
  },
})

function findNodeDeep(content: JSONContent, nodeName: string): JSONContent | null {
  if (content.type === nodeName) {
    return content
  }

  if (Array.isArray(content.content)) {
    for (const node of content.content) {
      const result = findNodeDeep(node, nodeName)

      if (result) {
        return result
      }
    }
  }

  return null
}
