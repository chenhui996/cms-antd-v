import { ref, h } from 'vue';
import Button from '../Button.vue'
import type { Meta } from '@storybook/vue3';
import {RadioButton, RadioGroup, Space, Tooltip, Dropdown, Menu, MenuItem} from 'ant-design-vue'
import { PoweroffOutlined, DownloadOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/lib/config-provider';
import './style.less';

const components = { Button }

const meta: Meta<typeof Button> = {
  title: '通用/Button 按钮',
  component: Button,
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
    template: `
  <Button>Button</Button>
`
  }
};

Default.storyName = "基本使用 button";
Default.parameters = parameters(Default)

export const TypesComponent = () => ({
  components,
  template: `
  <div class="story-flex-wrap">
    <Button type="primary">Primary Button</Button>
    <Button type="second">Second Button</Button>
    <Button type="weak">Weak Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="text-primary">Text Primary Button</Button>
    <Button type="link">Link Button</Button>
  </div>
`,
})

TypesComponent.storyName = "按钮类型 type";
TypesComponent.parameters = parameters(TypesComponent)

export const GhostComponent = () => ({
  components,
  template: `
  <div class="story-flex-wrap story-bg-gary">
    <Button type="primary" ghost>Primary Button</Button>
    <Button type="second" ghost>Second Button</Button>
    <Button type="weak" ghost>Weak Button</Button>
    <Button type="dashed" ghost>Dashed Button</Button>

    <Button type="primary" ghost danger>Danger Primary Button</Button>
    <Button type="dashed" ghost danger>Danger Dashed Button</Button>
  </div>
`,
})

GhostComponent.storyName = "幽灵按钮 ghost";
GhostComponent.parameters = parameters(GhostComponent)

export const LoadingComponent = () => ({
  components: {
    PoweroffOutlined,
    Button
  },
  setup() {
    const loading = ref<boolean>(false);
    const iconLoading = ref<boolean | { delay: number }>(false);
    const enterIconLoading = () => {
      iconLoading.value = { delay: 1000 };

      setTimeout(() => {
        iconLoading.value = false;
      }, 6000);
    };

    return {
      loading,
      iconLoading,
      enterIconLoading
    }
  },
  template: `
  <div class="story-flex-wrap">
    <Button type="primary" loading>Loading</Button>
    <Button type="primary" size='small' loading>Loading</Button>
    <div>
      <Button type="primary" :loading="loading" @mouseenter="loading = true">
        mouseenter me!
      </Button>
      <Button type="primary" :loading="iconLoading" @click="enterIconLoading">
       <template #icon><PoweroffOutlined /></template>
        延迟1s
      </Button>
    </div>
    <div>
      <Button type="primary" loading />
      <Button type="primary" shape="circle" loading />
      <Button danger shape="round" loading />
    </div>
  </div>
`,
})

LoadingComponent.storyName = "加载中状态 loading";
LoadingComponent.parameters = parameters(LoadingComponent)

export const SizeComponent = () => ({
  components: {
    DownloadOutlined,
    Button,
    RadioGroup,
    RadioButton
  },
  setup() {
    const size = ref<SizeType>('large');
    return {
      size
    }
  },
  template: `
  <div style="margin-bottom: 16px;">
    <RadioGroup v-model:value="size">
      <RadioButton value="large">Large</RadioButton>
      <RadioButton value="default">Default</RadioButton>
      <RadioButton value="small">Small</RadioButton>
    </RadioGroup>
  </div>
  <div class="story-flex-wrap">
    <Button type="primary" :size="size">Primary</Button>
    <Button type="second" :size="size">Normal</Button>
    <Button type="weak" :size="size">Weak</Button>
    <Button type="dashed" :size="size">Dashed</Button>
    <Button danger :size="size">Danger</Button>
    <Button type="link" :size="size">Link</Button>
  </div>
  <div class="story-flex-wrap">
    <Button type="primary" :size="size">
      <template #icon>
          <DownloadOutlined />
      </template>
    </Button>
    <Button type="primary" shape="circle" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button type="primary" shape="round" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
    <Button type="primary" shape="round" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button type="primary" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
  </div>
`,
})

