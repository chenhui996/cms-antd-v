import { ref, h, watch } from 'vue';
import Popconfirm from '../Popconfirm.vue'
import { Button } from '../../Button/index'
import { Space, message, Checkbox } from 'ant-design-vue'
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Popconfirm }

const meta: Meta<typeof Popconfirm> = {
  title: '通用/Popconfirm 气泡确认框',
  component: Popconfirm,
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
      Popconfirm,
      Button
    },
    setup() {
      const confirm = (e: MouseEvent) => {
        console.log(e);
        message.success('Click on Yes');
      };

      const cancel = (e: MouseEvent) => {
        console.log(e);
        message.error('Click on No');
      };

      return {
        confirm,
        cancel
      }
    },
    template: `
  <Popconfirm
    title="Are you sure delete this task?"
    ok-text="Yes"
    cancel-text="No"
    @confirm="confirm"
    @cancel="cancel"
  >
    <Button type="link">Delete</Button>
  </Popconfirm>
`
  }
};

Default.storyName = "基本使用 popconfirm";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const CustomIconComponent = () => {
  return {
    components: {
      Popconfirm,
      Button,
      QuestionCircleOutlined
    },
    setup() {
      const confirm = (e: MouseEvent) => {
        console.log(e);
        message.success('Click on Yes');
      };

      const cancel = (e: MouseEvent) => {
        console.log(e);
        message.error('Click on No');
      };

      return {
        confirm,
        cancel
      }
    },
    template: `
  <Popconfirm title="Are you sure？">
    <template #icon><QuestionCircleOutlined style="color: red" /></template>
    <Button type="link">Delete</Button>
  </Popconfirm>
`
  }
};

CustomIconComponent.storyName = "自定义 Icon 图标";
CustomIconComponent.parameters = parameters(CustomIconComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ControlComponent = () => {
  return {
    components: {
      Popconfirm,
      Button,
      Checkbox,
    },
    setup() {
      const visible = ref<boolean>(false);
      const condition = ref<boolean>(true);

      const confirm = () => {
        visible.value = false;
        message.success('Next step.');
      };

      const cancel = () => {
        visible.value = false;
        message.error('Click on cancel.');
      };

      const handleVisibleChange = (bool: boolean) => {
        console.log('in handleVisibleChange', bool);

        if (!bool) {
          visible.value = false;
          return;
        }
        // Determining condition before show the popconfirm.
        console.log(condition.value);
        if (condition.value) {
          confirm(); // next step
        } else {
          visible.value = true;
        }
      };

      return {
        visible,
        condition,
        handleVisibleChange,
        confirm,
        cancel
      }
    },
    template: `
  <div>
    <Popconfirm
      title="Are you sure delete this task?"
      :open="visible"
      ok-text="Yes"
      cancel-text="No"
      @openChange="handleVisibleChange"
      @confirm="confirm"
      @cancel="cancel"
    >
      <Button type="link">Delete a task</Button>
    </Popconfirm>
    <br />
    <br />
    Whether directly execute：
    <Checkbox v-model:checked="condition" />
  </div>
`
  }
};

ControlComponent.storyName = "条件触发";
ControlComponent.parameters = parameters(ControlComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const LocaleComponent = () => {
  return {
    components: {
      Popconfirm,
      Button,
      Checkbox,
    },
    template: `
  <Popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No">
    <Button type="link">Delete</Button>
  </Popconfirm>
`
  }
};

LocaleComponent.storyName = "国际化 locale";
LocaleComponent.parameters = parameters(LocaleComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PositionComponent = () => {
  return {
    components: {
      Popconfirm,
      Button,
      Checkbox,
    },
    setup() {
      const text = 'Are you sure to delete this task?';

      const confirm = () => {
        message.info('Clicked on Yes.');
      };

      return {
        text,
        confirm
      }
    },
    template: `
  <div id="components-a-popconfirm-demo-placement">
    <div :style="{ marginLeft: '70px', whiteSpace: 'nowrap' }">
      <Popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>TL</Button>
      </Popconfirm>
      <Popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>Top</Button>
      </Popconfirm>
      <Popconfirm placement="topRight" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>TR</Button>
      </Popconfirm>
    </div>
    <div :style="{ width: '70px', float: 'left' }">
      <Popconfirm placement="leftTop" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>LT</Button>
      </Popconfirm>
      <Popconfirm placement="left" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>Left</Button>
      </Popconfirm>
      <Popconfirm placement="leftBottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>LB</Button>
      </Popconfirm>
    </div>
    <div :style="{ width: '70px', marginLeft: '304px' }">
      <Popconfirm placement="rightTop" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>RT</Button>
      </Popconfirm>
      <Popconfirm placement="right" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>Right</Button>
      </Popconfirm>
      <Popconfirm placement="rightBottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>RB</Button>
      </Popconfirm>
    </div>
    <div :style="{ marginLeft: '70px', clear: 'both', whiteSpace: 'nowrap' }">
      <Popconfirm placement="bottomLeft" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>BL</Button>
      </Popconfirm>
      <Popconfirm placement="bottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>Bottom</Button>
      </Popconfirm>
      <Popconfirm placement="bottomRight" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
          <p style="margin: 0; padding: 0;">{{ text }}</p>
        </template>
        <Button>BR</Button>
      </Popconfirm>
    </div>
  </div>
`
  }
};

PositionComponent.storyName = "位置 placement";
PositionComponent.parameters = parameters(PositionComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PromiseComponent = () => {
  return {
    components: {
      Popconfirm,
      Button,
      Checkbox,
    },
    setup() {
      const open = ref<boolean>(false);
      const confirm = (e: MouseEvent) => {
        console.log('in confirm', e);
      };

      const promiseResolve = (resolve: (value: unknown) => void) => {
        console.log('in promiseResolve');

        return new Promise(() => {
          setTimeout(() => {
            resolve(true);
          }, 3000)
        })
      }

      const cancel = (e: MouseEvent) => {
        console.log(e);
        message.error('Click on No');
      };

      const handleOpenChange = (bool: boolean) => {
        console.log('in handleOpenChange', bool);
        open.value = bool;
      }

      return {
        open,
        confirm,
        cancel,
        promiseResolve,
        handleOpenChange
      }
    },
    template: `
  <Popconfirm title="Title" @confirm="confirm" @cancel="cancel" :promise-resolve="promiseResolve" @openChange="handleOpenChange" :open="open">
    <Button type="primary">Open Popconfirm with Promise</Button>
  </Popconfirm>
`
  }
};

PromiseComponent.storyName = "基于 Promise 的异步关闭 (3.0+)";
PromiseComponent.parameters = parameters(PromiseComponent)

