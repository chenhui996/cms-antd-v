<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Switch as ASwitch, ConfigProvider } from 'ant-design-vue'
import type { SwitchProps } from 'ant-design-vue/lib/switch'
import useForward from '@/hooks/useForward'
import type { CSSwitchProps, SwitchEmits } from './lib/type'

defineOptions({
  name: 'CSSwitch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSSwitchProps>(), {
  autofocus: false,
  checked: false,
  checkedValue: true,
  disabled: false,
  loading: false,
  size: 'default',
  unCheckedValue: false
})

defineEmits<SwitchEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as SwitchProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-switch')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ASwitch v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template v-if="$slots.checkedChildren" #checkedChildren>
        <slot name="checkedChildren" />
      </template>
      <template v-if="$slots.unCheckedChildren" #unCheckedChildren>
        <slot name="unCheckedChildren" />
      </template>
      <slot />
    </ASwitch>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
