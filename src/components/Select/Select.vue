<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed, ref } from 'vue'
import { Select as ASelect, ConfigProvider } from 'ant-design-vue'
import type { SelectProps, DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select'
import useForward from '@/hooks/useForward'
import type { CSSelectProps, SelectEmits } from './lib/type'

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
  open: undefined
})

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

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

const handleChange = (value: SelectValue, option: DefaultOptionType | Array<DefaultOptionType>) => {
  emit('change', value, option)
}

const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const resValue = ref(props.value);
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <ASelect
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
      :popupClassName="popupClassName"
      :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
      :dropdownMenuStyle="dropdownMenuStyle"
      :dropdownRender="dropdownRender"
      :dropdownStyle="dropdownStyle"
      :fieldNames="fieldNames"
      :filterOption="filterOption"
      :filterSort="filterSort"
      :firstActiveValue="firstActiveValue"
      :getPopupContainer="getPopupContainer"
      :labelInValue="labelInValue"
      :listHeight="listHeight"
      :maxTagCount="maxTagCount"
      :maxTagPlaceholder="maxTagPlaceholder"
      :maxTagTextLength="maxTagTextLength"
      :menuItemSelectedIcon="menuItemSelectedIcon"
      :mode="mode"
      :notFoundContent="notFoundContent"
      :option="option"
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
      :suffixIcon="suffixIcon"
      :tagRender="tagRender"
      :tokenSeparators="tokenSeparators"
      :virtual="virtual"
      v-model:value="resValue"
      :loading="loading"
      @change="handleChange"
      @focus="handleFocus"
    >
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
