<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { SelectOptGroup as ASelectOptGroup } from 'ant-design-vue'
import type { OptGroupProps } from 'ant-design-vue/lib/vc-select/OptGroup'
import useForward from '@/hooks/useForward'
import type { CSSelectOptGroupProps, SelectOptGroupEmits } from './lib/type'

defineOptions({
  name: 'CSSelectOptGroup',
  inheritAttrs: true
})

const props = withDefaults(defineProps<CSSelectOptGroupProps>(), {
})

const emit = defineEmits<SelectOptGroupEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const {
    class: _unusedClass,
    style: _unusedStyle,
    ...restAttrs
  } = attrs

  return {
    ...props,
    ...restAttrs
  } as OptGroupProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-select-opt-group')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ASelectOptGroup
    v-bind="options"
    :style="mergedStyle"
    :class="mergedClass"
  >
    <template v-if="$slots.label" #label="scopeProps">
      <slot name="label" v-bind="scopeProps" />
    </template>
    <slot />
  </ASelectOptGroup>
</template>

<style lang="less">
@import './styles.less';
</style>
