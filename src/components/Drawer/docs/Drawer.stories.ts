import { ref, reactive } from 'vue';
import Drawer from '../Drawer.vue'
import { Button } from '../../Button'
import { Input, Textarea } from '../../Input'
import { RadioGroup, Radio } from '../../Radio'
import { Select } from '../../Select'
import {
  type DrawerProps,
  Form,
  FormItem,
  // Input,
  // Select,
  SelectOption,
  DatePicker,
  // Textarea,
  Row,
  Col,
  Space,
  // Drawer 
} from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import './style.less';
import type { Rule } from 'ant-design-vue/es/form';

const components = { Drawer }

const meta: Meta<typeof Drawer> = {
  title: '通用/Drawer 抽屉',
  component: Drawer,
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
      ...components,
      Button
    },
    setup() {
      const open = ref<boolean>(false);

      const afterOpenChange = (bool: boolean) => {
        console.log('open', bool);
      };

      const showDrawer = () => {
        open.value = true;
      };
      return {
        open,
        afterOpenChange,
        showDrawer
      }
    },
    template: `
  <Button type="primary" @click="showDrawer">Open</Button>
  <Drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @afterOpenChange="afterOpenChange"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
`
  }
};

Default.storyName = "基本使用 drawer";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const PlacementComponent = () => {
  return {
    components: {
      ...components,
      Button,
      RadioGroup,
      Radio
    },
    setup() {
      const placement = ref<DrawerProps['placement']>('left');
      const open = ref<boolean>(false);

      const showDrawer = () => {
        open.value = true;
      };

      const onClose = () => {
        open.value = false;
      };

      return {
        placement,
        open,
        showDrawer,
        onClose
      }
    },
    template: `
  <RadioGroup v-model:value="placement" style="margin-right: 8px">
    <Radio value="top">top</Radio>
    <Radio value="right">right</Radio>
    <Radio value="bottom">bottom</Radio>
    <Radio value="left">left</Radio>
  </RadioGroup>
  <Button type="primary" @click="showDrawer">Open</Button>
  <Drawer
    title="Basic Drawer"
    :placement="placement"
    :closable="false"
    :open="open"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
`
  }
};

