import { computed, ref, watch } from 'vue';
import { InputNumber } from '../index';
import { Checkbox, Button } from '../../index';
import { Space } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

const meta: Meta<typeof InputNumber> = {
  title: '通用/InputNumber 数字输入框',
  component: InputNumber,
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
      InputNumber
    },
    setup() {
      const value = ref<number>(3);
      return {
        value
      }
    },
    template: `
  <div>
    <InputNumber id="inputNumber" v-model:value="value" :min="1" :max="10" />
    当前值：{{ value }}
  </div>
`
  }
};

Default.storyName = "基本使用 inputNumber";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const NoBorderComponent = () => {
  return {
    components: {
      InputNumber
    },
    setup() {
      const value = ref<number>(3);
      return {
        value
      }
    },
    template: `
  <div>
    <InputNumber id="inputNumber" v-model:value="value" :min="1" :max="10" :bordered="false" />
    当前值：{{ value }}
  </div>
`
  }
};

NoBorderComponent.storyName = "无边框 no border";
NoBorderComponent.parameters = parameters(NoBorderComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SizeComponent = () => {
  return {
    components: {
      InputNumber,
      Space
    },
    setup() {
      const value1 = ref<number>(3);
      const value2 = ref<number>(3);
      const value3 = ref<number>(3);
      return {
        value1,
        value2,
        value3
      }
    },
    template: `
  <div>
    <Space>
      <InputNumber v-model:value="value1" size="large" :min="1" :max="100000" />
      <InputNumber v-model:value="value2" :min="1" :max="100000" />
      <InputNumber v-model:value="value3" size="small" :min="1" :max="100000" />
    </Space>
    <br />
    <br />
    <Space>
      <InputNumber v-model:value="value1" size="large" :min="1" :max="100000" :bordered="false" />
      <InputNumber v-model:value="value2" :min="1" :max="100000" :bordered="false" />
      <InputNumber v-model:value="value3" size="small" :min="1" :max="100000" :bordered="false" />
    </Space>
  </div>
`
  }
};

SizeComponent.storyName = "大小 size";
SizeComponent.parameters = parameters(SizeComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const HighPrecisionDecimalsComponent = () => {
  return {
    components: {
      InputNumber,
      Space
    },
    setup() {
      const value = ref<string>('1');
      return {
        value
      }
    },
    template: `
  <div>
    <Space>
      <InputNumber
        v-model:value="value"
        style="width: 200px"
        :min="0"
        :max="10"
        :step="0.00000000000001"
        string-mode
      />
    </Space>
    <br />
    <br />
    <Space>
      <InputNumber
        v-model:value="value"
        style="width: 200px"
        :min="0"
        :max="10"
        :step="0.00000000000001"
        string-mode
        :bordered="false"
      />
    </Space>
  </div>
`
  }
};

HighPrecisionDecimalsComponent.storyName = "高精度小数";
HighPrecisionDecimalsComponent.parameters = parameters(HighPrecisionDecimalsComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const KeyboardComponent = () => {
  return {
    components: {
      InputNumber,
      Space,
      Checkbox
    },
    setup() {
      const value = ref<number>(3);
      const keyboard = ref(true);
      return {
        value,
        keyboard
      }
    },
    template: `
  <div>
    <Space>
      <InputNumber v-model:value="value" :keyboard="keyboard" :min="1" :max="10" />
      <Checkbox v-model:checked="keyboard">Toggle keyboard</Checkbox>
    </Space>
  </div>
`
  }
};

KeyboardComponent.storyName = "键盘行为 keyboard";
KeyboardComponent.parameters = parameters(KeyboardComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const DisabledComponent = () => {
  return {
    components: {
      InputNumber,
      Space,
      Checkbox,
      Button
    },
    setup() {
      const value = ref<number>(3);
      const disabled = ref<boolean>(true);

      const toggle = () => {
        disabled.value = !disabled.value;
      };

      return {
        value,
        disabled,
        toggle
      }
    },
    template: `
  <div>
    <Space direction="vertical">
      <InputNumber v-model:value="value" :min="1" :max="10" :disabled="disabled" />
      <div style="margin-top: 10px">
        <Button type="primary" @click="toggle">Toggle disabled</Button>
      </div>
    </Space>
  </div>
`
  }
};

DisabledComponent.storyName = "不可用 disabled";
DisabledComponent.parameters = parameters(DisabledComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PrefixComponent = () => {
  return {
    components: {
      InputNumber,
      Space,
      Checkbox,
      Button,
      UserOutlined
    },
    setup() {
      const value1 = ref<number>(1);
      const value2 = ref<number>(2);
      const value3 = ref<number>(3);

      return {
        value1,
        value2,
        value3
      }
    },
    template: `
  <div>
    <InputNumber v-model:value="value1" prefix="￥" style="width: 100%" />
    <br />
    <br />
    <InputNumber v-model:value="value2" prefix="￥" style="width: 100%">
      <template #addonBefore>
        <UserOutlined />
      </template>
    </InputNumber>
    <br />
    <br />
    <InputNumber v-model:value="value3" prefix="￥" disabled style="width: 100%" />
  </div>
`
  }
};

PrefixComponent.storyName = "前缀 prefix";
PrefixComponent.parameters = parameters(PrefixComponent)

// ------------------------------------------------------------------------------------------------------------------------