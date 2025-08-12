
import type { Preview } from '@storybook/vue3';
import '@/styles/index.less'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      grid: {
        cellSize: 10,
        opacity: 0.5,
        cellAmount: 5,
        offsetX: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
        offsetY: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
      },
    },
  },
};

export default preview;