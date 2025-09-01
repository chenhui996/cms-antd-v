import type { DividerProps } from 'ant-design-vue/lib/divider'

export interface BaseDividerProps extends DividerProps {
    /** 是否虚线 */
    dashed?: boolean
    /** 分割线标题的位置 */
    orientation?: 'left' | 'right' | 'center'
    /** 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right */
    orientationMargin?: string | number
    /** 文字是否显示为普通正文样式 */
    plain?: boolean
    /** 水平还是垂直类型 */
    type?: 'horizontal' | 'vertical'
}

export type CSDividerProps = BaseDividerProps

export interface DividerEmits { }