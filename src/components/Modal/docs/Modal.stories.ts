import { ref, computed, h, createVNode, watch, watchEffect, type CSSProperties } from 'vue';
import { Modal } from '../index'
import { Button } from '../../Button'
import { Space } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Meta } from '@storybook/vue3';
import { useDraggable } from '@vueuse/core';
import './style.less';

const components = { Modal }

const meta: Meta<typeof Modal> = {
  title: '通用/Modal 模态对话框',
  component: Modal,
  decorators: [
    () => ({
      template: '<div class="storybook-demo cs-modal-demo"><story /></div>',
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

<style>${instance().styles ? instance().styles : ''}
</style>
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

      const showModal = () => {
        open.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        open.value = false;
      };

      return {
        open,
        showModal,
        handleOk
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal</Button>
    <Modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
`
  }
};

Default.storyName = "基本使用 modal";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const CustomFooterComponent = () => {
  return {
    components: {
      ...components,
      Button
    },
    setup() {
      const loading = ref<boolean>(false);
      const open = ref<boolean>(false);

      const showModal = () => {
        open.value = true;
      };

      const handleOk = () => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          open.value = false;
        }, 2000);
      };

      const handleCancel = () => {
        open.value = false;
      };

      return {
        loading,
        open,
        showModal,
        handleOk,
        handleCancel
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal with customized footer</Button>
    <Modal v-model:open="open" title="Title" @ok="handleOk">
      <template #footer>
        <Button key="back" @click="handleCancel">Return</Button>
        <Button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</Button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
`
  }
};

CustomFooterComponent.storyName = "自定义页脚 custom footer";
CustomFooterComponent.parameters = parameters(CustomFooterComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const MethodComponent = () => {
  return {
    components: {
      ...components,
      Button
    },
    setup() {
      const info = () => {
        Modal.info({
          title: 'This is a notification message',
          content: h('div', {}, [
            h('p', 'some messages...some messages...'),
            h('p', 'some messages...some messages...'),
          ]),
          onOk() {
            console.log('ok');
          },
        });
      };
      const success = () => {
        Modal.success({
          title: 'This is a success message',
          content: h('div', {}, [
            h('p', 'some messages...some messages...'),
            h('p', 'some messages...some messages...'),
          ]),
        });
      };

      const error = () => {
        Modal.error({
          title: 'This is an error message',
          content: 'some messages...some messages...',
        });
      };

      const warning = () => {
        Modal.warning({
          title: 'This is a warning message',
          content: 'some messages...some messages...',
        });
      };

      return {
        info,
        success,
        error,
        warning
      }
    },
    template: `
  <Button @click="info">Info</Button>
  <Button @click="success">Success</Button>
  <Button @click="error">Error</Button>
  <Button @click="warning">Warning</Button>
`
  }
};

MethodComponent.storyName = "信息提示 method";
MethodComponent.parameters = parameters(MethodComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const LocaleComponent = () => {
  return {
    components: {
      ...components,
      Button,
      Space,
      ExclamationCircleOutlined
    },
    setup() {

      const open = ref<boolean>(false);

      const showModal = () => {
        open.value = true;
      };
      const hideModal = () => {
        open.value = false;
      };

      const confirm = () => {
        Modal.confirm({
          title: 'Confirm',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Bla bla ...',
          okText: '确认',
          cancelText: '取消',
        });
      };

      return {
        open,
        showModal,
        confirm,
        hideModal
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Modal</Button>
    <Button @click="confirm">Confirm</Button>
    <Modal v-model:open="open" title="Modal" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Modal>
  </div>
`
  }
};

LocaleComponent.storyName = "国际化 locale";
LocaleComponent.parameters = parameters(LocaleComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PositionComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const modal1Visible = ref<boolean>(false);
      const modal2Visible = ref<boolean>(false);

      const setModal1Visible = (open: boolean) => {
        modal1Visible.value = open;
      };

      return {
        modal1Visible,
        modal2Visible,
        setModal1Visible
      }
    },
    template: `
  <div id="components-modal-demo-position">
    <Button type="primary" @click="setModal1Visible(true)">
      Display a modal dialog at 20px to Top
    </Button>
    <Modal
      v-model:open="modal1Visible"
      title="20px to Top"
      style="top: 20px"
      @ok="setModal1Visible(false)"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
    <br />
    <br />
    <Button type="primary" @click="modal2Visible = true">
      Vertically centered modal dialog
    </Button>
    <Modal
      v-model:open="modal2Visible"
      title="Vertically centered modal dialog"
      centered
      @ok="modal2Visible = false"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  </div>
`
  }
};

PositionComponent.storyName = "自定义位置 position";
PositionComponent.parameters = parameters(PositionComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const PromiseComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const showConfirm = () => {
        Modal.confirm({
          title: 'Do you want to delete these items?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'When clicked the OK button, this dialog will be closed after 1 second',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onCancel() { },
        });
      };

      return {
        showConfirm
      }
    },
    template: `
  <Button @click="showConfirm">Confirm</Button>
`
  }
};

PromiseComponent.storyName = "确认对话框(promise)";
PromiseComponent.parameters = parameters(PromiseComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ButtonPropsComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const open = ref<boolean>(false);

      const showModal = () => {
        open.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        open.value = false;
      };

      return {
        open,
        showModal,
        handleOk
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal with customized button props</Button>
    <Modal
      v-model:open="open"
      title="Basic Modal"
      :okButtonProps="{ disabled: true }"
      :cancelButtonProps="{ disabled: true }"
      @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
`
  }
};

ButtonPropsComponent.storyName = "自定义页脚按钮属性 button props";
ButtonPropsComponent.parameters = parameters(ButtonPropsComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const CustomRenderComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const open = ref<boolean>(false);
      const modalTitleRef = ref<HTMLElement | null>(null);
      const showModal = () => {
        open.value = true;
      };
      const { x, y, isDragging } = useDraggable(modalTitleRef);
      const handleOk = (e: MouseEvent) => {
        console.log(e);
        open.value = false;
      };
      const startX = ref<number>(0);
      const startY = ref<number>(0);
      const startedDrag = ref(false);
      const transformX = ref(0);
      const transformY = ref(0);
      const preTransformX = ref(0);
      const preTransformY = ref(0);
      const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
      watch([x, y], () => {
        if (!startedDrag.value) {
          startX.value = x.value;
          startY.value = y.value;
          const bodyRect = document.body.getBoundingClientRect();
          const titleRect = modalTitleRef.value!.getBoundingClientRect();
          dragRect.value.right = bodyRect.width - titleRect.width;
          dragRect.value.bottom = bodyRect.height - titleRect.height;
          preTransformX.value = transformX.value;
          preTransformY.value = transformY.value;
        }
        startedDrag.value = true;
      });
      watch(isDragging, () => {
        if (!isDragging) {
          startedDrag.value = false;
        }
      });

      watchEffect(() => {
        if (startedDrag.value) {
          transformX.value =
            preTransformX.value +
            Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
            startX.value;
          transformY.value =
            preTransformY.value +
            Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
            startY.value;
        }
      });
      const transformStyle = computed<CSSProperties>(() => {
        return {
          transform: `translate(${transformX.value}px, ${transformY.value}px)`,
        };
      });

      return {
        open,
        showModal,
        handleOk,
        modalTitleRef,
        transformStyle
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal</Button>
    <Modal ref="modalRef" v-model:open="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </Modal>
  </div>
`
  }
};

CustomRenderComponent.storyName = "自定义渲染对话框 custom & vueuse";
CustomRenderComponent.parameters = parameters(CustomRenderComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const AsyncCloseComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const modalText = ref<string>('Content of the modal');
      const open = ref<boolean>(false);
      const confirmLoading = ref<boolean>(false);

      const showModal = () => {
        open.value = true;
      };

      const handleOk = () => {
        modalText.value = 'The modal will be closed after two seconds';
        confirmLoading.value = true;
        setTimeout(() => {
          open.value = false;
          confirmLoading.value = false;
        }, 2000);
      };

      return {
        modalText,
        open,
        showModal,
        handleOk,
        confirmLoading
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal with async logic</Button>
    <Modal v-model:open="open" title="Title" :confirmLoading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </Modal>
  </div>
`
  }
};

AsyncCloseComponent.storyName = "异步关闭 asnyc close";
AsyncCloseComponent.parameters = parameters(AsyncCloseComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ConfirmComponent = () => {
  return {
    components: {
      ...components,
      Button,
    },
    setup() {
      const showConfirm = () => {
        Modal.confirm({
          title: 'Do you Want to delete these items?',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      };
      const showDeleteConfirm = () => {
        Modal.confirm({
          title: 'Are you sure delete this task?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };
      const showPropsConfirm = () => {
        Modal.confirm({
          title: 'Are you sure delete this task?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          okButtonProps: {
            disabled: true,
          },
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      function showPromiseConfirm() {
        Modal.confirm({
          title: 'Do you want to delete these items?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'When clicked the OK button, this dialog will be closed after 1 second',
          async onOk() {
            try {
              return await new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              });
            } catch {
              return console.log('Oops errors!');
            }
          },
          onCancel() { },
        });
      }

      return {
        showConfirm,
        showPromiseConfirm,
        showDeleteConfirm,
        showPropsConfirm
      }
    },
    template: `
  <Button @click="showConfirm">Confirm</Button>
  <Button @click="showPromiseConfirm">With promise</Button>
  <Button type="dashed" @click="showDeleteConfirm">Delete</Button>
  <Button type="dashed" @click="showPropsConfirm">With extra props</Button>
`
  }
};

ConfirmComponent.storyName = "确认对话框 confirm";
ConfirmComponent.parameters = parameters(ConfirmComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const UseModalComponent = () => {
  return {
    components: {
      ...components,
      Button,
      Space
    },
    setup() {
      const [modal, contextHolder] = Modal.useModal();

      const showConfirm = () => {
        modal.confirm({
          title: 'Do you Want to delete these items?',
          icon: h(ExclamationCircleOutlined),
          content: h('div', { style: 'color:red;' }, 'Some descriptions'),
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      };
      const showDeleteConfirm = () => {
        modal.confirm({
          title: 'Are you sure delete this task?',
          icon: h(ExclamationCircleOutlined),
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };
      const showPropsConfirm = () => {
        modal.confirm({
          title: 'Are you sure delete this task?',
          icon: h(ExclamationCircleOutlined),
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          okButtonProps: {
            disabled: true,
          },
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      function showPromiseConfirm() {
        modal.confirm({
          title: 'Do you want to delete these items?',
          icon: h(ExclamationCircleOutlined),
          content: 'When clicked the OK button, this dialog will be closed after 1 second',
          async onOk() {
            try {
              return await new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              });
            } catch {
              return console.log('Oops errors!');
            }
          },
          onCancel() { },
        });
      }

      return {
        contextHolder,
        showConfirm,
        showPromiseConfirm,
        showDeleteConfirm,
        showPropsConfirm
      }
    },
    template: `
  <Space wrap>
    <Button @click="showConfirm">Confirm</Button>
    <Button @click="showPromiseConfirm">With promise</Button>
    <Button type="dashed" @click="showDeleteConfirm">Delete</Button>
    <Button type="dashed" @click="showPropsConfirm">With extra props</Button>
    <component :is="contextHolder" />
  </Space>
`
  }
};

UseModalComponent.storyName = "使用 useModal 获取上下文";
UseModalComponent.parameters = parameters(UseModalComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const ControlModalComponent = () => {
  return {
    components: {
      ...components,
      Button
    },
    setup() {
      const countDown = () => {
        let secondsToGo = 5;
        const modal = Modal.success({
          title: 'This is a notification message',
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
        const interval = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `This modal will be destroyed after ${secondsToGo} second.`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          modal.destroy();
        }, secondsToGo * 1000);
      };

      return {
        countDown
      }
    },
    template: `
  <Button @click="countDown">Open modal to close in 5s</Button>
`
  }
};

ControlModalComponent.storyName = "手动更新和移除";
ControlModalComponent.parameters = parameters(ControlModalComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const WidthComponent = () => {
  return {
    components: {
      ...components,
      Button
    },
    setup() {
      const open = ref<boolean>(false);

      const showModal = () => {
        open.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        open.value = false;
      };

      return {
        open,
        showModal,
        handleOk
      }
    },
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal of 1000px width</Button>
    <Modal v-model:open="open" width="1000px" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
`
  }
};

WidthComponent.storyName = "自定义模态的宽度 width";
WidthComponent.parameters = parameters(WidthComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const FullComponent = () => {
  return {
    components: {
      ...components,
      Button
    },
    setup() {
      const open = ref<boolean>(false);

      const showModal = () => {
        open.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        open.value = false;
      };

      return {
        open,
        showModal,
        handleOk
      }
    },
    styles: `
    .full-modal {
      .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
      }
      .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
      }
      .ant-modal-body {
        flex: 1;
      }
    }
    `,
    template: `
  <div>
    <Button type="primary" @click="showModal">Open Modal</Button>
    <Modal
      v-model:open="open"
      title="Basic Modal"
      width="100%"
      wrapClassName="full-modal"
      @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </div>
`
  }
};

FullComponent.storyName = "全屏 full";
FullComponent.parameters = parameters(FullComponent)