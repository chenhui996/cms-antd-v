<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { FloatButtonGroup as AFloatButtonGroup, ConfigProvider } from 'ant-design-vue'
import type { FloatButtonGroupProps } from 'ant-design-vue/lib/float-button/interface'
import useForward from '@/hooks/useForward'
import type { CSFloatButtonGroupProps, FloatButtonGroupEmits } from './lib/type'

defineOptions({
  name: 'CSFloatButtonGroup'
  // inheritAttrs: false
})

const props = withDefaults(defineProps<CSFloatButtonGroupProps>(), {
  shape: 'circle',
  type: 'default',
  open: undefined  // 明确设置为 undefined，避免 Vue 的自动转换
})

const emit = defineEmits<FloatButtonGroupEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  const { open: _unusedOpen, ...restProps } = props

  console.log('props.trigger:', props.trigger)
  console.log('props.open:', props.open)

  return {
    ...restProps,
    ...restAttrs
  } as FloatButtonGroupProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-float-btn-group')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

console.log('options', options)
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AFloatButtonGroup
      v-bind="props"
      :style="mergedStyle"
      :class="mergedClass"
    >
      <!-- 透传所有 slots -->
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <slot />
    </AFloatButtonGroup>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
