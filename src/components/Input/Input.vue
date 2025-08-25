<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed, ref, watch } from 'vue'
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

// 当前输入值，用于计算字符计数
const currentValue = ref('')

// 监听 value 变化
watch(
  () => props.value,
  (newValue) => {
    // 先检查值是否合法
    if (props.openChinese && props.maxlength && newValue) {
      const chineseLength = getChineseCharLength(newValue)
      if (chineseLength > props.maxlength) {
        // 值不合法，直接截断并更新，不触发使用者的 watch
        const truncatedValue = truncateToMaxLength(newValue, props.maxlength, true)
        currentValue.value = truncatedValue
        emit('update:value', truncatedValue)
        return
      }
    }

    // 值合法时才更新
    currentValue.value = newValue || ''
  },
  { immediate: true }
)

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, type: _unusedType, ...restAttrs } = attrs

  // 当 openChinese 开启时，禁用 antd 默认的 showCount
  const finalShowCount = props.openChinese ? false : props.showCount

  return {
    ...props,
    ...restAttrs,
    showCount: finalShowCount
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
  const target = event.target as HTMLInputElement
  const value = target.value

  // 更新当前值
  currentValue.value = value

  if (props.openChinese && props.maxlength) {
    // 如果超出长度限制，截断输入
    if (getChineseCharLength(value) > props.maxlength) {
      const truncatedValue = truncateToMaxLength(value, props.maxlength, true)
      // console.log('truncatedValue', truncatedValue)

      // 使用 setTimeout 确保在下一个事件循环中执行，避免浏览器优化
      setTimeout(() => {
        target.value = truncatedValue
        currentValue.value = truncatedValue
        // 触发 input 事件，让 antd 知道值已改变
        target.dispatchEvent(new Event('input', { bubbles: true }))
      }, 0)
    }
  }
}

// 计算中文字符计数显示
const chineseCountDisplay = computed(() => {
  if (!props.openChinese || !props.showCount) return null

  const currentLength = getChineseCharLength(currentValue.value)
  const maxLength = props.maxlength || 0

  if (maxLength > 0) {
    return `${currentLength} / ${maxLength}`
  }

  return `${currentLength}`
})
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
      <template #suffix>
        <slot name="suffix"></slot>
        <!-- 自定义中文字符计数显示 -->
        <span v-if="chineseCountDisplay" class="cs-input-chinese-count">
          {{ chineseCountDisplay }}
        </span>
      </template>

      <slot></slot>
    </AInput>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
