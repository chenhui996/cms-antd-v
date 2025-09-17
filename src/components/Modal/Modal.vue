<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import {
  useAttrs,
  computed
  // useSlots
} from 'vue'
import { Modal as AModal } from 'ant-design-vue'
import type { ModalProps } from 'ant-design-vue/lib/modal'
import useForward from '@/hooks/useForward'
import type { CSModalProps, ModalEmits } from './lib/type'

defineOptions({
  name: 'CSModal',
  inheritAttrs: true
})

const props = withDefaults(defineProps<CSModalProps>(), {
  cancelText: '取消',
  centered: false,
  closable: true,
  destroyOnClose: false,
  forceRender: false,
  getContainer: undefined,
  keyboard: true,
  mask: true,
  maskClosable: true,
  okText: '确定',
  okType: 'primary',
  width: 520,
  open: undefined,
  zIndex: 1000,
  footer: undefined,
  title: undefined
})

const openModel = defineModel<boolean>('open')
const emit = defineEmits<ModalEmits>()
const attrs = useAttrs()
// const slots = useSlots()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  // 从 attrs 也把 footer 拿出来（父组件可能通过 attrs 传入）
  const {
    class: _unusedClass,
    style: _unusedStyle,
    footer: _attrsFooter,
    ...restAttrs
  } = attrs as Record<string, any>

  // 从 props 把 footer 拿出来，剩下的放到 restProps
  const {
    'onUpdate:open': _unusedOnUpdateOpen,
    onCancel: _unusedOnCancel,
    onOk: _unusedOnOk,
    open: _unusedOpen,
    visible: _unusedVisible,
    footer: _propsFooter,
    ...restProps
  } = props as unknown as Record<string, any>

  return {
    ...restProps,
    ...restAttrs
  } as ModalProps
})

// 组件初始化 class
const classes = computed(() => cs('cs-modal'))

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

// emit -------------------------------------------------------------------------------------------
const handleCancel = (e: Event) => {
  emit('cancel', e)
}
const handleOk = (e: Event) => {
  emit('ok', e)
}
</script>

<template>
  <AModal
    v-bind="options"
    :style="mergedStyle"
    :class="mergedClass"
    v-model:open="openModel"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.closeIcon" #closeIcon>
      <slot name="closeIcon" />
    </template>
    <template v-if="$slots.okText" #okText>
      <slot name="okText" />
    </template>
    <template v-if="$slots.cancelText" #cancelText>
      <slot name="cancelText" />
    </template>
    <template v-if="$slots.modalRender" #modalRender="{ originVNode }">
      <slot name="modalRender" :originVNode="originVNode" />
    </template>
    <slot />
  </AModal>
</template>

<style lang="less">
@import './styles.less';
</style>
