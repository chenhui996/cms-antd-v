<template>
  <!-- 投组选择器卡片容器 -->
  <div ref="querySelectContainerRef" class="query-select-container">
    <!-- 主选择器组件 -->
    <a-select
      mode="multiple"
      width="100%"
      v-model:value="(selectedRecords as SelectValue)"
      :open="open"
      @click="handleFocus"
      @popupVisibleChange="handlePopupVisibleChange"
      @select-change="handleSelectChange"
      @clear="clearAll"
      :filter-option="false"
      :dropdownMatchSelectWidth="false"
      size="middle"
      :max-tag-count="1"
      placeholder="请选择投组"
      :dropdown-style="{ minWidth: '600px' }"
      class="select-container"
      popup-class-name="ctableSelect"
      :disabled="disabled"
    >
      <template #tagRender>
        <template v-if="selectedRecords.length !== totalLength">
          <span
            class="ant-select-selection-item"
            :title="(selectedRecords as TableRowData[])[0][labelKey]"
          >
            <span class="ant-select-selection-item-content">{{
              (selectedRecords as TableRowData[])[0][labelKey]
            }}</span>
          </span>
        </template>
      </template>
      <template #maxTagPlaceholder>
        <template v-if="selectedRecords.length === totalLength">全部</template>
        <template v-else>+{{ selectedRecords.length - 1 }}</template>
      </template>

      <!-- 自定义下拉面板内容 -->
      <template #dropdownRender>
        <div ref="querySelectRef" class="query-select-content" tabindex="-1">
          <div class="left-content">
            <!-- 查询表单 -->
            <a-form ref="formRef" class="searchFrom" :model="params" name="querySelect">
              <a-form-item label="搜索投组" name="inputValue" :rules="[{ required: false }]">
                <a-input
                  :allow-clear="true"
                  placeholder="请输入"
                  ref="searchRef"
                  v-model:value="params.inputValue"
                  @change="handleFilterChange()"
                />
              </a-form-item>
              <template v-if="filtersList && filtersList.length > 0">
                <a-form-item v-for="item in filtersList" :label="item.name" :key="item.key">
                  <t-select
                    ref="typeListRef"
                    :max-tag-count="1"
                    mode="multiple"
                    allow-clear
                    show-arrow
                    placeholder="请选择"
                    :options="item.options"
                    :is-all-editor="true"
                    v-model="params[item.key]"
                    @change="handleFilterChange()"
                  >
                  </t-select>
                </a-form-item>
              </template>
            </a-form>

            <!-- 投组列表 -->
            <div
              ref="boxContainerRef"
              class="box-content"
              :style="`height: calc(100% - ${filtersList.length * 34 + 33}px) !important;`"
            >
              <span
                style="
                  position: absolute;
                  right: 0;
                  color: #000;
                  z-index: 1;
                  right: 15px;
                  color: #bfbfbf;
                  font-size: 12px;
                  line-height: 40px;
                "
                >点亮星号组内置顶</span
              >
              <VxeTable
                ref="tableRef"
                :cell-config="{ height: 32 }"
                :header-cell-config="{
                  height: 40
                }"
                :class="isTree ? 'treeTable' : ''"
                height="100%"
                :border="'none'"
                :column-config="{ resizable: false }"
                :virtual-y-config="{
                  enabled: true,
                  gt: 100
                  // bufferSize: 50,
                  // estimateSize: 36
                }"
                :show-header="true"
                :data="tableData"
                :row-config="{
                  keyField: onlyKey,
                  isHover: true
                }"
                :checkbox-config="{
                  // 移除类型注解，避免解析错误
                  reserve: true,
                  checkRowKeys: isValueKeyMode
                    ? props.modelValue
                    : selectedRecords.map((item: any) => item[props.valueKey])
                }"
                @checkbox-all="selectAllTable"
                @checkbox-change="selectChange"
                :tree-config="treeConfig"
                :sort-config="sortConfig"
                @sort-change="handleSortChange"
              >
                <VxeColumn
                  type="checkbox"
                  tree-node
                  title="全选"
                  :field="labelKey"
                  showOverflow="title"
                  show-header-overflow
                >
                  <template #default="{ row }"
                    ><span style="color: #1f1f1f" :title="row[labelKey]">{{ row[labelKey] }}</span>
                  </template>
                </VxeColumn>
                <VxeColumn
                  field="save"
                  width="30"
                  :col-span="2"
                  sortable
                  show-overflow
                  show-header-overflow
                >
                  <template #default="{ row }">
                    <template v-if="row[valueKey] && !String(row[valueKey]).startsWith('row_')">
                      <StarFilled
                        @click.stop="toggleFavorite(row)"
                        :style="{ color: '#ffc53d', cursor: 'pointer' }"
                        v-if="isFavorite(row[onlyKey])"
                      />
                      <span v-else class="delete">
                        <StarOutlined
                          :style="{ color: '#8c8c8c', cursor: 'pointer' }"
                          @click.stop="toggleFavorite(row)"
                        ></StarOutlined>
                      </span>
                    </template>
                  </template>
                </VxeColumn>
                <!-- <VxeColumn :field="labelKey" title="全选" tree-node sortable>
                  <template #default="{ row }"
                    ><div :title="row[labelKey]">{{ row[labelKey] }}</div>
                  </template>
                </VxeColumn> -->
              </VxeTable>
            </div>
          </div>

          <div style="height: 100%; width: 1px; margin: 0; background: #f0f0f0" />
          <!-- 已选投组区域 -->
          <div ref="rightBoxContainer" class="right-content" :style="{ width: '50%' }">
            <div class="right-bottom">
              <div>
                <span>已选择投组( {{ selectedRecords.length || 0 }})</span>
              </div>
              <div>
                <Button class="tableGhose" type="text" @click="clearAll">清空全部</Button>
              </div>
            </div>
            <div ref="rightBoxContent" class="right-top">
              <div style="height: calc(100% - 5px)">
                <VxeTable
                  ref="tableRef2"
                  :class="isTree ? 'treeTable' : ''"
                  :cell-config="{ height: 32 }"
                  :column-config="{ resizable: false }"
                  :virtual-y-config="{ enabled: true, gt: 0 }"
                  :row-config="{ isHover: true }"
                  height="100%"
                  :border="'none'"
                  :show-header="false"
                  :data="tableData2"
                  :tree-config="treeConfig"
                >
                  <VxeColumn
                    :field="labelKey"
                    tree-node
                    title="Name"
                    show-overflow
                    show-header-overflow
                  >
                    <template #default="{ row }">
                      <div :title="row[labelKey]" style="font-weight: 500">
                        {{ row[labelKey] }}
                      </div>
                    </template>
                  </VxeColumn>
                  <VxeColumn
                    field="DE"
                    title="删除"
                    width="40"
                    align="right"
                    show-overflow
                    show-header-overflow
                  >
                    <template #default="e">
                      <template v-if="e.row[valueKey]">
                        <CloseOutlined class="delete" @click="deleteItem(e)" />
                      </template>
                    </template>
                  </VxeColumn>
                </VxeTable>
              </div>
            </div>
          </div>
        </div>
      </template>
    </a-select>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
