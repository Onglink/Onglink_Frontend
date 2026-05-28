/// <reference types="./declarations.d.ts" />
import type { Preview } from '@storybook/nextjs-vite'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    nextjs: {
      appDirectory: true, // Avisa ao Storybook que você está usando o App Router (pasta src/app)
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;