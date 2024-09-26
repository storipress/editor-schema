// https://github.com/ueberdosis/tiptap/blob/main/packages/extension-table/src/utilities/createTable.ts

import { Table as TableWithType } from '@tiptap/extension-table'

export const Table = TableWithType.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
      },
    }
  },
})
