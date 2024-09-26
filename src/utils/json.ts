export function assertJSON(s: string | undefined) {
  if (!s) {
    return null
  }

  try {
    JSON.parse(s)
    return s
  } catch {
    return null
  }
}

export function safeParse(s: string | undefined) {
  if (!s) {
    return null
  }

  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
