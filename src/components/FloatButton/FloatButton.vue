<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { FloatButton as AFloatButton, ConfigProvider } from 'ant-design-vue'
import type { FloatButtonProps } from 'ant-design-vue/lib/float-button/interface'
import useForward from '@/hooks/useForward'
import type { CSFloatButtonProps, FloatButtonEmits } from './lib/type'

defineOptions({
  name: 'CSFloatButton',
  // inheritAttrs: false
})

const props = withDefaults(defineProps<CSFloatButtonProps>(), {
  type: 'default',
  shape: 'circle'
})

const emit = defineEmits<FloatButtonEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  
  return {
    ...props,
    ...restAttrs
  } as FloatButtonProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-float-btn')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AFloatButton
      v-bind="options"
      :style="mergedStyle"
      :class="mergedClass"
    >
      <!-- 透传所有 slots -->
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <slot />
    </AFloatButton>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
