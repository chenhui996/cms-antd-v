import { ref, reactive } from 'vue';
import Select from '../Select.vue'
import {
  Space, SelectOption, type SelectProps,
  // Select 
} from 'ant-design-vue'
import { } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

// const components = { Select }

const meta: Meta<typeof Select> = {
  title: '通用/Select 选择器',
  component: Select,
  decorators: [
    () => ({
      template: '<div class="storybook-demo"><story /></div>',
    })
  ],
};

export default meta;

function trimFirstTwoSpaces(str: string) {
  if (str.startsWith('    ')) {
    return str.slice(4);
  }
  return str;
}

const setupMatch = (code: string) => {
  const matches = code.matchAll(/const\s+\w+\s*=\s*ref\([^)]+\);/g);
  const extractedLines = Array.from(matches).map(match => match[0]);

  const regex = /setup\(\)\s*\{([\s\S]*?)\s*return\s*\{/;
  const match = code.match(regex);

  if (match && match[1]) {
    const setupContent = match[1].split('\n').slice(1).map(line => trimFirstTwoSpaces(line)).join('\n');
    // console.log(setupContent);
    return setupContent
  }

  // console.log(code, extractedLines);

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
      Select,
      Space,
      SelectOption
    },
    setup() {
      const value1 = ref('lucy');
      const value2 = ref('lucy');
      const value3 = ref('lucy');
      const options1 = ref<SelectProps['options']>([
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
        {
          value: 'yiminghe',
          label: 'Yiminghe',
        },
      ]);
      const options2 = ref<SelectProps['options']>([
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]);
      const options3 = ref<SelectProps['options']>([
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]);
      const focus = () => {
        console.log('focus');
      };

      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      return {
        value1,
        value2,
        value3,
        options1,
        options2,
        options3,
        focus,
        handleChange
      }
    },
    template: `
  <Space direction="vertical">
    <Select style="width: 120px">
      <SelectOption value="jack">Jack</SelectOption>
      <SelectOption value="lucy">Lucy</SelectOption>
      <SelectOption value="disabled" disabled>Disabled</SelectOption>
      <SelectOption value="Yiminghe">yiminghe</SelectOption>
    </Select>
  </Space>
`
  }
};
      // v-model:value="value1"
      // ref="select"
      // @focus="focus"
      // @change="handleChange"
// @change="handleChange"

// <Select v-model:value="value2" style="width: 120px" disabled>
// <SelectOption value="lucy">Lucy</SelectOption>
// </Select>
// <Select v-model:value="value3" style="width: 120px" loading>
// <SelectOption value="lucy">Lucy</SelectOption>
// </Select>
// <h2 style="margin-top: 10px">use options (recommend)</h2>
// <Space direction="vertical">
//   <Select
//     ref="select"
//     v-model:value="value1"
//     style="width: 120px"
//     :options="options1"
//     @focus="focus"
//     @change="handleChange"
//   ></Select>
//   <Select v-model:value="value2" style="width: 120px" disabled :options="options2"></Select>
//   <Select v-model:value="value3" style="width: 120px" loading :options="options3"></Select>
// </Space>

Default.storyName = "基本使用 select";
Default.parameters = parameters(Default)