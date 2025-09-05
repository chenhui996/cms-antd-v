import { ref } from 'vue';
import { InputNumber } from '../index';
import { Checkbox, Button } from '../../index';
import { Space } from 'ant-design-vue';
import { UserOutlined, ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
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
  <Space direction="vertical">
    <Space>
      <InputNumber v-model:value="value1" prefix="￥" style="width: 100%" />
      <InputNumber v-model:value="value1" prefix="￥" style="width: 100%" :bordered="false" />
    </Space>
    <Space>
      <InputNumber v-model:value="value2" prefix="￥" style="width: 100%">
        <template #addonBefore>
          <UserOutlined />
        </template>
      </InputNumber>
      <InputNumber v-model:value="value2" prefix="￥" style="width: 100%" :bordered="false">
        <template #addonBefore>
          <UserOutlined />
        </template>
      </InputNumber>
    </Space>
    <Space>
      <InputNumber v-model:value="value3" prefix="￥" disabled style="width: 100%" />
    </Space>
  </Space>
`
  }
};

PrefixComponent.storyName = "前缀 prefix";
PrefixComponent.parameters = parameters(PrefixComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const OutOfRangeComponent = () => {
  return {
    components: {
      InputNumber,
      Space,
      Button,
    },
    setup() {
      const value = ref<number>(99);

      return {
        value
      }
    },
    template: `
  <Space>
    <InputNumber v-model:value="value" :min="1" :max="10" />
    <Button type="primary" @click="value = 99">Reset</Button>
  </Space>
`
  }
};

OutOfRangeComponent.storyName = "超出边界";
OutOfRangeComponent.parameters = parameters(OutOfRangeComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const FormatterComponent = () => {
  return {
    components: {
      InputNumber,
      Space
    },
    setup() {
      const value1 = ref<number>(1000);
      const value2 = ref<number>(100);

      function thousandFormatter(value: number) {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }

      function thousandParser(value: string) {
        return value.replace(/\$\s?|(,*)/g, '')
      }

      function percentFormatter(value: number) {
        return `${value}%`
      }

      function percentParser(value: string) {
        return value.replace('%', '')
      }

      return {
        value1,
        value2,
        thousandFormatter,
        thousandParser,
        percentFormatter,
        percentParser
      }
    },
    template: `
  <Space>
    <InputNumber
      v-model:value="value1"
      :formatter="thousandFormatter"
      :parser="thousandParser"
    />
    <InputNumber
      v-model:value="value2"
      :min="0"
      :max="100"
      :formatter="percentFormatter"
      :parser="percentParser"
    />
  </Space>
`
  }
};

FormatterComponent.storyName = "格式化展示 formatter";
FormatterComponent.parameters = parameters(FormatterComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const IconButtonComponent = () => {
  return {
    components: {
      InputNumber,
      ArrowUpOutlined,
      ArrowDownOutlined
    },
    setup() {
      const value = ref<number>(3);

      return {
        value
      }
    },
    template: `
  <div>
    <InputNumber id="inputNumber" v-model:value="value" :min="1" :max="10">
      <template #upIcon>
        <ArrowUpOutlined />
      </template>
      <template #downIcon>
        <ArrowDownOutlined />
      </template>
    </InputNumber>
  </div>
`
  }
};

IconButtonComponent.storyName = "图标按钮 upIcon & downIcon";
IconButtonComponent.parameters = parameters(IconButtonComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const StatusComponent = () => {
  return {
    components: {
      InputNumber,
      Space,
      ClockCircleOutlined
    },
    template: `
  <Space direction="vertical" style="width: 100%">
    <InputNumber status="error" style="width: 100%" />
    <InputNumber status="warning" style="width: 100%" />
    <InputNumber status="error" style="width: 100%">
      <template #prefix><ClockCircleOutlined /></template>
    </InputNumber>
    <InputNumber status="warning" style="width: 100%">
      <template #prefix><ClockCircleOutlined /></template>
    </InputNumber>
  </Space>
`
  }
};

StatusComponent.storyName = "自定义状态 status";
StatusComponent.parameters = parameters(StatusComponent)

// ------------------------------------------------------------------------------------------------------------------------