SizeComponent.storyName = "按钮尺寸 size";
SizeComponent.parameters = parameters(SizeComponent)

export const DangerComponent = () => ({
  components,
  template: `
  <div class="story-flex-wrap">
    <Button type="primary" danger>Primary Button</Button>
    <Button type="second" danger>Second Button</Button>
    <Button type="weak" danger>Weak Button</Button>
    <Button type="dashed" danger>Dashed Button</Button>
    <Button type="text" danger>Text Button</Button>
    <Button type="link" danger>Link Button</Button>
  </div>
`,
})

DangerComponent.storyName = "危险按钮 danger";
DangerComponent.parameters = parameters(DangerComponent)

export const DisabledComponent = () => ({
  components: {
    Button,
    Space
  },
  template: `
  <Space direction="vertical">
    <Space>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>Primary(disabled)</Button>
    </Space>
    <Space>
      <Button type="second">Second</Button>
      <Button type="second" disabled>Second(disabled)</Button>
    </Space>
    <Space>
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>Dashed(disabled)</Button>
    </Space>
    <Space>
      <Button type="text">Text</Button>
      <Button type="text" disabled>Text(disabled)</Button>
    </Space>
    <Space>
      <Button type="link">Link</Button>
      <Button type="link" disabled>Link(disabled)</Button>
    </Space>
    <Space>
      <Button type="primary" danger>Danger Primary</Button>
      <Button type="primary" danger disabled>Danger Primary(disabled)</Button>
    </Space>
        <Space>
      <Button type="second" danger>Danger Second</Button>
      <Button type="second" danger disabled>Danger Second(disabled)</Button>
    </Space>
    <Space>
      <Button danger type="text">Danger Text</Button>
      <Button danger type="text" disabled>Danger Text(disabled)</Button>
    </Space>
    <Space>
      <Button danger type="link">Danger Link</Button>
      <Button danger type="link" disabled>Danger Link(disabled)</Button>
    </Space>
    <div :style="{ padding: '8px', background: 'rgb(190, 200, 200)' }">
      <Space>
        <Button ghost>Ghost</Button>
        <Button ghost disabled>Ghost(disabled)</Button>
      </Space>
    </div>
  </Space>
`,
})

DisabledComponent.storyName = "不可用状态 disabled";
DisabledComponent.parameters = parameters(DisabledComponent)