// 导入组件
import {
  Select as ASelect,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput
} from 'ant-design-vue'
import { ref, nextTick, computed, onUnmounted, watch, onMounted, reactive, type Ref } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import { StarFilled, CloseOutlined, StarOutlined } from '@ant-design/icons-vue'
import { VxeTable, VxeColumn, type VxeTableInstance } from 'vxe-table'
import { cloneDeep, debounce } from 'lodash'
import {
  treeToFlatWithoutId,
  findParentsInFlatTree,
  convertToTree,
  flattenRecords,
  countLastLevelNodes,
  initFavorites,
  handleClosedSelect,
  matchesSearch,
  initIDB,
  saveFavorites
} from './lib/utils'
import { Button } from '../Button'
import TSelect from './TSelect.vue'
import { useValueKeyMode, useSelectedRecords } from './lib/useComputedUtils'
import type { ParamsType, TableRowData, TableSelectProps } from './lib/types'

// ----------------------------------------------------------------------------------------------------

const props = withDefaults(defineProps<TableSelectProps>(), {
  labelKey: () => 'label',
  valueKey: () => 'value',
  modelValue: () => [],
  // 为满足可能为 null 值的需求，通过类型断言解决类型不匹配问题
  // 为解决类型不匹配问题，将默认值改为空数组
  tableList: () => [],
  filtersList: () => [],
  id: () => 'default',
  treeConfigType: '',
  onlyKey: () => 'value',
  disabled: false,
  treeConfig: () => {
    return {
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children',
      indent: '10'
    }
  }
}) // 组件属性
const emit = defineEmits(['update:modelValue', 'change']) // 定义事件发射器
defineExpose({})
const tableRef2 = ref(null) // 已选投组表格
const searchRef = ref() // 搜索输入框
const params = reactive<ParamsType>({
  typeList: [] as string[],
  sourceList: [] as string[],
  inputValue: ''
}) // 筛选参数
const open = ref(false) // 控制下拉面板显示状态
const querySelectRef = ref<HTMLElement | null>(null)
const tableRef = ref<VxeTableInstance>()
let originData: Ref<any[]> = ref([]) // 保存一份原数据
const tableData = ref<TableRowData[]>([]) // 投组列表数据

