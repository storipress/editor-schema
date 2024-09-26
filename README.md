# @storipress/tiptap-schema

Shared schema for Editor

## API

### Config

Use the `setConfig` function to config them

List of configs:

- `embedRegex`: regex to match URLs for automatically convert to embed

### Schema

- `schemaExtensions`: Full schema extensions array
- `createSchemaExtensions`: Use for extend extensions with NodeView
- `richInputExtensions`: Extensions for RichInput component

### Helpers

- `gallerySettings`: Classes for gallery
- `schema`: ProseMirror schema
- `parse`: Convert html string to ProseMirror document
- `render`: Convert ProseMirror document to html
- `renderFragment`: Convert ProseMirror fragment to html
- `walkTree`: Traverse ProseMirror's Node and allow you to modify specific kinds of Node
- `loadDocument`: Convert ProseMirror json to ProseMirror Node
- `stopEvent`: For `NodeView` to configure the `stopEvent`
- `purify`: Sanitize HTML
- `assertJSON(x)`: if `x` is a valid JSON string, return `x`, else return `null`
- `safeParse(x)`: if `x` is a valid JSON string, return the parsed result, else return `null`

## Examples

Please see tests/examples/doc-example.spec.ts for runnable example

### Parse html to ProseMirror Node

```ts
const node = parse(html)
// then you can use `walkTree` to modify ProseMirror Node
```

### Convert ProseMirror Node to JSON

```ts
const node = parse(html)
console.log(node.toJSON())
```

### Modify image src

In this example, we wrap all the image node's URL with `$`

ProseMirror Node is an immutable structure, you'll need to create a new node with `node.type.create`

```ts
const node = parse(html)
const result = await walkTree(node, {
  image: (node: Node) => {
    // This will create a new Node with
    return node.type.create({
      ...node.attrs,
      src: `$${node.attrs.src}$`,
    })
  },
})
```

## Development

```shell
$ yarn install
$ yarn build
$ yarn test
```

### Test

~~這個 repo 裡主要都是靠 integration test 的方式，直接去載入 build 好的檔案進行測試~~

目前已經修好了無法正常 import 檔案測試的問題，可以用一般的 unit test 測試
