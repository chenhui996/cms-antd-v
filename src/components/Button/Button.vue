<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { withDefaults, defineProps, defineEmits, useAttrs, computed, ref, watch } from 'vue'
import { Button as AButton, ConfigProvider } from 'ant-design-vue'
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
const waveDisabled = ref(false)

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
  console.log('props', props)

  const type = props.type

  return cs('cs-btn', {
    [`cs-btn-${type}`]: type
  })
})

// 若 type 为 ghost，则 waveDisabled 为 true
watch(
  () => props.ghost,
  (newVal) => {
    // console.log('newVal', newVal);
    // if (newVal) waveDisabled.value = true
  },
  {
    immediate: true
  }
)

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: waveDisabled }">
    <AButton v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template #icon>
        <slot name="icon" />
      </template>
      <slot />
    </AButton>
  </ConfigProvider>
</template>

<style scoped lang="less">
@import './styles.less';
</style>
