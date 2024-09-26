import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paidContent: {
      addPaidContent: () => ReturnType
    }
  }
}

function isMacOS(): boolean {
  return typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false
}

function isiOS(): boolean {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

export const PaidContent = Node.create({
  name: 'paidContent',
  content: 'paragraph block*',
  defining: true,
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-format="paid-content"]',
      },
    ]
  },

  renderHTML() {
    return [
      'div',
      {
        'data-format': 'paid-content',
      },
      0,
    ]
  },

  addCommands() {
    return {
      addPaidContent:
        () =>
        ({ commands }) => {
          return commands.appendBlock(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    // delete the node if it's empty

    const handleBackspace = () => {
      const blockRange = this.editor.state.selection.$from.blockRange(
        this.editor.state.selection.$to,
        (node) => node.type.name === this.name,
      )
      const node = this.editor.state.selection.$from.node(1)
      if (!node) {
        return false
      }
      const isEmpty =
        node.type.name === this.name &&
        node.childCount === 1 &&
        node.firstChild!.isTextblock &&
        node.firstChild!.textContent === ''

      if (!blockRange || !isEmpty) {
        return false
      }
      this.editor.commands.deleteNode(this.name)
      return true
    }

    const baseKeymap = {
      Backspace: handleBackspace,
      'Mod-Backspace': handleBackspace,
      'Shift-Backspace': handleBackspace,
    }

    const pcKeymap = {
      ...baseKeymap,
    }

    const macKeymap = {
      ...baseKeymap,
      'Ctrl-h': handleBackspace,
      'Alt-Backspace': handleBackspace,
    }

    if (isiOS() || isMacOS()) {
      return macKeymap
    }

    return pcKeymap
  },
})
