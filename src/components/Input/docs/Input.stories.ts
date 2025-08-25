import { computed, ref, watch } from 'vue';
import Input from '../Input.vue';
import InputSearch from '../InputSearch.vue';
import InputPassword from '../InputPassword.vue';
import { Button } from '../../Button';
import Textarea from '../TextArea.vue'
import { Space, Tooltip, Select, DatePicker, AutoComplete, Cascader, Row, Col, InputGroup, Divider } from 'ant-design-vue'
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

export const Default = () => {
  return {
    components: {
      Input,
    },
    template: `
   <Input placeholder="默认输入框" />
`
  }
};

Default.storyName = "基本使用 input";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const OpenChineseComponent = () => {
  return {
    components: {
      Input,
      Space,
      Button
    },
    setup() {
      const value = ref<string>('');
      const value1 = ref<string>('');
      watch(value1, (val) => {
        console.log(val) // 只在最终不同才打印
      })

      return {
        value,
        value1
      }
    },
    template: `
  <Space direction="vertical">
    <div>openChinese 基础使用</div>
    <Input placeholder="openChinese 基础使用" :maxlength="11" show-count open-chinese />

    <div>v-model</div>
    <Input v-model:value="value1" placeholder="openChinese 配合 v-model" :maxlength="5" show-count open-chinese />
    <Button @click="value1 = '测试内容中文计数'">设置为 "测试内容中文计数"，自动截取 5 个字符</Button>
  </Space>
`
  }
};

OpenChineseComponent.storyName = "汉字计数 openChinese";
OpenChineseComponent.parameters = parameters(OpenChineseComponent)

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

export const OpenChineseTest = () => {
  return {
    components: {
      Input,
      Space,
      Divider
    },
    setup() {
      const value1 = ref<string>('');
      const value2 = ref<string>('');
      const value3 = ref<string>('');
      const eventLog = ref<string[]>([]);

      const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        eventLog.value.unshift(`[${timestamp}] ${message}`);
        if (eventLog.value.length > 15) {
          eventLog.value = eventLog.value.slice(0, 15);
        }
      };

      const handleChange = (inputName: string, e: any) => {
        const value = e.target?.value || e;
        addLog(`${inputName} CHANGE: "${value}"`);
        console.log(`${inputName} CHANGE 事件:`, e);
      };

      const handleInput = (inputName: string, e: any) => {
        const value = e.target?.value || e;
        addLog(`${inputName} INPUT: "${value}"`);
        console.log(`${inputName} INPUT 事件:`, e);
      };

      const clearLog = () => {
        eventLog.value = [];
        addLog('日志已清空');
      };

      return {
        value1,
        value2,
        value3,
        eventLog,
        handleChange,
        handleInput,
        clearLog
      }
    },
    template: `
  <Space direction="vertical" size="large" style="width: 100%">
    <div>
      <h3>openChinese 功能专项测试</h3>
      <p>测试中文字符计数功能，验证 emit('change') 事件是否正确触发</p>
    </div>

    <Divider>测试用例 1: 基础中文字符计数</Divider>
    <div>
      <h4>Input (maxlength=10, openChinese=true):</h4>
      <Input 
        v-model:value="value1"
        :open-chinese="true" 
        :maxlength="10" 
        placeholder="输入中英文混合内容" 
        show-count 
        @change="(e) => handleChange('Input1', e)"
        @input="(e) => handleInput('Input1', e)"
        style="width: 300px;"
      />
      <p>当前值: <code>{{ value1 }}</code></p>
    </div>

    <Divider>测试用例 2: 对比测试（无 openChinese）</Divider>
    <div>
      <h4>Input (maxlength=10, openChinese=false):</h4>
      <Input 
        v-model:value="value2"
        :open-chinese="false" 
        :maxlength="10" 
        placeholder="对比：普通字符计数" 
        show-count 
        @change="(e) => handleChange('Input2', e)"
        @input="(e) => handleInput('Input2', e)"
        style="width: 300px;"
      />
      <p>当前值: <code>{{ value2 }}</code></p>
    </div>

    <Divider>测试用例 3: 长文本截断测试</Divider>
    <div>
      <h4>Input (maxlength=8, openChinese=true):</h4>
      <Input 
        v-model:value="value3"
        :open-chinese="true" 
        :maxlength="8" 
        placeholder="测试截断：输入'你好世界hello'" 
        show-count 
        @change="(e) => handleChange('Input3', e)"
        @input="(e) => handleInput('Input3', e)"
        style="width: 300px;"
      />
      <p>当前值: <code>{{ value3 }}</code></p>
      <p>预期：'你好世界hello' 应该被截断，因为中文字符占2位，总长度超过8</p>
    </div>

    <Divider>事件日志</Divider>
    <div>
      <div style="margin-bottom: 10px;">
        <button @click="clearLog">清空日志</button>
        <span style="margin-left: 10px; color: #666;">实时显示最近15条事件</span>
      </div>
      <div style="
        background: #f8f9fa; 
        padding: 15px; 
        border-radius: 6px; 
        max-height: 400px; 
        overflow-y: auto;
        font-family: monospace;
        font-size: 12px;
        border: 1px solid #dee2e6;
      ">
        <div v-if="eventLog.length === 0" style="color: #999; font-style: italic;">
          等待事件触发...
        </div>
        <div 
          v-for="(log, index) in eventLog" 
          :key="index"
          style="
            margin: 3px 0; 
            padding: 6px; 
            background: white; 
            border-left: 3px solid #28a745;
            border-radius: 2px;
            font-size: 11px;
          "
        >
          {{ log }}
        </div>
      </div>
    </div>

    <Divider>测试步骤说明</Divider>
    <div>
      <h4>测试步骤：</h4>
      <ol>
        <li><strong>基础测试：</strong>在第一个输入框中输入 "hello世界" (5+4=9个字符)</li>
        <li><strong>对比测试：</strong>在第二个输入框中输入相同内容，观察字符计数差异</li>
        <li><strong>截断测试：</strong>在第三个输入框中输入 "你好世界hello" (8+5=13个字符长度，应该被截断)</li>
        <li><strong>事件观察：</strong>观察事件日志，确认 change 事件是否正确触发</li>
        <li><strong>控制台检查：</strong>打开浏览器控制台，查看详细的事件信息</li>
      </ol>
      
      <h4>预期结果：</h4>
      <ul>
        <li>openChinese=true 时，中文字符占用2个字符长度</li>
        <li>超出 maxlength 时，输入会被自动截断</li>
        <li>每次输入和截断都会触发相应的 INPUT 和 CHANGE 事件</li>
        <li>事件日志应该实时显示所有事件触发情况</li>
      </ul>
    </div>
  </Space>
`
  }
};

