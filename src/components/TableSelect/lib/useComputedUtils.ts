import { computed } from 'vue'
import { type Ref } from 'vue';
import type { TableRowData } from './types'

// 使用computed属性处理双向绑定，避免递归更新
// 确定当前激活的绑定模式
// 使用props明确指定绑定模式，不再自动推断
export function useValueKeyMode(props: any) {
  return computed(() => !!props.isValueKeyMode)
}

/**
 * 处理选中记录的双向绑定
 * 根据isValueKeyMode决定数据格式：
 * - true: 处理value数组（string|number[]）
 * - false: 处理对象数组（TableRowData[]）
 * @returns 计算属性对象，包含get和set方法
 */
export function useSelectedRecords(props: any, isValueKeyMode: any, emit: any, tableRef: any, originData: Ref<any[]>) {
  return computed({
    get(e: TableRowData[] | (string | number)[] | undefined) {
      if (isValueKeyMode.value) {
        // 将valueKey数组转换为对象数组并去重
        // 由于 props.modelValue 可能是 TableRowData[] 或 (string | number)[]，需要根据类型处理
        let valueKeySet: Set<string | number>
        if (isValueKeyMode.value) {
          valueKeySet = new Set(props.modelValue as (string | number)[])
        } else {
          valueKeySet = new Set(
            (props.modelValue as TableRowData[]).map((item) => item[props.valueKey!])
          )
        }

        return originData.value.filter((item: TableRowData) =>
          valueKeySet.has(item[props.valueKey!])
        )
      }

      return props.modelValue || e || []
    },
    set(value: TableRowData[] | (string | number)[]) {
      if (!value) return

      const valueKeys = value.map((item: any) => item[props.valueKey!])
      if (isValueKeyMode.value) {
        // 将对象数组转换为valueKey数组
        emit('update:modelValue', [...valueKeys])
      } else {
        emit('update:modelValue', [...value])
      }

      emit('change', valueKeys, value)
    }
  })
}