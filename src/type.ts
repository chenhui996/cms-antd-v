import type { Conditional } from '@storybook/core/types'
export interface ArgType {
  /**
   * 参数名称
   */
  name?: string
  /**
   * 参数说明
   */
  description?: string
  /**
   * 参数默认值
   */
  defaultValue?: any
  if?: Conditional
  table?: {
    /**
     * 分类
     */
    category?: string
    disable?: boolean
    subcategory?: string
    defaultValue?: {
      summary?: string
      detail?: string
    }
    /**
     * 参数类型
     */
    type?: {
      summary?: string
      detail?: string
    }
    readonly?: boolean
    [key: string]: any
  }
  [key: string]: any
}

export interface ArgTypes$1 {
  [key: string]: ArgType
}

// -----------------------------------------------------------

