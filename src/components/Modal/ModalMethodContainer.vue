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
import type { ModalMethodProps, ModalMethodEmits } from './lib/type'

defineOptions({
  name: 'CSModalMethodContainer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<ModalMethodProps>(), {
  autoFocusButton: 'ok',
  cancelText: '取消',
  centered: false,
  closable: false,
  keyboard: true,
  mask: true,
  maskClosable: true,
  okText: '确定',
  okType: 'primary',
  width: 416,
  zIndex: 1000,
})

const emit = defineEmits<ModalMethodEmits>()
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

</script>

<template>
  <AModal
    v-bind="options"
    :style="mergedStyle"
    :class="mergedClass"
  >
    <slot />
  </AModal>
</template>

<style lang="less">
@import './styles.less';
</style>
