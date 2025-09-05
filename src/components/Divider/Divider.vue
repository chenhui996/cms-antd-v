<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Divider as ADivider, ConfigProvider } from 'ant-design-vue'
import type { DividerProps } from 'ant-design-vue/lib/divider'
import useForward from '@/hooks/useForward'
import type { CSDividerProps, DividerEmits } from './lib/type'

defineOptions({
  name: 'CSSwitch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSDividerProps>(), {
  /** 是否虚线 */
  dashed: false,
  /** 分割线标题的位置 */
  orientation: 'center',
  /** 文字是否显示为普通正文样式 */
  plain: false,
  /** 水平还是垂直类型 */
  type: 'horizontal'
})

const emit = defineEmits<DividerEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as DividerProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-divider')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ADivider v-bind="options" :style="mergedStyle" :class="mergedClass">
      <slot />
    </ADivider>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
