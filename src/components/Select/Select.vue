<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed, ref, watch } from 'vue'
import { Select as ASelect, ConfigProvider } from 'ant-design-vue'
import { CloseSquareFilled } from '@ant-design/icons-vue'
import type { SelectProps, DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select'
import useForward from '@/hooks/useForward'
import type { CSSelectProps, SelectEmits, RawValueType, LabelInValueType, CSOptionType } from './lib/type'

// ------------------------------------------------------------------------------------------------

defineOptions({
  name: 'CSSelect'
  // inheritAttrs: false
})

const props = withDefaults(defineProps<CSSelectProps>(), {
  allowClear: false,
  autoClearSearchValue: true,
  autofocus: false,
  bordered: true,
  defaultActiveFirstOption: true,
  disabled: false,
  dropdownMatchSelectWidth: true,
  listHeight: 256,
  placement: 'bottomLeft',
  size: 'middle',
  showArrow: true,
  open: undefined,
  virtual: true,
  labelInValue: false,
  // 单选为 true,多选为 false
  showSearch: true,
  placeholder: '请选择...'
})

const resValue = defineModel<SelectValue>('value')
const emit = defineEmits<SelectEmits>()
const attrs = useAttrs()

const resAttrs = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs

  return restAttrs as SelectProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-select')
})

// 下拉框默认 class
const dropdownClass = computed(() => {
  const outClass = props.popupClassName || ''

  return cs('cs-select-dropdown', outClass)
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

// emit -------------------------------------------------------------------------------------------

const handleChange = (value: SelectValue, option: DefaultOptionType | Array<DefaultOptionType>) => {
  let isAllSelected = false

  if (props.mode === 'multiple' || props.mode === 'tags') {
    isAllSelected = props.options?.length === (value as any[])?.length
  }

  emit('change', value, {...option, isAllSelected})
}

const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
}

const handleDeselect = (payload: {
  value: string | string[] | number | number[]
  option: DefaultOptionType | Array<DefaultOptionType>
}) => {
  emit('deselect', payload)
}

const handleDropdownVisibleChange = (open: boolean) => {
  emit('dropdownVisibleChange', open)
}

const handleInputKeyDown = (e: KeyboardEvent) => {
  emit('inputKeyDown', e)
}

const handleSearch = (value: string) => {
  emit('search', value)
}

const handleSelect = (value: RawValueType | LabelInValueType) => {
  emit('select', value)
}

const handleMouseEnter = (e: MouseEvent) => {
  emit('mouseEnter', e)
}

const handleMouseLeave = (e: MouseEvent) => {
  emit('mouseLeave', e)
}

const handlePopupScroll = (e: UIEvent) => {
  emit('popupScroll', e)
}

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

// --------------------------------------------------------------

const aSelectRef = ref()

// 暴露方法给父组件
defineExpose({
  focus: () => aSelectRef.value?.focus(),
  blur: () => aSelectRef.value?.blur()
})
</script>

<template>
  <ASelect
    ref="aSelectRef"
    v-bind="resAttrs"
    :style="mergedStyle"
    :class="mergedClass"
    :open="open"
    :allowClear="allowClear"
    :autoClearSearchValue="autoClearSearchValue"
    :autofocus="autofocus"
    :bordered="bordered"
    :clearIcon="clearIcon"
    :defaultActiveFirstOption="defaultActiveFirstOption"
    :defaultOpen="defaultOpen"
    :disabled="disabled"
    :popupClassName="dropdownClass"
    :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
    :dropdownMenuStyle="dropdownMenuStyle"
    :dropdownStyle="dropdownStyle"
    :fieldNames="fieldNames"
    :filterOption="filterOption"
    :filterSort="filterSort"
    :firstActiveValue="firstActiveValue"
    :getPopupContainer="getPopupContainer"
    :labelInValue="labelInValue"
    :listHeight="listHeight"
    :maxTagCount="maxTagCount"
    :maxTagTextLength="maxTagTextLength"
    :menuItemSelectedIcon="menuItemSelectedIcon"
    :mode="mode"
    :notFoundContent="notFoundContent"
    :optionFilterProp="optionFilterProp"
    :optionLabelProp="optionLabelProp"
    :options="options"
    :placeholder="placeholder"
    :placement="placement"
    :removeIcon="removeIcon"
    :searchValue="searchValue"
    :showArrow="showArrow"
    :showSearch="showSearch"
    :size="size"
    :status="status"
    :tagRender="tagRender"
    :tokenSeparators="tokenSeparators"
    :virtual="virtual"
    v-model:value="resValue"
    :loading="loading"
    @blur="handleBlur"
    @change="handleChange"
    @deselect="(value: any, option: DefaultOptionType | Array<DefaultOptionType>) => handleDeselect({ value, option })"
    @dropdownVisibleChange="handleDropdownVisibleChange"
    @focus="handleFocus"
    @inputKeyDown="handleInputKeyDown"
    @search="handleSearch"
    @select="handleSelect"
    @mouseEnter="handleMouseEnter"
    @mouseLeave="handleMouseLeave"
    @popupScroll="handlePopupScroll"
    @click="handleClick"
  >
    <template v-if="$slots.notFoundContent" #notFoundContent>
      <slot name="notFoundContent" />
    </template>
    <template v-if="$slots.dropdownRender" #dropdownRender="dropdownRenderScope">
      <slot name="dropdownRender" v-bind="dropdownRenderScope" />
    </template>
    <template v-if="$slots.option" #option="optionScope">
      <slot name="option" v-bind="optionScope" />
    </template>
    <template v-if="$slots.tagRender" #tagRender="tagRenderScope">
      <slot name="tagRender" v-bind="tagRenderScope" />
    </template>
    <template v-if="$slots.maxTagPlaceholder" #maxTagPlaceholder="omittedValues">
      <slot name="maxTagPlaceholder" v-bind="omittedValues" />
    </template>

    <template v-if="allowClear" #clearIcon>
      <slot v-if="$slots.clearIcon" name="clearIcon" />
      <div v-else class="cs-select-clear-icon-wrapper">
        <div class="color-block" />
        <CloseSquareFilled class="cs-select-clear-icon" />
      </div>
    </template>

    <template v-if="$slots.placeholder" #placeholder="placeholderScope">
      <slot name="placeholder" v-bind="placeholderScope" />
    </template>
    <template v-if="$slots.removeIcon" #removeIcon="removeIconScope">
      <slot name="removeIcon" v-bind="removeIconScope" />
    </template>
    <template v-if="$slots.suffixIcon" #suffixIcon>
      <slot name="suffixIcon" />
    </template>
    <slot />
  </ASelect>
</template>

<style lang="less">
@import './styles.less';
</style>
