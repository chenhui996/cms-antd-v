<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { InputPassword as AInputPassword, ConfigProvider } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/lib/input'
import useForward from '@/hooks/useForward'
import type { CSInputPasswordProps, InputPasswordEmits } from './lib/type'

defineOptions({
  name: 'CSInputPassword',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSInputPasswordProps>(), {
  bordered: true,
  disabled: false,
  showCount: false,
  type: 'text',
  visible: false,
  visibilityToggle: true
})

defineEmits<InputPasswordEmits>()
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
  return cs('cs-input-password')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AInputPassword v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template v-if="$slots.icon" #icon>
        <slot name="icon"></slot>
      </template>
      <template v-if="$slots.addonBefore" #addonBefore>
        <slot name="addonBefore"></slot>
      </template>
      <template v-if="$slots.addonAfter" #addonAfter>
        <slot name="addonAfter"></slot>
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
      <slot></slot>
    </AInputPassword>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
