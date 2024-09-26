import type { NodeType } from '@tiptap/pm/model'
// rewrite from https://github.com/ueberdosis/tiptap/blob/main/packages/tiptap-commands/src/commands/pasteRule.js
import { callOrReturn, PasteRule } from '@tiptap/core'

export function blockPasteRule({
  find,
  type,
  getAttributes,
}: {
  find: RegExp
  type: NodeType
  getAttributes?: (content: RegExpMatchArray) => Record<string, unknown> | false | null
}) {
  return new PasteRule({
    find,
    handler: ({ match, range, state, commands }) => {
      const $from = state.doc.resolve(range.from)
      const $to = state.doc.resolve(range.to)

      if (!$from.sameParent($to)) {
        return
      }

      const node = $from.parent

      // we can't replace root
      if ($from.depth === 0) {
        return
      }

      // we only replace entire block
      if (node.textContent !== match[0]) {
        return
      }

      const blockStart = $from.index()
      const blockEnd = $to.indexAfter()
      const blockFrom = $from.start()
      const blockTo = $to.end()

      if (blockEnd - blockStart !== 1) {
        // how? we should work on single node
        return
      }

      const grandparent = $from.node($from.depth - 1)

      // finally, we check if we can replace the block
      if (grandparent.canReplaceWith(blockStart, blockEnd, type)) {
        const attrs = callOrReturn(getAttributes, null, match)
        if (attrs === false || attrs === null) {
          return
        }
        commands.command(({ dispatch, tr }) => {
          if (dispatch) {
            dispatch(tr.replaceRangeWith(blockFrom, blockTo, type.create(attrs)))
          }
          return true
        })
      }
    },
  })
}
