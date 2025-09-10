<template>
  <a-select
    v-bind="$attrs"
    v-model:value="selectedValues"
    :options="options"
    :mode="mode"
    @change="handleChange"
    :virtual="false"
  >
    <!-- 自定义下拉面板 -->
    <template #dropdownRender="{ menuNode: menu }">
      <div class="select-header">
        <!-- 原有选项列表 -->

        <v-nodes :vnodes="menu"></v-nodes
        ><!-- 全选和清空按钮 -->
        <a-divider style="margin: 5px 0" />
        <div class="select-operations">
          <Button
            type="ghost"
            size="small"
            @click.stop="handleClear"
            :disabled="!selectedValues.length"
          >
            清空
          </Button>
          <Button type="secoundPrimary" size="small" @click.stop="handleCheckAll">全选 </Button>
        </div>
      </div>
    </template>

    <!-- 选项通过插槽传入 -->
    <slot />
  </a-select>
</template>

<script setup>
import { ref, watch, computed, defineComponent } from 'vue'
import { Select as ASelect, Divider as ADivider } from 'ant-design-vue'
import Button from '../Button/Button.vue'

// 定义组件属性
const props = defineProps({
  // 绑定值（支持v-model）
  modelValue: {
    type: Array,
    default: () => []
  },
  // 选项数据
  options: {
    type: Array,
    required: true,
    description: '选项数组，格式: [{ value, label }, ...]'
  },
  // 选择模式（默认多选）
  mode: {
    type: String,
    default: 'multiple',
    validator: (val) => ['multiple', 'tags'].includes(val)
  }
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'change'])

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

// 计算是否全选
const isAllSelected = computed(() => {
  return props.options.length > 0 && selectedValues.value.length === props.options.length
})

// 处理选择变化
const handleChange = (values) => {
  selectedValues.value = values
  emit('update:modelValue', values)
  emit('change', values)
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
</script>

<style scoped>
.select-header {
  width: 100%;
}

.select-operations {
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
}

/* 调整按钮样式 */
:deep(.ant-btn-text) {
  padding: 0 8px;
  height: auto;
  line-height: 1.5;
}
</style>