export const IconComponent = () => ({
  components: {
    Button,
    Space,
    SearchOutlined,
    Tooltip,
  },
  setup() {
    return {
      h,
      SearchOutlined
    }
  },
  template: `
  <Space direction="vertical">
    <Space warp>
      <Tooltip title="search">
        <Button type="primary" shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="primary" shape="circle">A</Button>
      <Button type="primary" :icon="h(SearchOutlined)">Search</Button>
      <Button type="primary" :icon="h(SearchOutlined)" href="https://www.google.com" />
      <Tooltip title="search">
        <Button type="primary" danger shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="primary" danger shape="circle">A</Button>
      <Button type="primary" danger :icon="h(SearchOutlined)">Search</Button>
      <Button type="primary" danger :icon="h(SearchOutlined)" href="https://www.google.com" />
    </Space>
    <Space warp>
      <Tooltip title="search">
        <Button type="second" shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="second" shape="circle">A</Button>
      <Button type="second" :icon="h(SearchOutlined)">Search</Button>
      <Button type="second" :icon="h(SearchOutlined)" href="https://www.google.com" />
      <Tooltip title="search">
        <Button type="second" danger shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="second" danger shape="circle">A</Button>
      <Button type="second" danger :icon="h(SearchOutlined)">Search</Button>
      <Button type="second" danger :icon="h(SearchOutlined)" href="https://www.google.com" />
    </Space>
    <Space warp>
      <Tooltip title="search">
        <Button type="weak" shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="weak" shape="circle">A</Button>
      <Button type="weak" :icon="h(SearchOutlined)">Search</Button>
      <Button type="weak" :icon="h(SearchOutlined)" href="https://www.google.com" />
      <Tooltip title="search">
        <Button type="weak" danger shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="weak" danger shape="circle">A</Button>
      <Button type="weak" danger :icon="h(SearchOutlined)">Search</Button>
      <Button type="weak" danger :icon="h(SearchOutlined)" href="https://www.google.com" />
    </Space>
    <Space warp>
      <Tooltip title="search">
        <Button type="dashed" shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="dashed" shape="circle">A</Button>
      <Button type="dashed" :icon="h(SearchOutlined)">Search</Button>
      <Button type="dashed" :icon="h(SearchOutlined)" href="https://www.google.com" />
      <Tooltip title="search">
        <Button type="dashed" danger shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="dashed" danger shape="circle">A</Button>
      <Button type="dashed" danger :icon="h(SearchOutlined)">Search</Button>
      <Button type="dashed" danger :icon="h(SearchOutlined)" href="https://www.google.com" />
    </Space>
    <Space warp>
      <Tooltip title="search">
        <Button type="text" shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="text" shape="circle">A</Button>
      <Button type="text" :icon="h(SearchOutlined)">Search</Button>
      <Button type="text" :icon="h(SearchOutlined)" href="https://www.google.com" />
      <Tooltip title="search">
        <Button type="text" danger shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="text" danger shape="circle">A</Button>
      <Button type="text" danger :icon="h(SearchOutlined)">Search</Button>
      <Button type="text" danger :icon="h(SearchOutlined)" href="https://www.google.com" />
    </Space>
    <Space warp>
      <Tooltip title="search">
        <Button type="link" shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="link" shape="circle">A</Button>
      <Button type="link" :icon="h(SearchOutlined)">Search</Button>
      <Button type="link" :icon="h(SearchOutlined)" href="https://www.google.com" />
      <Tooltip title="search">
        <Button type="link" danger shape="circle" :icon="h(SearchOutlined)" />
      </Tooltip>
      <Button type="link" danger shape="circle">A</Button>
      <Button type="link" danger :icon="h(SearchOutlined)">Search</Button>
      <Button type="link" danger :icon="h(SearchOutlined)" href="https://www.google.com" />
    </Space>
  </Space>
`,
})

IconComponent.storyName = "图标按钮 icon";
IconComponent.parameters = parameters(IconComponent)

export const MultipleComponent = () => ({
  components: {
    Button,
    Space,
    Dropdown,
    DownOutlined,
    Menu,
    MenuItem
  },
  setup() {
    const handleMenuClick = (key: string) => {
      console.log(key);
    };
    return {
      handleMenuClick
    }
  },
  template: `
  <Space>
    <Button type="primary">Primary</Button>
    <Button type="second">secondary</Button>
    <Dropdown>
      <template #overlay>
        <Menu @click="handleMenuClick">
          <MenuItem key="1">1st item</MenuItem>
          <MenuItem key="2">2nd item</MenuItem>
          <MenuItem key="3">3rd item</MenuItem>
        </Menu>
      </template>
      <Button type="second">
        Actions
        <DownOutlined />
      </Button>
    </Dropdown>
  </Space>
`,
})

MultipleComponent.storyName = "多个按钮组合";
MultipleComponent.parameters = parameters(MultipleComponent)

export const BlockComponent = () => ({
  components,
  template: `
  <div style="margin-bottom: 16px;">
    <Button type="primary" block>Primary</Button>
  </div>
  <div style="margin-bottom: 16px;">
    <Button type="second" block>Default</Button>
  </div>
  <div style="margin-bottom: 16px;">
    <Button type="weak" block>Default</Button>
  </div>
  <div style="margin-bottom: 16px;">
    <Button type="dashed" block>Dashed</Button>
  </div>
  <div style="margin-bottom: 16px;">
    <Button type="second" danger block>Danger</Button>
  </div>
  <div>
    <Button type="link" block>Link</Button>
  </div>
`,
})

BlockComponent.storyName = "Block 按钮";
BlockComponent.parameters = parameters(BlockComponent)

