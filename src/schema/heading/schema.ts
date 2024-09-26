// copied from: https://github.com/ueberdosis/tiptap/blob/42039c05f0894a2730a7b8f1b943ddb22d52a824/packages/extension-code-block/src/code-block.ts#L116

import { Heading as HeadingWithType } from '@tiptap/extension-heading'

export const Heading = HeadingWithType.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
      },
    }
  },
})
