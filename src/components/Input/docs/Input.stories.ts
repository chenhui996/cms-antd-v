import { ref, watch } from 'vue';
import Input from '../Input.vue'
import { Space } from 'ant-design-vue'
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Input }

const meta: Meta<typeof Input> = {
  title: '通用/Input 输入框',
  component: Input,
  decorators: [
    () => ({
      template: '<div class="storybook-demo"><story /></div>',
    })
  ],
};

export default meta;

const setupMatch = (code: string) => {
  const matches = code.matchAll(/const\s+\w+\s*=\s*ref\([^)]+\);/g);
  const extractedLines = Array.from(matches).map(match => match[0]);

  // console.log(extractedLines.join('\n'));

  return extractedLines.join('\n') || ''
}

const parameters = (instance: any) => {
  return {
    docs: {
      source: {
        code: `
<template>${instance().template}</template>

<script lang="ts" setup>
${instance().setup ? `${setupMatch(String(instance().setup))}` : ''}
</script>
`
      }
    }
  }
}

// ------------------------------------------------------------------------------------------------------------------------

export const Default = () => {
  return {
    components: {
      Input,
      Space
    },
    setup() {
      const value = ref<string>('');
      const value1 = ref<string>('');
      watch(value, () => {
        console.log(value.value);
      });
      watch(value1, () => {
        console.log(value1.value);
      });
      return {
        value,
        value1
      }
    },
    template: `
  <Space direction="vertical">
    <Input v-model:value="value" placeholder="Basic usage" />
    <Input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
  </Space>
`
  }
};

Default.storyName = "基本使用 input";
Default.parameters = parameters(Default)