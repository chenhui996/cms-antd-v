import { ref, reactive, watch, defineComponent, computed } from 'vue';
import { Select } from '../index'
// import { Input } from '../../Input' // input 有问题，等待修复
import { Button } from '../../Button'
import { Divider } from '../../Divider'
import { RadioGroup, RadioButton } from '../../Radio'
import {
  Space, SelectOption, type SelectProps, SelectOptGroup, Input,
  // Select
} from 'ant-design-vue'
import { UserOutlined, SmileOutlined, MehOutlined, PlusOutlined } from '@ant-design/icons-vue';
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
        value1.value = value;
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
  <h2>use a-select-option</h2>
  <Space>
    <Select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      @focus="focus"
      @change="handleChange"
    >
      <SelectOption value="jack">Jack</SelectOption>
      <SelectOption value="lucy">Lucy</SelectOption>
      <SelectOption value="disabled" disabled>Disabled</SelectOption>
      <SelectOption value="Yiminghe">yiminghe</SelectOption>
    </Select>
    <Select v-model:value="value2" style="width: 120px" disabled>
      <SelectOption value="lucy">Lucy</SelectOption>
    </Select>
    <Select v-model:value="value3" style="width: 120px" loading>
      <SelectOption value="lucy">Lucy</SelectOption>
    </Select>
  </Space>
  <h2 style="margin-top: 10px">use options (recommend)</h2>
  <Space>
    <Select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      :options="options1"
      @focus="focus"
      @change="handleChange"
    ></Select>
    <Select v-model:value="value2" style="width: 120px" disabled :options="options2"></Select>
    <Select v-model:value="value3" style="width: 120px" loading :options="options3"></Select>
  </Space>
`
  }
};

Default.storyName = "基本使用 select";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const TagsComponent = () => {
  return {
    components: {
      Select,
      Space,
      SelectOption
    },
    setup() {
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      const value = ref([]);
      const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));

      return {
        value,
        options,
        handleChange
      }
    },
    template: `
  <Select
    v-model:value="value"
    mode="tags"
    style="width: 100%"
    placeholder="Tags Mode"
    :options="options"
    @change="handleChange"
  ></Select>
`
  }
};

TagsComponent.storyName = "标签 tags";
TagsComponent.parameters = parameters(TagsComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const AutoSliptComponent = () => {
  return {
    components: {
      Select,
      Space,
      SelectOption
    },
    setup() {
      const options = ref<SelectProps['options']>([
        {
          value: 'a1',
          label: 'a1',
        },
      ]);
      const value = ref<string[]>([]);
      const handleChange = (value: []) => {
        console.log(`selected ${value}`);
      };
      watch(value, () => {
        console.log('value', value.value);
      });

      return {
        options,
        value,
        handleChange
      }
    },
    template: `
  <Select
    v-model:value="value"
    mode="tags"
    style="width: 100%"
    :token-separators="[',']"
    placeholder="Automatic tokenization"
    :options="options"
    @change="handleChange"
  ></Select>
`
  }
};

AutoSliptComponent.storyName = "自动分词";
AutoSliptComponent.parameters = parameters(AutoSliptComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const MultipleComponent = () => {
  return {
    components: {
      Select
    },
    setup() {
      const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
      };
      const value = ref(['a1', 'b2']);

      return {
        value,
        handleChange
      }
    },
    template: `
  <Select
    v-model:value="value"
    mode="multiple"
    style="width: 100%"
    placeholder="Please select"
    :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
    @change="handleChange"
  ></Select>
`
  }
};

MultipleComponent.storyName = "多选 multiple";
MultipleComponent.parameters = parameters(MultipleComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const GroupComponent = () => {
  return {
    components: {
      Select,
      Space,
      SelectOption,
      SelectOptGroup,
      UserOutlined
    },
    setup() {
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };

      const options = ref<SelectProps['options']>([
        {
          label: 'Manager',
          options: [
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
          ],
        },
        {
          label: 'Engineer',
          options: [
            {
              value: 'yiminghe',
              label: 'Yiminghe',
            },
          ],
        },
      ]);

      const value = ref(['lucy']);

      return {
        value,
        options,
        handleChange
      }
    },
    template: `
  <Space>
    <Select v-model:value="value" style="width: 200px" @change="handleChange">
      <SelectOptGroup>
        <template #label>
          <span>
            <UserOutlined />
            Manager
          </span>
        </template>
        <SelectOption value="jack">Jack</SelectOption>
        <SelectOption value="lucy">Lucy</SelectOption>
      </SelectOptGroup>
      <SelectOptGroup label="Engineer">
        <SelectOption value="Yiminghe">yiminghe</SelectOption>
        <SelectOption value="Yiminghe1">yiminghe1</SelectOption>
      </SelectOptGroup>
    </Select>
    <Select
      v-model:value="value"
      :options="options"
      style="width: 200px"
      @change="handleChange"
    ></Select>
  </Space>