// 设置默认排序
const sortConfig: any = ref({
  defaultSort: {
    field: 'save',
    order: 'asc'
  },
  sortMethod({ data }: {data: TableRowData[]}) {
    // 取出第一个排序的列
    console.log('sort')
    // 递归排序函数
    function sortTreeNodes(nodes: TableRowData[]): TableRowData[] {
      if (!nodes || nodes.length === 0) return []

      let sortedNodes = [...nodes]

      // 先对当前层级的节点进行排序

      sortedNodes = sortedNodes.sort((a, b) => {
        let aT = isFavorite.value(a[props.onlyKey])
        let bT = isFavorite.value(b[props.onlyKey])
        if (aT && !bT) {
          return -1
        } else if (!aT && bT) {
          return 1
        } else {
          return 1
        }
      })

      // 递归排序每个节点的子节点
      sortedNodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          node.children = sortTreeNodes(node.children)
        }
      })

      return sortedNodes
    }

    // 开始递归排序
    return sortTreeNodes(data)
  }
})

const treeConfig = computed(() => {
  if (props.treeConfigType && props.treeConfig) {
    const t = {
      ...props.treeConfig,
      transform: true,
      expandAll: true
    }
    return t
  }

  return null
})

// 投组列表数据
const totalLength = computed(() => {
  if (props.treeConfigType) {
    return countLastLevelNodes(originData.value)
  }

  return props.tableList.length
})

const isValueKeyMode = useValueKeyMode(props) // 是否是valueKey模式

const tableData2 = ref<TableRowData[]>([]) // 已选投组列表数据

const selectedData: any = ref(null) // 已选投组数据

/**
 * IndexedDB工具类
 * 用于管理投组收藏状态的持久化存储
 * 支持收藏数据的读取、保存和数据库连接管理
 */
const idb = initIDB(props)

// 响应式收藏状态存储
const favorites = reactive(new Map())

// 计算属性辅助访问收藏状态
const isFavorite = computed(() => (value: { toString: () => any }) => favorites.get(String(value)))

/**
 * 处理选中记录的双向绑定
 * @returns 计算属性对象，包含get和set方法
 */
const selectedRecords = useSelectedRecords(props, isValueKeyMode, emit, tableRef, originData)

// 页面卸载前保存数据
const handleBeforeUnload = () => saveFavorites(Object.fromEntries(favorites.entries()), idb)
window.addEventListener('beforeunload', handleBeforeUnload)

/**
 * 判断是否是树形结构
 */
const isTree = computed(() => {
  const ids = new Set(originData.value.map((item: any) => item[props.treeConfig.rowField]))
  const hasParentChild = originData.value.some((item: any) =>
    ids.has(item[props.treeConfig.parentField])
  )
  return hasParentChild
})

// ----------------------------------------------------------------------------------------------------

/**
 * 处理下拉面板显示状态变更
 * @param visible - 面板可见状态
 */
const handlePopupVisibleChange = (visible: boolean) => {
  open.value = visible
  if (visible) {
    // 打开
    initFavorites(idb, favorites)
  }
}

/**
 * 处理选择项变更事件
 * 保持下拉面板打开并更新选中状态
 * @param params - 选择变更参数
 */
// 为参数 params 显式指定类型，避免隐式 any 类型
const handleSelectChange = (params: { selectedKeys?: (string | number)[] }) => {
  const selectedKeys = params.selectedKeys?.filter((item) => item) || []
  if (isValueKeyMode.value) {
    emit('update:modelValue', [...selectedKeys])
  } else {
    // 在对象模式下，需要从表格数据中找到对应的完整对象
    const selectedRows = tableData.value.filter(
      (row) => row[props.valueKey] && selectedKeys.includes(row[props.valueKey])
    )
    emit('update:modelValue', [...selectedRows])
  }
  open.value = true
}

/**
 * 点击空白区域关闭下拉面板 闭包函数
 * @param e - 鼠标事件对象
 */
const closedSelect = (e: MouseEvent) => handleClosedSelect(e, querySelectRef, open, closedSelect)

/**
 * 处理选择器获取焦点事件
 * 打开下拉面板并监听点击事件以关闭面板
 */
const handleFocus = async () => {
  open.value = true
  await initFavorites(idb, favorites)
  nextTick(() => {
    setTimeout(() => {
      searchRef.value && searchRef.value.focus()
    }, 200)
    document.addEventListener('click', closedSelect, { capture: true })
  })
}

