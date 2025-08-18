import { ref, h } from 'vue';
import Radio from '../Radio.vue'
import RadioGroup from '../RadioGroup.vue';
import type { Meta } from '@storybook/vue3';
import { RadioButton } from 'ant-design-vue'
// import { PoweroffOutlined, DownloadOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons-vue';
// import type { SizeType } from 'ant-design-vue/lib/config-provider';
import './style.less';

const components = { Radio }

const meta: Meta<typeof Radio> = {
  title: '通用/Radio 单选框',
  component: Radio,
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
  
  console.log(extractedLines.join('\n'));

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
    components,
    setup() {
      const checked = ref<boolean>(false);
      return {
        checked
      }
    },
    template: `
  <Radio v-model:checked="checked">Radio</Radio>
`
  }
};

Default.storyName = "默认 radio";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const GroupComponent = () => {
  return {
    components: { Radio, RadioGroup, RadioButton },
    setup() {
      const value1 = ref<string>('a');
      const value2 = ref<string>('a');
      const value3 = ref<string>('a');

      return {
        value1,
        value2,
        value3
      }
    },
    template: `
  <div>
    <div>
      <RadioGroup v-model:value="value1">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
    <div :style="{ marginTop: '16px' }">
      <RadioGroup v-model:value="value2">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b" disabled>Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
    <div :style="{ marginTop: '16px' }">
      <RadioGroup v-model:value="value3" disabled>
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
  </div>
`
  }
};

GroupComponent.storyName = "按钮样式 group";
GroupComponent.parameters = parameters(GroupComponent)