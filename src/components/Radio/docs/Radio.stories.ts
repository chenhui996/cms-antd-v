import { ref, h } from 'vue';
import Radio from '../Radio.vue'
import RadioGroup from '../RadioGroup.vue';
import RadioButton from '../RadioButton.vue';
import Button from '../../Button/Button.vue';
import { Space, Input } from 'ant-design-vue';
import type { CSRadioGroupProps } from '../lib/type'
import type { Meta } from '@storybook/vue3';
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

Default.storyName = "基本使用 radio";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const DisabledComponent = () => {
  return {
    components: { Radio, RadioGroup, RadioButton, Button },
    setup() {
      const disabled = ref<boolean>(true);
      const checked1 = ref<boolean>(true);
      const checked2 = ref<boolean>(false);

      const toggleDisabled = () => {
        disabled.value = !disabled.value;
      };


      return {
        disabled,
        checked1,
        checked2,
        toggleDisabled
      }
    },
    template: `
  <div>
    <Radio v-model:checked="checked1" :disabled="disabled">Disabled</Radio>
    <Radio v-model:checked="checked2" :disabled="disabled">Disabled</Radio>
    <br />
    <div style="margin-top: 16px">
      <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
    </div>
  </div>
`
  }
};

DisabledComponent.storyName = "不可用 disabled";
DisabledComponent.parameters = parameters(DisabledComponent)

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

// ------------------------------------------------------------------------------------------------------------------------

export const FullColorComponent = () => ({
  components: {
    RadioGroup,
    RadioButton
  },
  setup() {
    const value1 = ref<string>('a')
    const value2 = ref<string>('c')
    return { value1, value2 }
  },
  template: ` 
  <div>
    <div>
      <RadioGroup v-model:value="value1" button-style="solid">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
    <div :style="{ marginTop: '16px' }">
      <RadioGroup v-model:value="value2" button-style="solid">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b" disabled>Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
  </div>
    `
})

FullColorComponent.storyName = '填底的按钮样式';
FullColorComponent.parameters = parameters(FullColorComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const VerticalComponent = () => ({
  components: {
    RadioGroup,
    Radio,
    Input
  },
  setup() {
    const value = ref<number>(1)
    const radioStyle = ref({
      display: 'flex',
      height: '30px',
      lineHeight: '30px'
    })
    return { value, radioStyle }
  },
  template: `
  <RadioGroup v-model:value="value">
    <Radio :style="radioStyle" :value="1">Option A</Radio>
    <Radio :style="radioStyle" :value="2">Option B</Radio>
    <Radio :style="radioStyle" :value="3">Option C</Radio>
    <Radio :style="radioStyle" :value="4">
      More...
      <Input v-if="value === 4" style="width: 100px; margin-left: 10px" />
    </Radio>
  </RadioGroup>
    `
})

VerticalComponent.storyName = 'RadioGroup 垂直';
VerticalComponent.parameters = parameters(VerticalComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const DiffGroupComponent = () => ({
  components: {
    RadioGroup,
    Space
  },
  setup() {
    const plainOptions = ['Apple', 'Pear', 'Orange']
    const optionsWithDisabled: CSRadioGroupProps['options'] = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange', disabled: true }
    ]
    const value1 = ref<string>('Apple')
    const value2 = ref<string>('Apple')
    const value3 = ref<string>('Apple')
    return { plainOptions, optionsWithDisabled, value1, value2, value3 }
  },
  template: `
  <Space direction="vertical">
    <RadioGroup v-model:value="value1" :options="plainOptions" />
    <RadioGroup v-model:value="value2" :options="optionsWithDisabled" />
    <RadioGroup v-model:value="value3" :options="plainOptions" disabled />
    <RadioGroup v-model:value="value1" option-type="button" :options="plainOptions" />
    <RadioGroup v-model:value="value2" option-type="button" :options="optionsWithDisabled" />
    <RadioGroup v-model:value="value3" option-type="button" :options="plainOptions" disabled />
  </Space>
    `
})

DiffGroupComponent.storyName = "RadioGroup 组合 - 配置方式"
DiffGroupComponent.parameters = parameters(DiffGroupComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const NameComponent = () => ({
  components: {
    RadioGroup,
    Radio
  },
  setup() {
    const value = ref('1');
    return {
      value
    }
  },
  template: ` 
  <RadioGroup v-model:value="value" name="radioGroup">
    <Radio :value="1">A</Radio>
    <Radio :value="2">B</Radio>
    <Radio :value="3">C</Radio>
    <Radio :value="4">D</Radio>
  </RadioGroup>
    `
})

NameComponent.storyName = "单选组合 - 配合 name 使用"
NameComponent.parameters = parameters(NameComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const NormalGroupComponent = () => ({
  components: {
    RadioGroup,
    Radio
  },
  setup() {
    const value = ref(1);
    return {
      value
    }
  },
  template: ` 
  <div>
    <RadioGroup v-model:value="value">
      <Radio :value="1">A</Radio>
      <Radio :value="2">B</Radio>
      <Radio :value="3">C</Radio>
      <Radio :value="4">D</Radio>
    </RadioGroup>
  </div>
`
})

NormalGroupComponent.storyName = "单选组合"
NormalGroupComponent.parameters = parameters(NormalGroupComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SizeComponent = () => ({
  components: {
    RadioGroup,
    RadioButton
  },
  setup() {
    const value1 = ref<string>('a')
    const value2 = ref<string>('a')
    const value3 = ref<string>('a')
    return { value1, value2, value3 }
  },
  template: `
<div>
    <div>
      <RadioGroup v-model:value="value1" size="large">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
    <div :style="{ marginTop: '16px' }">
      <RadioGroup v-model:value="value2">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
    <div :style="{ marginTop: '16px' }">
      <RadioGroup v-model:value="value3" size="small">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
  </div>
`
})

SizeComponent.storyName = "大小 size"
SizeComponent.parameters = parameters(SizeComponent)

// ------------------------------------------------------------------------------------------------------------------------

