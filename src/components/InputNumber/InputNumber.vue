<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed, ref, watch } from 'vue'
import { InputNumber as AInputNumber, ConfigProvider } from 'ant-design-vue'
import type { InputNumberProps } from 'ant-design-vue/lib/input-number'
import useForward from '@/hooks/useForward'
import type { CSInputNumberProps, InputNumberEmits, ValueType } from './lib/type'

defineOptions({
  name: 'CSInputNumber',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSInputNumberProps>(), {
  autofocus: false,
  bordered: true,
  controls: true,
  disabled: false,
  keyboard: true,
  max: Infinity,
  min: -Infinity,
  step: 1,
  stringMode: false
})

const emit = defineEmits<InputNumberEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as InputNumberProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-input-number', {
    'cs-input-number-no-bordered': !props.bordered,
    'cs-input-number-disabled': props.disabled
  })
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AInputNumber v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template v-if="$slots.addonAfter" #addonAfter>
        <slot name="addonAfter"></slot>
      </template>
      <template v-if="$slots.addonBefore" #addonBefore>
        <slot name="addonBefore"></slot>
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.upIcon" #upIcon>
        <slot name="upIcon"></slot>
      </template>
      <template v-if="$slots.downIcon" #downIcon>
        <slot name="downIcon"></slot>
      </template>
      <slot></slot>
    </AInputNumber>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
