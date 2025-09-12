export interface ISelectFormConfig {
  [index: string]: any;
  label?: string;
  type?: string;
  options?: any;
}

export interface ICheckBoxType {
  value: string;
  label: string;
  portfolioType?: string;
  suspended?: string;
  isStar?: number;
  isCheck?: boolean;
}

// 表格行数据
export interface TableRowData {
  [key: string]: any
}

// 响应式状态
/**
 * 筛选参数类型
 * 包含搜索输入和各类筛选条件
 */
export type ParamsType = {
  inputValue: string
  [key: string]: string[] | string
}

// 组件属性
export interface TableSelectProps {
  /** 绑定值 */
  value?: TableRowData[] | (string | number)[]
  /** 绑定值 */
  modelValue?: TableRowData[] | (string | number)[]
  /** 表格数据 */
  tableList: TableRowData[]
  /** 筛选条件 */
  filtersList?: Array<TableRowData>
  /** ID */
  id?: string
  /** 标签键 */
  labelKey?: string
  /** 值键 */
  valueKey?: string
  /** 是否是值键模式 */
  isValueKeyMode?: boolean
  /** 树形配置类型 */
  treeConfigType?: 'children' | 'parent' | ''
  /** 树形配置 */
  treeConfig?: any
  /** Key */
  onlyKey?: string
  /** 是否禁用 */
  disabled?: boolean,
}

export interface TSelectProps {
  modelValue: any[]
  options: any[]
  mode: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}