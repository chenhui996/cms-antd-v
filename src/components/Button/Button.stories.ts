import { reactive, toRefs, ref } from 'vue'
import Button from './Button.vue'
import { PoweroffOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import type { SizeType } from 'ant-design-vue/lib/config-provider/context'
import ARadioGroup from 'ant-design-vue/lib/radio/Group'
import ARadioButton from 'ant-design-vue/lib/radio/RadioButton'
import { ConfigProvider } from 'ant-design-vue'

const components = { Button }

const parameters = (instance: any) => {
  const parameter = {
    docs: {
      source: {
        code: ''
      }
    }
  }
  parameter.docs.source.code = `<template>\n${instance().template}\n</template>\n\n<script>\n${instance().setup ? `${instance().setup}` : ''
    }\n</script>`

  return parameter
}

export const Default = () => ({
  components,
  template: `
        <Button type="primary">主按钮</Button>
        <Button type="secoundPrimary">次要按钮</Button>
        <Button type="dashed" ghost>虚线按钮</Button>
        <Button type="primary" danger >危险按钮</Button>
        <Button danger ghost>危险按钮</Button>
        <Button type="ghost" danger>危险按钮</Button>
        <Button type="weak">弱化按钮</Button>
        <Button type="ghost">幽灵按钮(文字按钮)</Button>
    `,
})

Default.storyName = "按钮类型";
Default.parameters = parameters(Default)

export const 不可用状态 = () => ({
  components,
  template: `
  <Button type="primary" disabled>主按钮</Button>
        <Button type="secoundPrimary"disabled>次要按钮</Button>
        <Button type="dashed" ghost disabled>虚线按钮</Button>
        <Button type="primary" danger disabled>危险按钮</Button>
        <Button danger ghost disabled>危险按钮</Button>
        <Button type="ghost" danger disabled>危险按钮</Button>
        <Button type="weak" disabled>弱化按钮</Button>
        <Button type="ghost" disabled>幽灵按钮(文字按钮)</Button>
    `
})

不可用状态.parameters = parameters(不可用状态)

export const 加载中状态 = () => ({
  components: {
    PoweroffOutlined,
    Button
  },
  setup() {
    const state = reactive({
      loading: false,
      iconLoading: false as boolean | object
    })
    const methods = reactive({
      enterIconLoading: () => {
        state.iconLoading = { delay: 1000 }

        setTimeout(() => {
          state.iconLoading = false
        }, 6000)
      }
    })
    return { ...toRefs(state), ...toRefs(methods) }
  },
  template: `
  <a-space style="width: 100%">
    <Button type="primary" loading>Loading</Button>
  </a-space>
  <a-space style="width: 100%">
    <Button type="primary" :loading="loading" @mouseenter="loading = true">
      mouseenter me!
    </Button>
    <Button type="primary" :loading="iconLoading" @click="enterIconLoading">
      <template #icon><PoweroffOutlined /></template>
      延迟1s
    </Button>
  </a-space>
  <a-space style="width: 100%">
    <Button type="primary" loading />
    <Button type="primary" shape="circle" loading />
    <Button danger shape="round" loading />
  </a-space>
    `
})

加载中状态.parameters = parameters(加载中状态)

console.log('加载', 加载中状态())

export const 图标按钮 = () => ({
  components: {
    SearchOutlined,
    Button
  },
  template: `
  <Button type="primary" shape="circle">
    <template #icon><SearchOutlined /></template>
  </Button>
  <Button type="primary" shape="circle">A</Button>
  <Button type="primary">
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <Button shape="circle">
    <template #icon><SearchOutlined /></template>
  </Button>
  <Button>
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <Button shape="circle">
    <template #icon><SearchOutlined /></template>
  </Button>
  <Button>
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <Button type="dashed" shape="circle">
    <template #icon><SearchOutlined /></template>
  </Button>
  <Button type="dashed">
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <Button href="https://www.google.com">
    <template #icon><SearchOutlined /></template>
  </Button>
  <br />
  <br />
  <a-tooltip title="search">
    <Button type="primary" shape="circle" size="large">
      <template #icon><SearchOutlined /></template>
    </Button>
  </a-tooltip>
  <Button type="primary" shape="circle" size="large">A</Button>
  <Button type="primary" size="large">
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <a-tooltip title="search">
    <Button shape="circle" size="large">
      <template #icon><SearchOutlined /></template>
    </Button>
  </a-tooltip>
  <Button size="large">
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <br />
  <a-tooltip title="search">
    <Button shape="circle" size="large">
      <template #icon><SearchOutlined /></template>
    </Button>
  </a-tooltip>
  <Button size="large">
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <a-tooltip title="search">
    <Button type="dashed" shape="circle" size="large">
      <template #icon><SearchOutlined /></template>
    </Button>
  </a-tooltip>
  <Button type="dashed" size="large">
    <template #icon><SearchOutlined /></template>
    Search
  </Button>
  <Button size="large" href="https://www.google.com">
    <template #icon><SearchOutlined /></template>
  </Button>
    `
})

图标按钮.parameters = parameters(图标按钮)

export const 按钮尺寸 = () => ({
  components: {
    DownloadOutlined,
    Button,
    ARadioGroup,
    ARadioButton
  },
  setup() {
    return {
      size: ref<SizeType>('large')
    }
  },
  template: `
  <a-radio-group v-model:value="size">
    <a-radio-button value="large">Large</a-radio-button>
    <a-radio-button value="default">Default</a-radio-button>
    <a-radio-button value="small">Small</a-radio-button>
  </a-radio-group>
  <br />
  <br />
  <Button type="primary" :size="size">Primary</Button>
  <Button :size="size">Normal</Button>
  <Button type="dashed" :size="size">Dashed</Button>
  <Button danger :size="size">Danger</Button>
  <Button type="link" :size="size">Link</Button>
  <br />
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
  <br />
    `
})

按钮尺寸.parameters = parameters(按钮尺寸)

export const 危险按钮 = () => ({
  components,
  template: `
    <Button type="primary" danger>Primary</Button>
    <Button danger>Default</Button>
    <Button type="dashed" danger>Dashed</Button>
    <Button type="text" danger>Text</Button>
    <Button type="link" danger>Link</Button>
    `
})

危险按钮.parameters = parameters(危险按钮)

export default {
  title: '通用/Button 按钮',
  component: Button,
  // tags: ['autodocs'],
  decorators: [
    () => ({
      components: { ConfigProvider },
      template: '<ConfigProvider><story /></ConfigProvider>',
    })
  ],
}
