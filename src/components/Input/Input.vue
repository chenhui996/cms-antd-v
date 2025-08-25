<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Input as AInput, ConfigProvider } from 'ant-design-vue'
import type { InputProps } from 'ant-design-vue/lib/input'
import useForward from '@/hooks/useForward'
import type { CSInputProps, InputEmits } from './lib/type'
import { getChineseCharLength, truncateToMaxLength } from './lib/chineseCount'

defineOptions({
  name: 'CSInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSInputProps>(), {
  bordered: true,
  disabled: false,
  showCount: false,
  type: 'text',
  openChinese: false
})

const emit = defineEmits<InputEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs

  // console.log(props.maxlength, restAttrs);

  return {
    ...props,
    ...restAttrs
  } as InputProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-input')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

// 处理输入事件，实现中文字符计数限制
const handleInput = (event: Event) => {
  if (props.openChinese && props.maxlength) {
    const target = event.target as HTMLInputElement
    const value = target.value

    // 如果超出长度限制，截断输入
    if (getChineseCharLength(value) > props.maxlength) {
      const truncatedValue = truncateToMaxLength(value, props.maxlength, true)
      // console.log('truncatedValue', truncatedValue)
      
      // 使用 setTimeout 确保在下一个事件循环中执行，避免浏览器优化
      setTimeout(() => {
        target.value = truncatedValue
        // 触发 input 事件，让 antd 知道值已改变
        target.dispatchEvent(new Event('input', { bubbles: true }))
      }, 0)
    }
  }
}
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <AInput v-bind="options" :style="mergedStyle" :class="mergedClass" @input="handleInput">
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
      <slot></slot>
    </AInput>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