PlacementComponent.storyName = "自定义位置 placement";
PlacementComponent.parameters = parameters(PlacementComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const FormComponent = () => {
  return {
    components: {
      ...components,
      Button,
      Form,
      FormItem,
      Input,
      Select,
      SelectOption,
      DatePicker,
      Textarea,
      Row,
      Col,
      Space,
      PlusOutlined
    },
    setup() {
      const form = reactive({
        name: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        dateTime: null,
        description: '',
      });

      const rules: Record<string, Rule[]> = {
        name: [{ required: true, message: 'Please enter user name' }],
        url: [{ required: true, message: 'please enter url' }],
        owner: [{ required: true, message: 'Please select an owner' }],
        type: [{ required: true, message: 'Please choose the type' }],
        approver: [{ required: true, message: 'Please choose the approver' }],
        dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
        description: [{ required: true, message: 'Please enter url description' }],
      };

      const open = ref<boolean>(false);

      const showDrawer = () => {
        open.value = true;
      };

      const onClose = () => {
        open.value = false;
      };

      return {
        form,
        rules,
        open,
        showDrawer,
        onClose
      }
    },
    template: `
  <Button type="primary" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    New account
  </Button>
  <Drawer
    title="Create a new account"
    :width="720"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <Form :model="form" :rules="rules" layout="vertical">
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="Name" name="name">
            <Input v-model:value="form.name" placeholder="Please enter user name" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="Url" name="url">
            <Input
              v-model:value="form.url"
              style="width: 100%"
              addon-before="http://"
              addon-after=".com"
              placeholder="please enter url"
            />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="Owner" name="owner">
            <Select v-model:value="form.owner" placeholder="Please Select an owner">
              <Select-option value="xiao">Xiaoxiao Fu</Select-option>
              <Select-option value="mao">Maomao Zhou</Select-option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="Type" name="type">
            <Select v-model:value="form.type" placeholder="Please Select the type">
              <Select-option value="private">Private</Select-option>
              <Select-option value="public">Public</Select-option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="Approver" name="approver">
            <Select v-model:value="form.approver" placeholder="Please choose the approver">
              <Select-option value="jack">Jack Ma</Select-option>
              <Select-option value="tom">Tom Liu</Select-option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="DateTime" name="dateTime">
            <DatePicker
              v-model:value="form.dateTime"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentElement"
            />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col :span="24">
          <FormItem label="Description" name="description">
            <Textarea
              v-model:value="form.description"
              :rows="4"
              placeholder="please enter url description"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <template #extra>
      <Space>
        <Button @click="onClose">Cancel</Button>
        <Button type="primary" @click="onClose">Submit</Button>
      </Space>
    </template>
  </Drawer>
`
  }
};

FormComponent.storyName = "抽屉表单 form";
FormComponent.parameters = parameters(FormComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ExtraComponent = () => {
  return {
    components: {
      ...components,
      Button,
      RadioGroup,
      Radio
    },
    setup() {
      const placement = ref<DrawerProps['placement']>('left');
      const open = ref<boolean>(false);

      const showDrawer = () => {
        open.value = true;
      };

      const onClose = () => {
        open.value = false;
      };

      return {
        placement,
        open,
        showDrawer,
        onClose
      }
    },
    template: `
  <RadioGroup v-model:value="placement" style="margin-right: 8px">
    <Radio value="top">top</Radio>
    <Radio value="right">right</Radio>
    <Radio value="bottom">bottom</Radio>
    <Radio value="left">left</Radio>
  </RadioGroup>
  <Button type="primary" @click="showDrawer">Open</Button>
  <Drawer :width="500" title="Basic Drawer" :placement="placement" :open="open" @close="onClose">
    <template #extra>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
`
  }
};

ExtraComponent.storyName = "额外操作 extra";
ExtraComponent.parameters = parameters(ExtraComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const CurrentDOMComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const open = ref(false);

      const showDrawer = () => {
        open.value = true;
      };

      const onClose = () => {
        open.value = false;
      };

      return {
        open,
        showDrawer,
        onClose
      }
    },
    template: `
  <div
    :style="{
      height: '200px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #ebedf0',
      borderRadius: '2px',
      padding: '48px',
      textAlign: 'center',
      background: '#fafafa',
    }"
  >
    Render in this
    <div style="margin-top: 16px">
      <Button type="primary" @click="showDrawer">Open</Button>
    </div>
    <Drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :open="open"
      :get-container="false"
      :style="{ position: 'absolute' }"
      @close="onClose"
    >
      <p>Some contents...</p>
    </Drawer>
  </div>
`
  }
};

CurrentDOMComponent.storyName = "渲染在当前 DOM";
CurrentDOMComponent.parameters = parameters(CurrentDOMComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const MultipleComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const open = ref<boolean>(false);

      const childrenDrawer = ref<boolean>(false);

      const showDrawer = () => {
        open.value = true;
      };
      const onClose = () => {
        open.value = false;
      };
      const showChildrenDrawer = () => {
        childrenDrawer.value = true;
      };

      return {
        open,
        childrenDrawer,
        showDrawer,
        onClose,
        showChildrenDrawer
      }
    },
    template: `
  <Button type="primary" @click="showDrawer">Open</Button>
  <Drawer
    v-model:open="open"
    title="Multi-level drawer"
    width="520"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <Button type="primary" @click="showChildrenDrawer">Two-level drawer</Button>
    <Drawer v-model:open="childrenDrawer" title="Two-level Drawer" width="320" :closable="false">
      <Button type="primary" @click="showChildrenDrawer">This is two-level drawer</Button>
    </Drawer>

    <template #footer>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
  </Drawer>
`
  }
};

MultipleComponent.storyName = "多层抽屉 multiple";
MultipleComponent.parameters = parameters(MultipleComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SizeComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const open = ref<boolean>(false);
      const size = ref<DrawerProps['size']>('default');

      const showDrawer = (val: DrawerProps['size']) => {
        size.value = val;
        open.value = true;
      };

      const onClose = () => {
        open.value = false;
      };

      return {
        open,
        size,
        showDrawer,
        onClose
      }
    },
    template: `
  <Button type="primary" style="margin-right: 8px" @click="showDrawer('default')">
    Open Default Size (378px)
  </Button>
  <Button type="primary" @click="showDrawer('large')">Open Large Size (736px)</Button>
  <Drawer title="Basic Drawer" :size="size" :open="open" @close="onClose">
    <template #extra>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
`
  }
};

SizeComponent.storyName = "预设宽度 size";
SizeComponent.parameters = parameters(SizeComponent)