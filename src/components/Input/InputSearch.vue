<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed, useSlots, onMounted, h } from 'vue'
import { InputSearch as AInputSearch, ConfigProvider } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/lib/input'
import useForward from '@/hooks/useForward'
import type { CSInputSearchProps, InputSearchEmits } from './lib/type'

// Add type aliases
type KeyboardEvent = globalThis.KeyboardEvent
type ChangeEvent = globalThis.Event
type MouseEvent = globalThis.MouseEvent

defineOptions({
  name: 'CSInputSearch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSInputSearchProps>(), {
  bordered: true,
  disabled: false,
  showCount: false
})

const emit = defineEmits<InputSearchEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs

  return {
    ...props,
    ...restAttrs
  } as InputProps
})

// 组件初始化 class
const classes = computed(() => {
  // 获取是否禁用
  const disabled = props.disabled || attrs.disabled

  return cs('cs-input-search', {
    'cs-input-search-disabled': disabled,
    'cs-input-search-no-border': !props.bordered
  })
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

const handleSearch = (
  value: string,
  event?: KeyboardEvent | MouseEvent | ChangeEvent | undefined
) => {
  emit('search', value, event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handlePressEnter = (event: Event) => {
  emit('pressEnter', event)
}
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AInputSearch
      v-bind="options"
      :style="mergedStyle"
      :class="mergedClass"
      @search="handleSearch"
      @change="handleChange"
      @pressEnter="handlePressEnter"
    >
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
      <template v-if="$slots.enterButton" #enterButton>
        <slot name="enterButton"></slot>
      </template>
      <slot></slot>
    </AInputSearch>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
