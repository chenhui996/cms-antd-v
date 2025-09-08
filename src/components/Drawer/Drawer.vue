<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Drawer as ADrawer } from 'ant-design-vue'
import type { DrawerProps } from 'ant-design-vue/lib/drawer'
import useForward from '@/hooks/useForward'
import type { CSDrawerProps, DrawerEmits } from './lib/type'

defineOptions({
  name: 'CSDrawer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSDrawerProps>(), {
  autofocus: true,
  closable: true,
  destroyOnClose: false,
  forceRender: false,
  getContainer: 'body',
  height: 378,
  keyboard: true,
  mask: true,
  maskClosable: true,
  placement: 'right',
  push: { distance: 180 },
  size: 'default',
  zIndex: 1000
})

const openModel = defineModel<boolean>('open')
const emit = defineEmits<DrawerEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const {
    class: _unusedClass,
    style: _unusedStyle,
    ...restAttrs
  } = attrs
  const {
    'onUpdate:open': _unusedOnUpdateOpen,
    onAfterOpenChange: _unusedOnAfterOpenChange,
    onClose: _unusedOnClose,
    open: _unusedOpen,
    ...restProps
  } = props

  return {
    ...restProps,
    ...restAttrs
  } as DrawerProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-drawer')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

// emit -------------------------------------------------------------------------------------------
const handleClose = (e: Event) => {
  emit('close', e)
}
const handleAfterOpenChange = (open: boolean) => {
  emit('afterOpenChange', open)
}
</script>

<template>
  <ADrawer
    v-bind="options"
    :style="mergedStyle"
    :class="mergedClass"
    v-model:open="openModel"
    @close="handleClose"
    @afterOpenChange="handleAfterOpenChange"
  >
    <template #extra v-if="$slots.extra">
      <slot name="extra" />
    </template>
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
    <template #title v-if="$slots.title">
      <slot name="title" />
    </template>
    <template #closeIcon v-if="$slots.closeIcon">
      <slot name="closeIcon" />
    </template>
    <slot />
  </ADrawer>
</template>

<style lang="less">
@import './styles.less';
</style>
