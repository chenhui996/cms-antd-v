<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Spin as ASpin, ConfigProvider } from 'ant-design-vue'
import type { SpinProps } from 'ant-design-vue/lib/spin'
import useForward from '@/hooks/useForward'
import type { CSSpinProps, SpinEmits } from './lib/type'

defineOptions({
  name: 'CSSpin',
  inheritAttrs: true
})

const props = withDefaults(defineProps<CSSpinProps>(), {
  size: 'default',
  spinning: true,
})

const emit = defineEmits<SpinEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as SpinProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-spin')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <!-- <ConfigProvider :wave="{ disabled: false }"> -->
    <ASpin v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template v-if="$slots.indicator" #indicator>
        <slot name="indicator" />
      </template>
      <template v-if="$slots.tip" #tip>
        <slot name="tip" />
      </template>
      <slot />
    </ASpin>
  <!--  </ConfigProvider> -->
</template>

<style lang="less">
@import './styles.less';
</style>
