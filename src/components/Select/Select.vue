<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Select as ASelect, ConfigProvider } from 'ant-design-vue'
import type { SelectProps, DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select'
import useForward from '@/hooks/useForward'
import type { CSSelectProps, SelectEmits } from './lib/type'

defineOptions({
  name: 'CSSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSSelectProps>(), {
  allowClear: false,
  autoClearSearchValue: true,
  autofocus: false,
  bordered: true,
  defaultActiveFirstOption: true,
  disabled: false,
  dropdownMatchSelectWidth: true,
  // fieldNames: { value: 'value', label: 'label', options: 'options' } as any, // ?
  // filterOption: true,
  // getPopupContainer: () => document.body,
  // labelInValue: false,
  listHeight: 256,
  // notFoundContent: 'Not Found',
  // optionFilterProp: 'value',
  placement: 'bottomLeft',
  size: 'middle',
  // virtual: true,
  showArrow: true
})

const emit = defineEmits<SelectEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs
  const { onChange: _unusedOnChange, ...restProps } = props

  console.log('props', props)
  // 处理 getPopupContainer
  let getPopupContainer: any = props.getPopupContainer
  
  if (getPopupContainer && typeof getPopupContainer !== 'function') {
    // 如果是 DOM 元素，包装成函数
    if (getPopupContainer instanceof HTMLElement) {
      getPopupContainer = () => getPopupContainer
    } else {
      getPopupContainer = () => document.body
    }
  } else if (!getPopupContainer) {
    getPopupContainer = () => document.body
  }

  return {
    ...restProps,
    ...restAttrs,
    getPopupContainer
  } as SelectProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-select')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

const handleChange = (value: SelectValue, option: DefaultOptionType | Array<DefaultOptionType>) => {
  emit('change', value, option)
  // props?.onChange?.(value, option)
}
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ASelect v-bind="options" :style="mergedStyle" :class="mergedClass" @change="handleChange">
      <template v-if="$slots.notFoundContent" #notFoundContent="notFoundContentScope">
        <slot name="notFoundContent" v-bind="notFoundContentScope" />
      </template>
      <template v-if="$slots.option" #option="optionScope">
        <slot name="option" v-bind="optionScope" />
      </template>
      <template v-if="$slots.maxTagPlaceholder" #maxTagPlaceholder="maxTagPlaceholderScope">
        <slot name="maxTagPlaceholder" v-bind="maxTagPlaceholderScope" />
      </template>
      <template v-if="$slots.clearIcon" #clearIcon="clearIconScope">
        <slot name="clearIcon" v-bind="clearIconScope" />
      </template>
      <template v-if="$slots.placeholder" #placeholder="placeholderScope">
        <slot name="placeholder" v-bind="placeholderScope" />
      </template>
      <template v-if="$slots.removeIcon" #removeIcon="removeIconScope">
        <slot name="removeIcon" v-bind="removeIconScope" />
      </template>
      <template v-if="$slots.suffixIcon" #suffixIcon="suffixIconScope">
        <slot name="suffixIcon" v-bind="suffixIconScope" />
      </template>
      <template v-if="$slots.tagRender" #tagRender="tagRenderScope">
        <slot name="tagRender" v-bind="tagRenderScope" />
      </template>
      <slot />
    </ASelect>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
