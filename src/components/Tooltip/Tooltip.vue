<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Tooltip as ATooltip } from 'ant-design-vue'
import type { TooltipProps } from 'ant-design-vue/lib/tooltip'
import useForward from '@/hooks/useForward'
import type { CSTooltipProps, TooltipEmits } from './lib/type'

defineOptions({
  name: 'CSTooltip',
  inheritAttrs: true
})

const props = withDefaults(defineProps<CSTooltipProps>(), {
  arrowPointAtCenter: false,
  arrow: true,
  autoAdjustOverflow: true,
  destroyTooltipOnHide: false,
  getPopupContainer: () => document.body,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  placement: 'top',
  trigger: 'hover',
  open: undefined,
})

const openModel = defineModel<boolean>('open')
const emit = defineEmits<TooltipEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  const {
    'onUpdate:open': _unusedOnUpdateOpen,
    onOpenChange: _unusedOnOpenChange,
    open: _unusedOpen,
    visible: _unusedVisible,
    ...restProps
  } = props

  return {
    ...restProps,
    ...restAttrs
  } as TooltipProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-tooltip')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

// emit -------------------------------------------------------------------------------------------
const handleOpenChange = (open: boolean) => {
  emit('openChange', open)
}
</script>

<template>
  <ATooltip
    v-bind="options"
    :style="mergedStyle"
    :class="mergedClass"
    v-model:open="openModel"
    @openChange="handleOpenChange"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <slot />
  </ATooltip>
</template>

<style lang="less">
@import './styles.less';
</style>
