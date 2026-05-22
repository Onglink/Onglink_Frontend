import type { StorybookConfig } from '@storybook/nextjs-vite';

const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  "staticDirs": [
    "..\\public"
  ],
  docs: {
    autodocs: true, 
  },
};
export default config as any as StorybookConfig;;