import { ref, reactive } from 'vue';
import Switch from '../Switch.vue'
import Button from '../../Button/Button.vue'
import { Space } from 'ant-design-vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Switch }

const meta: Meta<typeof Switch> = {
  title: '通用/Switch 开关',
  component: Switch,
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
  <Switch v-model:checked="checked" />
`
  }
};

Default.storyName = "基本使用 switch";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const SizeComponent = () => {
  return {
    components: {
      Switch,
      Space
    },
    setup() {
      const state = reactive({
        checked1: true,
        checked2: false,
      });

      return {
        state
      }
    },
    template: `
  <Space direction="vertical">
    <Switch v-model:checked="state.checked1" />
    <Switch v-model:checked="state.checked2" size="small" />
  </Space>
`
  }
};

SizeComponent.storyName = "两种大小 size";
SizeComponent.parameters = parameters(SizeComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const DisabledComponent = () => {
  return {
    components: {
      Switch,
      Space,
      Button
    },
    setup() {
      const checked = ref<boolean>(true);
      const disabled = ref<boolean>(true);

      const onToggle = () => {
        disabled.value = !disabled.value;
      };

      return {
        checked,
        disabled,
        onToggle
      }
    },
    template: `
  <Space direction="vertical">
    <Switch v-model:checked="checked" :disabled="disabled" />
    <Button type="primary" @click="onToggle">Toggle disabled</Button>
  </Space>
`
  }
};

DisabledComponent.storyName = "不可用 disabled";
DisabledComponent.parameters = parameters(DisabledComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SlotComponent = () => {
  return {
    components: {
      Switch,
      Space,
      CheckOutlined,
      CloseOutlined
    },
    setup() {
      const state = reactive({
        checked1: true,
        checked2: false,
        checked3: false,
      });

      return {
        state
      }
    },
    template: `
  <Space direction="vertical">
    <Switch v-model:checked="state.checked1" checked-children="开" un-checked-children="关" />
    <Switch v-model:checked="state.checked2" checked-children="1" un-checked-children="0" />
    <Switch v-model:checked="state.checked3">
      <template #checkedChildren><CheckOutlined /></template>
      <template #unCheckedChildren><CloseOutlined /></template>
    </Switch>
  </Space>
`
  }
};

SlotComponent.storyName = "文字和图标 children || slot";
SlotComponent.parameters = parameters(SlotComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const LoadingComponent = () => {
  return {
    components: {
      Switch,
      Space
    },
    setup() {
      const state = reactive({
        checked1: true,
        checked2: false,
      });

      return {
        state
      }
    },
    template: `
  <Space direction="vertical">
    <Switch v-model:checked="state.checked1" loading />
    <Switch v-model:checked="state.checked2" size="small" loading />
  </Space>
`
  }
};

LoadingComponent.storyName = "加载中 loading";
LoadingComponent.parameters = parameters(LoadingComponent)