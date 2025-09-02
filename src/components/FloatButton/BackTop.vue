<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { BackTop as ABackTop, ConfigProvider } from 'ant-design-vue'
import type { BackTopProps } from 'ant-design-vue/lib/float-button/interface'
import useForward from '@/hooks/useForward'
import type { CSBackTopProps, BackTopEmits } from './lib/type'

defineOptions({
  name: 'CSBackTop',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSBackTopProps>(), {
  duration: 450,
  target: () => document.documentElement,
  visibilityHeight: 400,
  onClick: () => {}
})

const emit = defineEmits<BackTopEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  
  return {
    ...props,
    ...restAttrs
  } as BackTopProps
})

// 组件初始化 class
const classes = computed(() => {
  const type = props.type
  const shape = props.shape

  return cs('cs-float-btn-group', {
    [`cs-float-btn-group-${shape}`]: shape
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
    <ABackTop
      v-bind="options"
      :style="mergedStyle"
      :class="mergedClass"
    >
      <!-- 透传所有 slots -->
      <slot />
    </ABackTop>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