/**
 * 处理筛选条件变更
 * 使用防抖优化频繁筛选操作（300ms延迟）
 * 根据搜索输入和筛选条件过滤投组数据
 * 300ms防抖延迟
 */
 const handleFilterChange = debounce(async () => {
  const { inputValue } = params
  console.log(inputValue)
  const filteredData = originData.value.filter((item) => {
    // 类型筛选
    let flag = true
    props.filtersList.forEach((filter) => {
      if (filter.allowNull && !item[filter.key]) {
        flag = true
      } else if (
        params[filter.key as string] &&
        params[filter.key as string].length > 0 &&
        !params[filter.key as string].includes(item[filter.key as string])
      ) {
        flag = false
      }
    })
    if (inputValue) {
      const searchMatch = matchesSearch(item as TableRowData, inputValue, props)
      if (searchMatch) {
        return Boolean(item[props.valueKey])
      }
      return flag && searchMatch
    } else {
      return flag
    }
  })
  // 保留收藏状态
  const filterData = Object.freeze(filteredData.map(({ isFavorite, ...item }) => item))
  // 由于 filterData 是只读数组，而 loadData 方法需要可变数组，这里使用扩展运算符创建一个新的可变数组
  // tableRef.value?.loadData([...filterData]);

  tableData.value = findParentsInFlatTree(originData.value, filterData, props.treeConfig) as TableRowData[]
  nextTick(() => {
    tableRef.value?.clearCheckboxRow()
    tableRef.value?.setCheckboxRow(selectedRecords.value, true)
    tableRef.value?.setAllTreeExpand(true)
  })
}, 300) // 300ms防抖延迟

/**
 * 切换投组收藏状态
 * @param row - 投组数据行
 */
const toggleFavorite = async (row: TableRowData) => {
  const rowData = row
  const key = String(rowData[props.onlyKey])
  const currentValue = favorites.get(key) || false
  favorites.set(key, !currentValue)
  await saveFavorites(Object.fromEntries(favorites.entries()), idb)
  tableRef.value?.setSort({ field: 'save', order: 'asc' }, true)
}

// 保存收藏状态
const saveFav = () => {
  saveFavorites(Object.fromEntries(favorites.entries()), idb)
}

/**
 * 处理选择项变更事件
 * 保持下拉面板打开并更新选中状态
 * @param params - 选择变更参数
 */
 const selectChange = ({ row, checked }: any) => {
  // 递归处理树形结构选中状态
  if (row.children && row.children.length > 0) {
    if (checked) {
      const result: TableRowData[] = []
      const leafRecords = flattenRecords(row.children, true)
      leafRecords.forEach((item: any) => {
        if (isValueKeyMode.value) {
          // value Array return 
          if (!props.modelValue.includes(item[props.valueKey])) {
            result.push(item)
          }
        } else {
          const selectValueArrs = selectedRecords.value.map((item: any) => item[props.valueKey])
          if (!selectValueArrs.includes(item[props.valueKey])) {
            result.push(item)
          }
        }

      })
      selectedRecords.value = [...selectedRecords.value, ...result] as TableRowData[]
    } else {
      const ids = row.children.map((map: any) => map[props.onlyKey])
      selectedRecords.value = selectedRecords.value.filter((item: any) => !ids.includes(item[props.onlyKey])) as TableRowData[]
    }
  } else {
    if (!checked) {
      selectedRecords.value = selectedRecords.value.filter((item: any) => item[props.onlyKey] !== row[props.onlyKey]) as TableRowData[]
    } else {
      selectedRecords.value = [...selectedRecords.value, row]
    }
  }
}

/**
 * 删除已选投组
 * 根据绑定模式更新不同格式的双向绑定数据
 * @param e - 包含行索引和行数据的事件对象
 */
 const deleteItem = (e: { rowIndex: number; row: TableRowData }) => {
  const { row } = e
  if (isValueKeyMode.value) {
    // 为了避免隐式的 'any' 类型错误，明确指定 selectedRecords.value[rowIndex] 的类型为 TableRowData
    const keyToDelete = row[props.valueKey!]
    const index = props.modelValue.indexOf(keyToDelete)
    if (index !== -1) {
      const newModelValue = [...props.modelValue]
      newModelValue.splice(index, 1)
      emit('update:modelValue', newModelValue)
    }
  } else {
    const _index = selectedRecords.value.findIndex((item: any) => item[props.valueKey] === row[props.valueKey!])
    selectedRecords.value.splice(_index, 1)
    tableData2.value = findParentsInFlatTree(originData.value, selectedRecords.value, props.treeConfig) as TableRowData[]
    nextTick(() => {
      (tableRef2.value as any)?.setAllTreeExpand(true)
    })
    emit('update:modelValue', selectedRecords.value)
  }
  tableRef.value?.setCheckboxRow(row, false)
}

