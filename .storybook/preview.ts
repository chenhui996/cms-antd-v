
import type { Preview } from '@storybook/vue3';
import { withAntdTheme } from './decorators/antdTheme';

const preview: Preview = {
  decorators: [withAntdTheme],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    themeMode: {
      name: '主题',
      description: '切换 Ant Design 主题',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: ['light', 'dark'],
      },
    },
  }
};

export default preview;