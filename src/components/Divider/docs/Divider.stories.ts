import Divider from '../Divider.vue'
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Divider }

const meta: Meta<typeof Divider> = {
  title: '通用/Divider 分割线',
  component: Divider,
  decorators: [
    () => ({
      template: '<div class="storybook-demo fullBox-demo"><story /></div>',
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
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider>With Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider dashed />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
`
  }
};

Default.storyName = "基本使用 divider";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const VerticalComponent = () => {
  return {
    components,
    template: `
  <div>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </div>
`
  }
};

VerticalComponent.storyName = "垂直分割线 vertical";
VerticalComponent.parameters = parameters(VerticalComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const WithTextComponent = () => {
  return {
    components,
    template: `
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider>Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider orientation="left">Left Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider orientation="right">Right Text</Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider orientation="left" orientation-margin="0px">
    Left Text with 0 orientationMargin
  </Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider orientation="right" orientation-margin="50px">
    Right Text with 50px orientationMargin
  </Divider>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
`
  }
};

WithTextComponent.storyName = "带文字的分割线 withText";
WithTextComponent.parameters = parameters(WithTextComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const CustomComponent = () => {
  return {
    components,
    template: `
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
    probare, quae sunt a te dicta? Refert tamen, quo modo.
  </p>
  <Divider>Text</Divider>
  <Divider style="height: 2px; background-color: #7cb305" />
  <Divider style="border-color: #7cb305" dashed />
  <Divider type="vertical" style="height: 60px; background-color: #7cb305" />
  <Divider type="vertical" style="height: 60px; border-color: #7cb305" dashed />
`
  }
};

CustomComponent.storyName = "样式自定义 custom";
CustomComponent.parameters = parameters(CustomComponent)