/**
 * 清空所有已选投组
 * 同步更新双向绑定数据并清除表格选中状态
 */
const clearAll = () => {
  emit('update:modelValue', [])
  tableRef.value?.clearCheckboxRow()
}

/**
 * 处理表格全选事件
 * 根据选中状态更新所有投组的选择状态
 * @param e - 包含选中状态和记录的事件对象
 */
const selectAllTable = (e: {
  checked: boolean
  records: Array<{ label: string; value: string | number }>
}) => {
  console.log(e)
  // 全选时获取所有数据并过滤出叶子节点
  const allRecords: any = tableRef.value?.getFullData()
  // 应用flattenRecords处理以只保留叶子节点
  const leafRecords = flattenRecords(allRecords, true)
  if (e.checked) {
    const ids = selectedRecords.value.map((item: any) => item[props.onlyKey])
    // tableRef.value?.setCheckboxRow(leafRecords, e.checked)
    const result = leafRecords.filter((item) => !ids.includes(item[props.onlyKey]))
    selectedRecords.value = [...selectedRecords.value, ...result] as TableRowData[]
  } else {
    // tableRef.value?.setCheckboxRow(leafRecords, e.checked)
    const ids = leafRecords.map((item) => item[props.onlyKey])
    const result = selectedRecords.value.filter((item: any) => !ids.includes(item[props.onlyKey]))
    selectedRecords.value = [...result] as TableRowData[]
  }
  // 同步更新表格复选框状态
  // tableRef.value?.setAllCheckboxRow(e.checked)
}

const handleSortChange = ({
  column,
  property,
  order
}: {
  column: any
  property: any
  order: any
}) => {
  // console.log(order, property, column)
  return -1
}

// ----------------------------------------------------------------------------------------------------

/**
 * 组件卸载时清理
 * 关闭数据库连接并移除全局事件监听器
 */
onUnmounted(() => {
  window.removeEventListener('beforeunload', saveFav)
  document.removeEventListener('click', closedSelect)
})

/**
 * 组件挂载时初始化
 * 加载收藏状态并设置初始复选框选中状态
 */
onMounted(async () => {
  await initFavorites(idb, favorites)
  // 初始化复选框状态
  if (tableRef.value && selectedRecords.value.length) {
    selectedRecords.value.forEach((item) => {
      if (tableRef.value) {
        tableRef.value.setCheckboxRow(item, true)
      }
    })
  }
})

onUnmounted(() => {
  idb.closeDB()
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// 组件挂载时初始化复选框状态
onMounted(() => {
  // 使用箭头函数包装以传递当前favorites值
  // 修复 'value' 属性不存在于 'Reactive<Map<any, any>>' 类型的问题，使用 Object.fromEntries 转换 Map 为对象
  window.addEventListener('beforeunload', saveFav)
  if (tableRef.value && selectedRecords.value.length) {
    selectedRecords.value.forEach((item) => {
      if (tableRef.value) {
        tableRef.value.setCheckboxRow(item, true)
      }
    })
  }
})

// ----------------------------------------------------------------------------------------------------

/**
 * 监听投组列表变化
 * 根据树形配置类型构建平铺树或直接使用原数据
 * 更新投组列表数据
 */
watch(
  () => props.tableList,
  () => {
    if (props.treeConfigType === 'children') {
      // childRen 需先构建成平铺树，保持统一
      originData.value = treeToFlatWithoutId(props.tableList, props.treeConfig)
      // console.log(tableData.value)
    } else {
      // 保存一份原数据，childRe
      originData.value = cloneDeep(props.tableList)
    }
    tableData.value = cloneDeep(originData.value)
  },
  { immediate: true }
)

/**
 * 监听已选投组变化
 * 根据选中状态更新已选投组列表数据
 */
 watch(
  () => selectedRecords.value,
  (n, o) => {
    if ((n && n.length === 0) || !n) {
      selectedData.value = []
      tableRef.value?.clearCheckboxRow()
    } else {

      tableRef.value?.clearCheckboxRow()
      tableRef.value?.setCheckboxRow(n, true)
    }
    // console.log(selectedData.value)
    tableData2.value = findParentsInFlatTree(originData.value, n, props.treeConfig) as TableRowData[]
    nextTick(() => {
      (tableRef2.value as any)?.setAllTreeExpand(true)
    })
  },
  { immediate: true }
)

// ----------------------------------------------------------------------------------------------------
</script>

<style lang="less" scoped>
@import './styles.less';
</style>
