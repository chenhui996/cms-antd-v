import FloatButton from '../FloatButton.vue'
import BackTop from '../BackTop.vue';
import FloatButtonGroup from '../FloatButtonGroup.vue';
// import { FloatButtonGroup } from 'ant-design-vue';
import type { Meta } from '@storybook/vue3';
import {
  PlusOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  CommentOutlined,
  HomeOutlined,
  MessageOutlined,
  FileTextOutlined,
  SettingOutlined,
  SyncOutlined
} from '@ant-design/icons-vue';
import './style.less';

const components = { FloatButton }

const meta: Meta<typeof FloatButton> = {
  title: '通用/FloatButton 悬浮按钮',
  component: FloatButton,
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
    return setupContent
  }

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
      const handleClick = () => {
        console.log('click')
      }
      return {
        handleClick
      }
    },
    template: `
  <FloatButton @click="handleClick" />
`
  }
};

Default.storyName = "基本使用";

Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const TypesComponent = () => ({
  components: {
    FloatButton,
    QuestionCircleOutlined
  },
  template: `
  <FloatButton
    type="primary"
    :style="{
      right: '24px',
    }"
  >
    <template #icon>
      <QuestionCircleOutlined />
    </template>
  </FloatButton>

  <FloatButton
    type="default"
    :style="{
      right: '94px',
    }"
  >
    <template #icon>
      <QuestionCircleOutlined />
    </template>
  </FloatButton>
`,
})

TypesComponent.storyName = "按钮类型";
TypesComponent.parameters = parameters(TypesComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ShapesComponent = () => ({
  components: {
    FloatButton,
    CustomerServiceOutlined
  },
  setup() {
    const handleClick = () => {
      console.log('click')
    }
    return {
      handleClick
    }
  },
  template: `
  <FloatButton @click="handleClick" />

  <FloatButton
    shape="circle"
    type="primary"
    :style="{
      right: '94px',
    }"
  >
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </FloatButton>

  <FloatButton
    shape="square"
    type="primary"
    :style="{
      right: '24px',
    }"
  >
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </FloatButton>
`,
})

ShapesComponent.storyName = "按钮形状 shapes";
ShapesComponent.parameters = parameters(ShapesComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const DescriptionComponent = () => ({
  components: {
    FloatButton,
    FileTextOutlined
  },
  template: `
  <FloatButton
    shape="square"
    description="HELP INFO"
    :style="{
      right: '24px',
    }"
  >
    <template #icon>
      <FileTextOutlined />
    </template>
  </FloatButton>

  <FloatButton
    shape="square"
    description="HELP INFO"
    :style="{
      right: '94px',
    }"
  ></FloatButton>

  <FloatButton
    shape="square"
    description="HELP"
    :style="{
      right: '164px',
    }"
  >
    <template #icon>
      <FileTextOutlined />
    </template>
  </FloatButton>
`,
})

DescriptionComponent.storyName = "描述文本";
DescriptionComponent.parameters = parameters(DescriptionComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const TooltipComponent = () => ({
  components: {
    FloatButton,
    PlusOutlined,
    QuestionCircleOutlined,
    CustomerServiceOutlined
  },
  template: `
  <div class="story-float-demo">
    <FloatButton 
      type="primary" 
      tooltip="添加新内容"
      :style="{
        right: '24px',
      }"
    >
      <PlusOutlined />
    </FloatButton>
    <FloatButton 
      type="default" 
      tooltip="获取帮助"
    >
      <QuestionCircleOutlined />
    </FloatButton>
    <FloatButton 
      type="primary" 
      tooltip="联系客服"
      :style="{
        right: '94px',
      }"
    >
      <CustomerServiceOutlined />
    </FloatButton>
    <FloatButton 
      type="primary" 
      tooltip="联系客服"
      :style="{
        right: '164px',
      }"
    >
      <CustomerServiceOutlined />
    </FloatButton>
  </div>
`,
})

TooltipComponent.storyName = "含有气泡卡片的悬浮按钮 tooltip";
TooltipComponent.parameters = parameters(TooltipComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const BadgeComponent = () => ({
  components:{
    FloatButton,
    FloatButtonGroup,
    QuestionCircleOutlined,
    BackTop
  },
  template: `
  <FloatButton shape="circle" :badge="{ dot: true }" :style="{ right: '164px' }" />
  <FloatButtonGroup shape="circle" :style="{ right: '94px' }">
    <FloatButton :badge="{ count: 5, color: 'blue' }">
      <template #tooltip>
        <div>custom badge color</div>
      </template>
    </FloatButton>
    <FloatButton :badge="{ count: 5 }"></FloatButton>
  </FloatButtonGroup>
  <FloatButtonGroup shape="circle">
    <FloatButton :badge="{ count: 12 }">
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </FloatButton>
    <FloatButton :badge="{ count: 123, overflowCount: 999 }"></FloatButton>
    <BackTop :visibility-height="0" />
  </FloatButtonGroup>
`,
})

BadgeComponent.storyName = "徽标数 badge";
BadgeComponent.parameters = parameters(BadgeComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const TriggerComponent = () => ({
  components:{
    FloatButtonGroup,
    CustomerServiceOutlined,
    CommentOutlined,
    FloatButton
  },
  template: `
  <FloatButtonGroup trigger="click" type="primary" :style="{ right: '24px' }">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
    <FloatButton />
    <FloatButton>
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
  </FloatButtonGroup>
  <FloatButtonGroup trigger="hover" type="primary" :style="{ right: '94px' }">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
    <FloatButton />
    <FloatButton>
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
  </FloatButtonGroup>
`,
})

TriggerComponent.storyName = "菜单模式";
TriggerComponent.parameters = parameters(TriggerComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const FloatButtonGroupComponent = () => ({
  components:{
    FloatButtonGroup,
    FloatButton,
    BackTop,
    QuestionCircleOutlined,
    SyncOutlined
  },
  template: `
  <FloatButtonGroup shape="circle" :style="{ right: '24px' }">
    <FloatButton>
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </FloatButton>
    <FloatButton />
    <BackTop :visibility-height="0" />
  </FloatButtonGroup>
  <FloatButtonGroup shape="square" :style="{ right: '94px' }">
    <FloatButton>
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </FloatButton>
    <FloatButton />

    <FloatButton>
      <template #icon>
        <SyncOutlined />
      </template>
    </FloatButton>
    <BackTop :visibility-height="0" />
  </FloatButtonGroup>
`,
})

FloatButtonGroupComponent.storyName = "浮动按钮组";
FloatButtonGroupComponent.parameters = parameters(FloatButtonGroupComponent)
