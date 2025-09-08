import { ref, computed } from 'vue';
import { Tooltip } from '../index'
import { Button } from '../../Button'
import { Divider } from '../../Divider'
import { RadioGroup, Radio } from '../../Radio'
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Tooltip }

const meta: Meta<typeof Tooltip> = {
  title: '通用/Tooltip 文字提示',
  component: Tooltip,
  decorators: [
    () => ({
      template: '<div class="storybook-demo cs-tooltip-demo"><story /></div>',
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
      ...components,
    },
    setup() {
    },
    template: `
  <Tooltip>
    <template #title>prompt text</template>
    Tooltip will show when mouse enter.
  </Tooltip>
`
  }
};

Default.storyName = "基本使用 tooltip";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const ColorComponent = () => {
  return {
    components: {
      ...components,
      Divider,
      Button,
      Tooltip,
    },
    setup() {
      const colors = [
        'pink',
        'red',
        'yellow',
        'orange',
        'cyan',
        'green',
        'blue',
        'purple',
        'geekblue',
        'magenta',
        'volcano',
        'gold',
        'lime',
      ];
      const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

      return {
        colors,
        customColors,
      }
    },
    template: `
  <div id="components-Tooltip-demo-color">
    <Divider orientation="left">Presets</Divider>
    <div>
      <Tooltip v-for="color in colors" :key="color" title="prompt text" :color="color">
        <Button type="second">{{ color }}</Button>
      </Tooltip>
    </div>
    <Divider orientation="left">Custom</Divider>
    <div>
      <Tooltip v-for="color in customColors" :key="color" title="prompt text" :color="color">
        <Button type="second">{{ color }}</Button>
      </Tooltip>
    </div>
  </div>
`
  }
};

ColorComponent.storyName = "多彩文字提示 color";
ColorComponent.parameters = parameters(ColorComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PlacementComponent = () => {
  return {
    components: {
      ...components,
      Divider,
      Button,
      Tooltip,
    },
    setup() {
    },
    template: `
  <div id="components-Tooltip-demo-placement">
    <div :style="{ marginLeft: '70px', whiteSpace: 'nowrap' }">
      <Tooltip placement="topLeft">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>TL</Button>
      </Tooltip>
      <Tooltip placement="top">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip placement="topRight">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>TR</Button>
      </Tooltip>
    </div>
    <div :style="{ width: '70px', float: 'left' }">
      <Tooltip placement="leftTop">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>LT</Button>
      </Tooltip>
      <Tooltip placement="left">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Left</Button>
      </Tooltip>
      <Tooltip placement="leftBottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>LB</Button>
      </Tooltip>
    </div>
    <div :style="{ width: '70px', marginLeft: '304px' }">
      <Tooltip placement="rightTop">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>RT</Button>
      </Tooltip>
      <Tooltip placement="right">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip placement="rightBottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>RB</Button>
      </Tooltip>
    </div>
     <div :style="{ marginLeft: '70px', clear: 'both', whiteSpace: 'nowrap' }">
      <Tooltip placement="bottomLeft">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>BL</Button>
      </Tooltip>
      <Tooltip placement="bottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip placement="bottomRight">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>BR</Button>
      </Tooltip>
    </div>
  </div>
`
  }
};

PlacementComponent.storyName = "位置 placement";
PlacementComponent.parameters = parameters(PlacementComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const AutoComponent = () => {
  return {
    components: {
      ...components,
      Button
    },
    setup() {
      const wrapStyles: Record<string, string> = {
        overflow: 'hidden',
        position: 'relative',
        padding: '24px',
        border: '1px solid #e9e9e9',
      };
      const getPopupContainer = (trigger: HTMLElement) => {
        return trigger.parentElement;
      };

      return {
        wrapStyles,
        getPopupContainer,
      }
    },
    template: `
  <div :style="wrapStyles">
    <Tooltip placement="left" title="Prompt Text" :get-popup-container="getPopupContainer">
      <Button>Adjust automatically / 自动调整</Button>
    </Tooltip>
    <br />
    <Tooltip
      placement="left"
      title="Prompt Text"
      :get-popup-container="getPopupContainer"
      :auto-adjust-overflow="false"
    >
      <Button style="margin-top: 10px">Ingore / 不处理</Button>
    </Tooltip>
  </div>
`
  }
};

AutoComponent.storyName = "自动调整位置 auto";
AutoComponent.parameters = parameters(AutoComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ArrowComponent = () => {
  return {
    components: {
      ...components,
      Divider,
      Button,
      Tooltip,
      RadioGroup,
      Radio,
    },
    setup() {
      const arrow = ref<string>('show');

      const options = [
        {
          label: 'Show',
          value: 'show',
        },
        {
          label: 'Hide',
          value: 'hide',
        },
        {
          label: 'Center',
          value: 'center',
        },
      ];
      const mergedArrow = computed(() => {
        switch (arrow.value) {
          case 'show':
            return true;
          case 'hide':
            return false;
          case 'center':
          default:
            return { pointAtCenter: true };
        }
      });

      return {
        arrow,
        options,
        mergedArrow,
      }
    },
    template: `
  <div id="components-Tooltip-demo-arrow">
    <div style="margin-bottom: 24px">
      <RadioGroup v-model:value="arrow" :options="options">
        <Radio v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </Radio>
      </RadioGroup>
    </div>
    <div :style="{ marginLeft: '70px', whiteSpace: 'nowrap' }">
      <Tooltip placement="topLeft" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>TL</Button>
      </Tooltip>
      <Tooltip placement="top" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip  placement="topRight" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>TR</Button>
      </Tooltip>
    </div>
    <div :style="{ width: '70px', float: 'left' }">
      <Tooltip placement="leftTop" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>LT</Button>
      </Tooltip>
      <Tooltip placement="left" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Left</Button>
      </Tooltip>
      <Tooltip placement="leftBottom" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>LB</Button>
      </Tooltip>
    </div>
    <div :style="{ width: '70px', marginLeft: '304px' }">
      <Tooltip placement="rightTop" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>RT</Button>
      </Tooltip>
      <Tooltip placement="right" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip placement="rightBottom" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>RB</Button>
      </Tooltip>
    </div>
    <div :style="{ marginLeft: '70px', clear: 'both', whiteSpace: 'nowrap' }">
      <Tooltip placement="bottomLeft" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>BL</Button>
      </Tooltip>
      <Tooltip placement="bottom" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip placement="bottomRight" :arrow="mergedArrow">
        <template #title>
          <span>prompt text</span>
        </template>
        <Button>BR</Button>
      </Tooltip>
    </div>
  </div>
`
  }
};

ArrowComponent.storyName = "箭头展示";
ArrowComponent.parameters = parameters(ArrowComponent)