OpenChineseTest.storyName = "openChinese 功能测试";
OpenChineseTest.parameters = parameters(OpenChineseTest)

export const CustomShowCount = () => {
  return {
    components: {
      Input,
      Space,
      Divider
    },
    setup() {
      const value1 = ref<string>('');
      const value2 = ref<string>('');
      const value3 = ref<string>('');

      return {
        value1,
        value2,
        value3
      }
    },
    template: `
  <Space direction="vertical" size="large" style="width: 100%">
    <div>
      <h3>自定义 showCount 功能测试</h3>
      <p>测试当 openChinese 开启时，自定义的中文字符计数显示</p>
    </div>

    <Divider>测试用例 1: 中文字符计数 (openChinese=true, showCount=true)</Divider>
    <div>
      <h4>Input (maxlength=10, openChinese=true, showCount=true):</h4>
      <Input 
        v-model:value="value1"
        :open-chinese="true" 
        :maxlength="10" 
        :show-count="true"
        placeholder="输入中英文混合内容，观察字符计数" 
        style="width: 300px;"
      />
      <p>当前值: <code>{{ value1 }}</code></p>
      <p>说明: 中文字符占用2个字符长度，英文字符占用1个字符长度</p>
    </div>

    <Divider>测试用例 2: 对比测试（无 openChinese，使用 antd 默认计数）</Divider>
    <div>
      <h4>Input (maxlength=10, openChinese=false, showCount=true):</h4>
      <Input 
        v-model:value="value2"
        :open-chinese="false" 
        :maxlength="10" 
        :show-count="true"
        placeholder="对比：普通字符计数" 
        style="width: 300px;"
      />
      <p>当前值: <code>{{ value2 }}</code></p>
      <p>说明: 使用 antd 默认的字符计数，每个字符都算1个长度</p>
    </div>

    <Divider>测试用例 3: 无 showCount 对比</Divider>
    <div>
      <h4>Input (maxlength=10, openChinese=true, showCount=false):</h4>
      <Input 
        v-model:value="value3"
        :open-chinese="true" 
        :maxlength="10" 
        :show-count="false"
        placeholder="无字符计数显示" 
        style="width: 300px;"
      />
      <p>当前值: <code>{{ value3 }}</code></p>
      <p>说明: 不显示字符计数，但中文字符计数逻辑仍然生效</p>
    </div>

    <Divider>功能说明</Divider>
    <div>
      <h4>自定义 showCount 特性：</h4>
      <ul>
        <li><strong>智能切换：</strong>当 openChinese=true 时，自动禁用 antd 默认的 showCount</li>
        <li><strong>中文字符计数：</strong>中文字符按 2 个字符计算，英文按 1 个字符计算</li>
        <li><strong>剩余字符显示：</strong>显示剩余可输入的字符数</li>
        <li><strong>完全兼容：</strong>不影响原有的 suffix 插槽功能</li>
      </ul>
      
      <h4>测试步骤：</h4>
      <ol>
        <li><strong>中文字符测试：</strong>在第一个输入框中输入 "你好世界" (4个中文字符 = 8个字符长度)</li>
        <li><strong>混合字符测试：</strong>继续输入 "hello" (5个英文字符 = 5个字符长度)</li>
        <li><strong>对比观察：</strong>观察两个输入框的字符计数差异</li>
        <li><strong>截断测试：</strong>尝试输入更多内容，观察自动截断和剩余字符显示</li>
      </ol>
    </div>
  </Space>
`
  }
};

CustomShowCount.storyName = "自定义 showCount 功能";
CustomShowCount.parameters = parameters(CustomShowCount)