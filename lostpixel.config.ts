import type { CustomProjectConfig } from 'lost-pixel'

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './storybook-static',
  },
  // OSS mode
  threshold: 0.01,
  generateOnly: true,
  failOnDifference: true,
}
