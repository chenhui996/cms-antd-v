import { computed, ref, watch } from 'vue';
import Input from '../Input.vue';
import InputSearch from '../InputSearch.vue';
import InputPassword from '../InputPassword.vue';
import { Button } from '../../Button';
import Textarea from '../TextArea.vue'
import { Space, Tooltip, Select, DatePicker, AutoComplete, Cascader, Row, Col, InputGroup } from 'ant-design-vue'
import { UserOutlined, InfoCircleOutlined, CopyOutlined, SettingOutlined, ClockCircleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

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

// export const Default = () => {
//   return {
//     components: {
//       Input,
//       Space
//     },
//     setup() {
//       const value = ref<string>('');
//       const value1 = ref<string>('');
//       watch(value, () => {
//         console.log(value.value);
//       });
//       watch(value1, () => {
//         console.log(value1.value);
//       });
//       return {
//         value,
//         value1
//       }
//     },
//     template: `
//   <Space direction="vertical">
//     <Input v-model:value="value" placeholder="Basic usage" />
//     <Input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
//   </Space>
// `
//   }
// };

export const Default = () => {
  return {
    components: {
      Input,
      Space
    },
    setup() {
      const value = ref<string>('');
      watch(value, () => {
        console.log(value.value);
      });

      return {
        value
      }
    },
    template: `
  <Space direction="vertical">
    <Input v-model:value="value" placeholder="Basic usage" :maxlength="10" />
  </Space>
`
  }
};

Default.storyName = "基本使用 input";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const PrefixAndSuffixComponent = () => {
  return {
    components: {
      UserOutlined,
      InfoCircleOutlined,
      Input,
      Tooltip
    },
    setup() {
      const userName = ref<string>('');
      return {
        userName
      }
    },
    template: `
  <div>
    <Input v-model:value="userName" placeholder="Basic usage">
      <template #prefix>
        <UserOutlined />
      </template>
      <template #suffix>
        <Tooltip title="Extra information">
          <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
        </Tooltip>
      </template>
    </Input>
    <br />
    <br />
    <Input prefix="￥" suffix="RMB" />
  </div>
`
  }
};

PrefixAndSuffixComponent.storyName = "前缀和后缀 prefix & suffix";
PrefixAndSuffixComponent.parameters = parameters(PrefixAndSuffixComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const AutoHeightTextAreaComponent = () => {
  return {
    components: {
      Textarea,
    },
    setup() {
      const value1 = ref<string>('');
      const value2 = ref<string>('');
      return {
        value1,
        value2
      }
    },
    template: `
  <div>
    <Textarea
      v-model:value="value1"
      placeholder="Autosize height based on content lines"
      auto-size
    />
    <div style="margin: 24px 0" />
    <Textarea
      v-model:value="value2"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
  </div>
`
  }
};

AutoHeightTextAreaComponent.storyName = "适应文本高度的文本域";
AutoHeightTextAreaComponent.parameters = parameters(AutoHeightTextAreaComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SearchComponent = () => {
  return {
    components: {
      InputSearch,
      Space,
      Button
    },
    setup() {
      const value = ref<string>('');

      const onSearch = (searchValue: string) => {
        console.log('use value', searchValue);
        console.log('or use this.value', value.value);
      };
      return {
        value,
        onSearch
      }
    },
    template: `
  <Space direction="vertical">
    <InputSearch
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      placeholder="input search text"
      size="large"
      @search="onSearch"
    >
      <template #enterButton>
        <Button>Custom</Button>
      </template>
    </InputSearch>
  </Space>
`
  }
};

SearchComponent.storyName = "搜索框 search";
SearchComponent.parameters = parameters(SearchComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SearchLoadingComponent = () => {
  return {
    components: {
      InputSearch,
    },
    setup() {
      const value = ref<string>('');
      return {
        value
      }
    },
    template: `
  <div>
    <InputSearch v-model:value="value" placeholder="input search loading deault" loading />
    <br />
    <br />
    <InputSearch
      v-model:value="value"
      placeholder="input search loading with enterButton"
      loading
      enter-button
    />
  </div>
`
  }
};

SearchLoadingComponent.storyName = "搜索框 search loading";
SearchLoadingComponent.parameters = parameters(SearchLoadingComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SizeComponent = () => {
  return {
    components: {
      Input,
    },
    setup() {
      const value = ref<string>('');
      return {
        value
      }
    },
    template: `
  <div class="components-input-demo-size">
    <Input v-model:value="value" size="large" placeholder="large size" />
    <Input v-model:value="value" placeholder="default size" />
    <Input v-model:value="value" size="small" placeholder="small size" />
  </div>
`
  }
};

SizeComponent.storyName = "大小 size";
SizeComponent.parameters = parameters(SizeComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const DifferentInputComponent = () => {
  return {
    components: {
      Input,
      InputGroup,
      Select,
      DatePicker,
      AutoComplete,
      Cascader,
      Button,
      Tooltip,
      Space,
      Row,
      Col,
      CopyOutlined
    },
    setup() {
      const options = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ];
      const value1 = ref<string>('0571');
      const value2 = ref<string>('26888888');
      const value3 = ref<string>('Zhejiang');
      const value4 = ref<string>('Xihu District, Hangzhou');
      const value5 = ref<string>('Option1');
      const value6 = ref<string>('input content');
      const value7 = ref<string>('input content');
      const value8 = ref<string | null>(null);
      const value9 = ref<string>('Option1-1');
      const value10 = ref<string>('Option2-2');
      const value11 = ref<string>('1');
      const value12 = ref<string>('');
      const value13 = ref<string>('');
      const value14 = ref<string>('');
      const value15 = ref<string>('Sign Up');
      const value16 = ref<string>('');
      const value17 = ref<string>('Home');
      const value18 = ref<string[]>([]);
      const value19 = ref<string>('https://surely.cool');
      const value20 = ref<string>('https://antdv.com');
      return {
        value1,
        value2,
        value3,
        value4,
        value5,
        value6,
        value7,
        value8,
        value9,
        value10,
        value11,
        value12,
        value13,
        value14,
        value15,
        value16,
        value17,
        value18,
        value19,
        value20,
        options
      }
    },
    template: `
  <Space class="site-input-group-wrapper" direction="vertical" size="middle">
    <InputGroup size="large">
      <Row :gutter="8">
        <Col :span="5">
          <Input v-model:value="value1" />
        </Col>
        <Col :span="8">
          <Input v-model:value="value2" />
        </Col>
      </Row>
    </InputGroup>
      <InputGroup compact>
      <Input v-model:value="value1" style="width: 20%" />
      <Input v-model:value="value2" style="width: 30%" />
    </InputGroup>
    <InputGroup compact>
      <Select v-model:value="value3">
        <Select.OptGroup value="Zhejiang">Zhejiang</Select.OptGroup>
        <Select.OptGroup value="Jiangsu">Jiangsu</Select.OptGroup>
      </Select>
      <Input v-model:value="value4" style="width: 50%" />
    </InputGroup>
    <InputGroup compact>
      <Select v-model:value="value5">
        <Select.OptGroup value="Option1">Option1</Select.OptGroup>
        <Select.OptGroup value="Option2">Option2</Select.OptGroup>
      </Select>
      <Input v-model:value="value6" style="width: 50%" />
    </InputGroup>
    <InputGroup compact>
      <Input v-model:value="value7" style="width: 50%" />
      <DatePicker v-model:value="value8" style="width: 50%" />
    </InputGroup>
    <InputGroup compact>
      <Select v-model:value="value9">
        <Select.OptGroup value="Option1-1">Option1-1</Select.OptGroup>
        <Select.OptGroup value="Option1-2">Option1-2</Select.OptGroup>
      </Select>
      <Select v-model:value="value10">
        <Select.OptGroup value="Option2-1">Option2-1</Select.OptGroup>
        <Select.OptGroup value="Option2-2">Option2-2</Select.OptGroup>
      </Select>
    </InputGroup>
    <InputGroup compact>
      <Select v-model:value="value11">
        <Select.OptGroup value="1">Between</Select.OptGroup>
        <Select.OptGroup value="2">Except</Select.OptGroup>
      </Select>
      <Input
        v-model:value="value12"
        style="width: 100px; text-align: center"
        placeholder="Minimum"
      />
      <Input
        v-model:value="value13"
        class="site-input-split"
        style="width: 30px; border-left: 0; pointer-events: none"
        placeholder="~"
        disabled
      />
      <Input
        v-model:value="value14"
        class="site-input-right"
        style="width: 100px; text-align: center"
        placeholder="Maximum"
      />
    </InputGroup>
    <InputGroup compact>
      <Select v-model:value="value15">
        <Select.OptGroup value="Sign Up">Sign Up</Select.OptGroup>
        <Select.OptGroup value="Sign In">Sign In</Select.OptGroup>
      </Select>
      <AutoComplete
        v-model:value="value16"
        :options="[{ value: 'text 1' }, { value: 'text 2' }]"
        style="width: 200px"
        placeholder="Email"
      />
    </InputGroup>
    <InputGroup compact>
      <Select v-model:value="value17" style="width: 30%">
        <Select.OptGroup value="Home">Home</Select.OptGroup>
        <Select.OptGroup value="Company">Company</Select.OptGroup>
      </Select>
      <Cascader
        v-model:value="value18"
        style="width: 70%"
        :options="options"
        placeholder="Select Address"
      />
    </InputGroup>
    <InputGroup compact>
      <Input v-model:value="value19" style="width: calc(100% - 200px)" />
      <Button type="primary">Submit</Button>
    </InputGroup>
    <InputGroup compact>
      <Input v-model:value="value20" style="width: calc(100% - 200px)" />
      <Tooltip title="copy git url">
        <Button>
          <template #icon><CopyOutlined /></template>
        </Button>
      </Tooltip>
    </InputGroup>
  </Space>
`
  }
};

DifferentInputComponent.storyName = "输入框组合";
DifferentInputComponent.parameters = parameters(DifferentInputComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const FormatTooltipComponent = () => {
  return {
    components: {
      Input,
      Tooltip
    },
    setup() {
      function formatNumber(value: string) {
        value += '';
        const list = value.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';

        while (num.length > 3) {
          result = `,${num.slice(-3)}${result}`;
          num = num.slice(0, num.length - 3);
        }

        if (num) {
          result = num + result;
        }

        return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
      }

      const inputValue = ref<string>('111');
      const formatValue = computed(() => {
        if (inputValue.value === '-') return '-';
        return formatNumber(inputValue.value);
      });

      const format = (val: string, preVal: string) => {
        const reg = /^-?\d*(\.\d*)?$/;

        if ((!isNaN(+val) && reg.test(val)) || val === '' || val === '-') {
          inputValue.value = val;
        } else {
          inputValue.value = preVal;
        }
      };

      // '.' at the end or only '-' in the input box.
      const onBlur = () => {
        if (inputValue.value.charAt(inputValue.value.length - 1) === '.' || inputValue.value === '-') {
          format(inputValue.value.slice(0, -1), inputValue.value);
        }
      };

      watch(inputValue, (val, preVal) => {
        format(val, preVal);
      });

      return {
        inputValue,
        formatValue,
        onBlur
      }
    },
    template: `
  <Tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
    <template v-if="inputValue" #title>
      <span class="numeric-input-title">
        {{ formatValue }}
      </span>
    </template>

    <Input
      v-model:value="inputValue"
      placeholder="Input a number"
      :max-length="25"
      style="width: 120px"
      @blur="onBlur"
    />
  </Tooltip>
`
  }
};

FormatTooltipComponent.storyName = "输入时格式化展示 format tooltip";
FormatTooltipComponent.parameters = parameters(FormatTooltipComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const AddonComponent = () => {
  return {
    components: {
      Input,
      Tooltip,
      Space,
      SettingOutlined,
      Cascader,
      Select
    },
    setup() {
      const value1 = ref<string>('mysite');
      const value2 = ref<string>('mysite');
      const value3 = ref<string>('Http://');
      const value4 = ref<string>('.com');
      const value5 = ref<string>('mysite');
      const value6 = ref<string>('mysite');

      return {
        value1,
        value2,
        value3,
        value4,
        value5,
        value6
      }
    },
    template: `
  <Space direction="vertical">
    <Input v-model:value="value1" addon-before="Http://" addon-after=".com" />
    <Input v-model:value="value2">
      <template #addonBefore>
        <Select v-model:value="value3" style="width: 90px">
          <Select.OptGroup value="Http://">Http://</Select.OptGroup>
          <Select.OptGroup value="Https://">Https://</Select.OptGroup>
        </Select>
      </template>
      <template #addonAfter>
        <Select v-model:value="value4" style="width: 80px">
          <Select.OptGroup value=".com">.com</Select.OptGroup>
          <Select.OptGroup value=".jp">.jp</Select.OptGroup>
          <Select.OptGroup value=".cn">.cn</Select.OptGroup>
          <Select.OptGroup value=".org">.org</Select.OptGroup>
        </Select>
      </template>
    </Input>
    <Input v-model:value="value5">
      <template #addonAfter>
        <setting-outlined />
      </template>
    </Input>

    <Input v-model:value="value6">
      <template #addonBefore>
        <Cascader placeholder="cascader" style="width: 150px" />
      </template>
    </Input>
  </Space>
`
  }
};

AddonComponent.storyName = "前置/后置标签 addon";
AddonComponent.parameters = parameters(AddonComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ClearIconComponent = () => {
  return {
    components: {
      Input,
      Textarea
    },
    setup() {
      const value1 = ref<string>('');
      const value2 = ref<string>('');

      return {
        value1,
        value2
      }
    },
    template: `
  <div>
    <Input v-model:value="value1" placeholder="input with clear icon" allow-clear />
    <br />
    <br />
    <Textarea v-model:value="value2" placeholder="textarea with clear icon" allow-clear />
  </div>
`
  }
};

ClearIconComponent.storyName = "带移除图标 clear icon";
ClearIconComponent.parameters = parameters(ClearIconComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PasswordComponent = () => {
  return {
    components: {
      InputPassword,
      Button,
      Space,
      PlusOutlined,
      MinusOutlined
    },
    setup() {
      const value = ref<string>('');
      const value2 = ref<string>('');
      const value3 = ref<string>('');
      const value4 = ref<string>('');
      const visible = ref<boolean>(false);

      return {
        value,
        value2,
        value3,
        value4,
        visible
      }
    },
    template: `
  <div>
    <Space direction="vertical" size="middle" style="width: 100%">
      <InputPassword v-model:value="value" placeholder="input password" />
      <InputPassword v-model:value="value2" placeholder="input password">
        <template #iconRender="v">
          <PlusOutlined v-if="v.v"></PlusOutlined>
          <MinusOutlined v-else></MinusOutlined>
        </template>
      </InputPassword>
      <InputPassword
        v-model:value="value3"
        placeholder="input password"
        :visibility-toggle="false"
      />
      <Space>
        <InputPassword
          v-model:value="value4"
          v-model:visible="visible"
          placeholder="input password"
        />
        <Button type="primary" @click="visible = !visible">{{ visible ? 'Hide' : 'Show' }}</Button>
      </Space>
    </Space>
  </div>
`
  }
};

PasswordComponent.storyName = "密码框 password";
PasswordComponent.parameters = parameters(PasswordComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const TipNumberComponent = () => {
  return {
    components: {
      Input,
      Textarea
    },
    setup() {
      const value1 = ref<string>('test value');
      const value2 = ref<string>('test value');

      return {
        value1,
        value2
      }
    },
    template: `
  <Input v-model:value="value1" show-count :maxlength="20" />
  <br />
  <br />
  <Textarea v-model:value="value2" show-count :maxlength="100" />
`
  }
};

TipNumberComponent.storyName = "带字数提示";
TipNumberComponent.parameters = parameters(PasswordComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const TextareaComponent = () => {
  return {
    components: {
      Textarea
    },
    setup() {
      const value = ref<string>('');

      return {
        value
      }
    },
    template: `
  <Textarea v-model:value="value" placeholder="Basic usage" :rows="4" />
  <br />
  <br />
  <Textarea :rows="4" placeholder="maxlength is 6" :maxlength="6" />
`
  }
};

TextareaComponent.storyName = "文本域 textarea";
TextareaComponent.parameters = parameters(TextareaComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const StatusComponent = () => {
  return {
    components: {
      ClockCircleOutlined,
      Input,
      Space
    },
    setup() {
      const value = ref<string>('');

      return {
        value
      }
    },
    template: `
  <Space direction="vertical" style="width: 100%">
    <Input status="error" placeholder="Error" />
    <Input status="warning" placeholder="Warning" />
    <Input status="error" placeholder="Error with prefix">
      <template #prefix><ClockCircleOutlined /></template>
    </Input>
    <Input status="warning" placeholder="Warning with prefix">
      <template #prefix><ClockCircleOutlined /></template>
    </Input>
  </Space>
`
  }
};

StatusComponent.storyName = "自定义状态 status";
StatusComponent.parameters = parameters(StatusComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const NoBorderComponent = () => {
  return {
    components: {
      Input
    },
    setup() {
      const value = ref<string>('');

      return {
        value
      }
    },
    template: `
  <Input v-model:value="value" :bordered="false" placeholder="Borderless" />
`
  }
};

NoBorderComponent.storyName = "无边框 no border";
NoBorderComponent.parameters = parameters(NoBorderComponent)