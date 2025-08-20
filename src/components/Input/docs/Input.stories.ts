import { ref, watch } from 'vue';
import Input from '../Input.vue';
import InputSearch from '../InputSearch.vue';
import { Button } from '../../Button';
// import Textarea from '../Textarea.vue'
import { Space, Tooltip, Textarea } from 'ant-design-vue'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
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