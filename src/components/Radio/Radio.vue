<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Radio as ARadio, ConfigProvider } from 'ant-design-vue'
import type { RadioProps } from 'ant-design-vue/lib/radio'
import useForward from '@/hooks/useForward'
import type { CSRadioProps, RadioEmits } from './lib/type'

defineOptions({
  name: 'CSRadio',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSRadioProps>(), {
  autofocus: false,
  checked: false,
  disabled: false
})

defineEmits<RadioEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as RadioProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-radio')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ARadio v-bind="options" :style="mergedStyle" :class="mergedClass">
      <slot />
    </ARadio>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
