<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAttrs, computed } from 'vue'
import { InputPassword as AInputPassword, ConfigProvider } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/lib/input'
import cs from 'classnames'
import useForward from '@/hooks/useForward'
import type { CSInputPasswordProps, InputPasswordEmits } from './lib/type'

defineOptions({
  name: 'CSInputPassword',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSInputPasswordProps>(), {
  bordered: true,
  disabled: false,
  showCount: false,
  visible: false,
  visibilityToggle: true
})

defineEmits<InputPasswordEmits>()
const attrs = useAttrs()

// 合并 props + attrs
const options = computed(() => {
  const { class: _class, style: _style, iconRender: _iconRender, ...restAttrs } = attrs
  return {
    ...props,
    ...restAttrs
  } as InputProps
})

// 组件 class
const classes = computed(() => cs('cs-input-password'))

// style + class 透传 Hook
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AInputPassword v-bind="options" :style="mergedStyle" :class="mergedClass">
      <template v-if="$slots.icon" #icon>
        <slot name="icon"></slot>
      </template>
      <template v-if="$slots.addonBefore" #addonBefore>
        <slot name="addonBefore"></slot>
      </template>
      <template v-if="$slots.addonAfter" #addonAfter>
        <slot name="addonAfter"></slot>
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
      <template v-if="$slots.iconRender" #iconRender="v">
        <slot name="iconRender" v-bind="{ v }"></slot>
      </template>
      <slot></slot>
    </AInputPassword>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
