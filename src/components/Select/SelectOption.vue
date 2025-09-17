<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { SelectOption as ASelectOption } from 'ant-design-vue'
import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import useForward from '@/hooks/useForward'
import type { CSSelectOptionProps, SelectOptionEmits } from './lib/type'

defineOptions({
  name: 'CSSelectOption',
  inheritAttrs: true
})

const props = withDefaults(defineProps<CSSelectOptionProps>(), {
})

const emit = defineEmits<SelectOptionEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const {
    class: _unusedClass,
    style: _unusedStyle,
    ...restAttrs
  } = attrs

  return {
    ...props,
    ...restAttrs
  } as DefaultOptionType
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-select-option')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ASelectOption
    v-bind="options"
    :style="mergedStyle"
    :class="mergedClass"
  >
    <slot />
  </ASelectOption>
</template>

<style lang="less">
@import './styles.less';
</style>
