<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { InputGroup as AInputGroup, ConfigProvider } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/lib/input'
import useForward from '@/hooks/useForward'
import type { CSInputGroupProps, InputGroupEmits } from './lib/type'

defineOptions({
  name: 'CSInputGroup',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSInputGroupProps>(), {
  compact: false,
  size: 'default',
})

defineEmits<InputGroupEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as InputProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-input-group')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AInputGroup v-bind="options" :style="mergedStyle" :class="mergedClass">
      <slot></slot>
    </AInputGroup>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