`
  }
};

GroupComponent.storyName = "分组 group";
GroupComponent.parameters = parameters(GroupComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SearchComponent = () => {
  return {
    components: {
      Select,
    },
    setup() {
      const options = ref<SelectProps['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      const handleBlur = () => {
        console.log('blur');
      };
      const handleFocus = () => {
        console.log('focus');
      };
      const filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };

      const value = ref<string | undefined>(undefined);

      return {
        value,
        options,
        handleChange,
        handleFocus,
        handleBlur,
        filterOption
      }
    },
    template: `
  <Select
    v-model:value="value"
    show-search
    placeholder="Select a person"
    style="width: 200px"
    :options="options"
    :filter-option="filterOption"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  ></Select>
`
  }
};

SearchComponent.storyName = "带搜索框 search";
SearchComponent.parameters = parameters(SearchComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SuffixIconComponent = () => {
  return {
    components: {
      Select,
      Space,
      SmileOutlined,
      MehOutlined
    },
    setup() {
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };

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
      const value1 = ref('lucy');
      const value2 = ref('lucy');

      return {
        value1,
        value2,
        options1,
        options2,
        handleChange
      }
    },
    template: `
  <Space>
    <Select
      v-model:value="value1"
      style="width: 120px"
      :options="options1"
      @change="handleChange"
    >
      <template #suffixIcon><SmileOutlined class="ant-select-suffix" /></template>
    </Select>
    <Select v-model:value="value2" style="width: 120px" disabled :options="options2">
      <template #suffixIcon><MehOutlined class="ant-select-suffix" /></template>
    </Select>
  </Space>
`
  }
};

SuffixIconComponent.storyName = "后缀图标 suffixIcon";
SuffixIconComponent.parameters = parameters(SuffixIconComponent)

// ------------------------------------------------------------------------------------------------------------------------

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

export const DropdownRenderComponent = () => {
  return {
    components: {
      Select,
      Space,
      Divider,
      Input,
      Button,
      PlusOutlined,
      VNodes
    },
    setup() {
      const VNodes = defineComponent({
        props: {
          vnodes: {
            type: Object,
            required: true,
          },
        },
        render() {
          return this.vnodes;
        },
      });

      let index = 0;
      const items = ref(['jack', 'lucy']);
      const value = ref();
      const inputRef = ref();
      const name = ref();

      const addItem = (e: any) => {
        e.preventDefault();
        console.log('addItem');
        items.value.push(name.value || `New item ${(index += 1)}`);
        name.value = '';
        setTimeout(() => {
          inputRef.value?.focus();
        }, 0);
      };

      return {
        value,
        items,
        inputRef,
        name,
        addItem,
        VNodes
      }
    },
    template: `
  <Space>
    <Select
      v-model:value="value"
      placeholder="custom dropdown render"
      style="width: 300px"
      :options="items.map(item => ({ value: item }))"
    >
      <template #dropdownRender="{ menuNode: menu }">
        <VNodes :vnodes="menu" />
        <Divider style="margin: 4px 0" />
        <Space style="padding: 4px 8px">
          <Input ref="inputRef" v-model:value="name" placeholder="Please enter item" />
          <Button type="text" @click="addItem">
            <template #icon>
              <PlusOutlined />
            </template>
            Add item
          </Button>
        </Space>
      </template>
    </Select>
  </Space>
`
  }
};

DropdownRenderComponent.storyName = "扩展菜单 dropdownRender";
DropdownRenderComponent.parameters = parameters(DropdownRenderComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const BigCountComponent = () => {
  return {
    components: {
      Select,
      Space,
      SmileOutlined,
      MehOutlined
    },
    setup() {
      const options: { value: string; disabled: boolean }[] = [];
      for (let i = 0; i < 100000; i++) {
        const value = `${i.toString(36)}${i}`;
        options.push({
          value,
          disabled: i === 10,
        });
      }

      const value = ref(['a10', 'c12']);

      return {
        value,
        options
      }
    },
    template: `
  <h2>{{ options.length }} Items</h2>
  <Select
    v-model:value="value"
    mode="multiple"
    style="width: 100%"
    placeholder="Please select"
    :options="options"
  />
`
  }
};

BigCountComponent.storyName = "大数据（虚拟滚动）";
BigCountComponent.parameters = parameters(BigCountComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PlacementComponent = () => {
  return {
    components: {
      Select,
      Space,
      SmileOutlined,
      MehOutlined,
      RadioGroup,
      RadioButton
    },
    setup() {
      const placement = ref('topLeft' as const);
      const value = ref('HangZhou');

      return {
        placement,
        value
      }
    },
    template: `
  <RadioGroup v-model:value="placement">
    <RadioButton value="topLeft">topLeft</RadioButton>
    <RadioButton value="topRight">topRight</RadioButton>
    <RadioButton value="bottomLeft">bottomLeft</RadioButton>
    <RadioButton value="bottomRight">bottomRight</RadioButton>
  </RadioGroup>
  <br />
  <br />
  <Select
    v-model:value="value"
    style="width: 120px"
    :dropdown-match-select-width="false"
    :placement="placement"
  >
    <SelectOption value="HangZhou">HangZhou #310000</SelectOption>
    <SelectOption value="NingBo">NingBo #315000</SelectOption>
    <SelectOption value="WenZhou">WenZhou #325000</SelectOption>
  </Select>
`
  }
};

PlacementComponent.storyName = "弹出位置 placement";
PlacementComponent.parameters = parameters(PlacementComponent)