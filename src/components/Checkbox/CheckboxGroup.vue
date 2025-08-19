<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { CheckboxGroup as ACheckboxGroup, ConfigProvider } from 'ant-design-vue'
import type { CheckboxGroupProps } from 'ant-design-vue/lib/checkbox'
import useForward from '@/hooks/useForward'
import type { CSCheckboxGroupProps, CheckboxGroupEmits, OptionItem } from './lib/type'

defineOptions({
  name: 'CSCheckboxGroup',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSCheckboxGroupProps>(), {
  disabled: false
})

defineEmits<CheckboxGroupEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as CheckboxGroupProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-checkbox-group')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ACheckboxGroup v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template v-if="$slots.label" #label="scopeProps">
        <slot name="label" v-bind="scopeProps" />
      </template>
      <slot />
    </ACheckboxGroup>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
