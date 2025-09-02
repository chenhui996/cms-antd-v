import { ref, h } from 'vue';
import Spin from '../Spin.vue'
import { Switch } from '../../Switch/index'
import { Space, Alert } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Spin }

const meta: Meta<typeof Spin> = {
  title: '通用/Spin 加载中',
  component: Spin,
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
  <Spin />
`
  }
};

Default.storyName = "基本使用 spin";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const ContainerComponent = () => {
  return {
    components,
    template: `
  <div style="width: 100%; height: 100px; background-color: #f0f2f5; display: flex; justify-content: center; align-items: center;">
    <Spin />
  </div>
`
  }
};

ContainerComponent.storyName = "容器";
ContainerComponent.parameters = parameters(ContainerComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SizeComponent = () => {
  return {
    components: {
      Spin,
      Space
    },
    template: `
  <Space>
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Space>
`
  }
};

SizeComponent.storyName = "各种大小 size";
SizeComponent.parameters = parameters(SizeComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const TipComponent = () => {
  return {
    components: {
      Spin,
      Alert
    },
    template: `
  <Spin tip="Loading...">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
    ></Alert>
  </Spin>
`
  }
};

TipComponent.storyName = "自定义描述文案";
TipComponent.parameters = parameters(TipComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const IndicatorComponent = () => {
  return {
    components: {
      Spin,
      LoadingOutlined
    },
    setup() {
      const indicator = h(LoadingOutlined, {
        style: {
          fontSize: '24px',
        },
        spin: true,
      });

      return {
        indicator
      }
    },
    template: `
  <Spin :indicator="indicator" />
`
  }
};

IndicatorComponent.storyName = "自定义指示符";
IndicatorComponent.parameters = parameters(IndicatorComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const CardLoadingComponent = () => {
  return {
    components: {
      Spin,
      Alert,
      Switch
    },
    setup() {
      const spinning = ref<boolean>(false);

      return {
        spinning
      }
    },
    template: `
  <Spin :spinning="spinning">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
    ></Alert>
  </Spin>
  <div style="margin-top: 16px;">
    Loading state：
    <Switch v-model:checked="spinning" />
  </div>
`
  }
};

CardLoadingComponent.storyName = "卡片加载中";
CardLoadingComponent.parameters = parameters(CardLoadingComponent)
// ------------------------------------------------------------------------------------------------------------------------

export const DelayComponent = () => {
  return {
    components: {
      Spin,
      Alert,
      Switch
    },
    setup() {
      const spinning = ref<boolean>(false);
      const delayTime = 500;
      return {
        spinning,
        delayTime
      }
    },
    template: `
  <Spin :spinning="spinning" :delay="delayTime">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
    ></Alert>
  </Spin>
  <div style="margin-top: 16px;">
    Loading state：
    <Switch v-model:checked="spinning" />
  </div>
`
  }
};

DelayComponent.storyName = "延迟 delay";
DelayComponent.parameters = parameters(DelayComponent)