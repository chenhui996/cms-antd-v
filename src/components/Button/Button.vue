<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { withDefaults, defineProps, defineEmits, useAttrs, computed } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import useForward from '@/hooks/useForward'
import type { CSButtonProps, ButtonEmits } from './lib/type'

defineOptions({
  name: 'CSButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSButtonProps>(), {
  block: false,
  danger: false,
  disabled: false,
  ghost: false,
  loading: false,
  shape: 'default',
  size: 'middle',
  htmlType: 'button',
  type: 'primary'
})

defineEmits<ButtonEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as ButtonProps
})

// 组件初始化 class
const classes = computed(() => {
  const type = props.type
  return cs('cs-btn', {
    [`cs-btn-${type}`]: type
  })
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <AButton v-bind="options" :style="mergedStyle" :class="mergedClass">
    <template #icon>
      <slot name="icon" />
    </template>
    <slot />
  </AButton>
</template>

<style scoped lang="less">
@import './styles.less';
</style>
