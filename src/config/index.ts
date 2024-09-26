export interface Config {
  embedRegex: RegExp[]
}

const DEFAULT_CONFIG: Config = {
  embedRegex: [],
}

export const schemaConfig: Config = { ...DEFAULT_CONFIG }

export function setConfig(newConfig: Partial<Config>) {
  Object.assign(schemaConfig, newConfig)
}
