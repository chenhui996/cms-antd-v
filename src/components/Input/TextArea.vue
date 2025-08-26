<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Textarea as ATextarea, ConfigProvider } from 'ant-design-vue'
import type { TextAreaProps } from 'ant-design-vue/lib/input'
import useForward from '@/hooks/useForward'
import type { CSTextAreaProps, TextAreaEmits } from './lib/type'

defineOptions({
  name: 'CSTextarea',
})

const props = withDefaults(defineProps<Omit<TextAreaProps, 'autosize'>>(), {
  bordered: true,
  disabled: false,
  showCount: false,
  type: 'text',
  // autoSize: false
})

defineEmits<TextAreaEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as Omit<TextAreaProps, 'autosize'>
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-textarea')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ATextarea v-bind="options" :style="mergedStyle" :class="mergedClass">
      <slot></slot>
    </ATextarea>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
