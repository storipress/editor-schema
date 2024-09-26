// copied from https://regexr.com/3um70
export const URL_REGEX = /https?:\/\/[^\s$.?#].\S*/gi

// special handle for unsplash as it doesn't contains extension
export const IMAGE_URL_REGEX =
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  /(?:https?:\/\/[^\s$.?#].\S*\.(?:png|jpe?g|gif|webp|bmp|svg)(\?\S*)?(#\S*)?$|https:\/\/images.unsplash.com\/\S*)/gi
