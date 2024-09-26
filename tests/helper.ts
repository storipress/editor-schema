import { fs, path } from 'zx'

let checked = false
export async function ensureBuildExist() {
  if (checked) {
    return
  }
  checked = true
  const exists = await fs.pathExists(path.resolve(__dirname, '../dist/editor-schema.cjs'))
  if (!exists) {
    throw new Error('please run `yarn build` before execute test')
  }
}
