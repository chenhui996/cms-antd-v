<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { withDefaults, useAttrs, computed } from 'vue'
import { Checkbox as ACheckbox, ConfigProvider } from 'ant-design-vue'
import type { CheckboxProps } from 'ant-design-vue/lib/checkbox'
import useForward from '@/hooks/useForward'
import type { CSCheckboxProps, CheckboxEmits } from './lib/type'

defineOptions({
  name: 'CSCheckbox',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSCheckboxProps>(), {
  autofocus: false,
  checked: false,
  disabled: false
})

defineEmits<CheckboxEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as CheckboxProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-checkbox')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ACheckbox v-bind="options" :style="mergedStyle" :class="mergedClass">
      <slot />
    </ACheckbox>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
