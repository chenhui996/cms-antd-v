<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, watch, computed, defineComponent, useAttrs } from 'vue'
// import { Select } from 'ant-design-vue'
import { Select } from '../Select'
import { Divider } from '../Divider'
import { Button } from '../Button'
import type { TSelectProps } from './lib/types'
import type { SelectValue } from 'ant-design-vue/lib/select'
import type { CSSelectProps } from '../Select/lib/type'

// 定义组件属性
const props = withDefaults(defineProps<TSelectProps>(), {
  // 绑定值（支持v-model）
  modelValue: () => [],
  // 选项数据
  options: () => [],
  // 选择模式（默认多选）
  mode: () => 'multiple'
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'change'])
const attrs = useAttrs()

// 选中值
const selectedValues = ref([...props.modelValue])

// 监听外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    selectedValues.value = [...newVal]
  },
  { deep: true }
)

// 处理选择变化
const handleChange = (value: SelectValue) => {
  selectedValues.value = value as any[]
  emit('update:modelValue', value)
  emit('change', value)
}

// 全选/取消全选
const handleCheckAll = () => {
  // 执行全选
  const allValues = props.options.map((item) => item.value)
  handleChange(allValues)
}

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true
    }
  },
  render() {
    return this.vnodes
  }
})

// 清空选中
const handleClear = () => {
  handleChange([])
}

const resAttrs = computed(() => {
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs

  return {
    ...props,
    ...restAttrs,
    virtual: false
  } as CSSelectProps
})
</script>

<template>
  <Select v-bind="resAttrs" v-model:value="selectedValues" @change="handleChange">
    <template #dropdownRender="{ menuNode: menu }"
      ><!-- 自定义下拉面板 -->
      <div class="select-header">
        <VNodes :vnodes="menu"></VNodes
        ><!-- 原有选项列表 -->
        <Divider style="margin: 5px -4px; width: calc(100% + 8px)" />
        <div class="select-operations">
          <!-- 全选和清空按钮 -->
          <Button type="text" @click.stop="handleClear" :disabled="!selectedValues.length">
            清空
          </Button>
          <Button type="text-primary" @click.stop="handleCheckAll">全选 </Button>
        </div>
      </div>
    </template>
    <slot /><!-- 选项通过插槽传入 -->
  </Select>
</template>

<style>
.select-header {
  width: 100%;
}

.select-operations {
  padding: 3px 8px;
  display: flex;
  justify-content: space-between;
}

.select-operations .cs-btn {
  width: 80px;
}
</style>
