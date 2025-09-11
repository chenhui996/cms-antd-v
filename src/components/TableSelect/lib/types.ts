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
  value?: TableRowData[] | (string | number)[]
  modelValue?: TableRowData[] | (string | number)[]
  tableList: TableRowData[]
  filtersList?: Array<TableRowData>
  id?: string
  labelKey?: string
  valueKey?: string
  isValueKeyMode?: boolean
  treeConfigType?: 'children' | 'parent' | ''
  treeConfig?: any
  onlyKey?: string
  disabled?: boolean,
}

export interface TSelectProps {
  modelValue: any[]
  options: any[]
  mode: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}