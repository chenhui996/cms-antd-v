import type { TooltipProps } from 'ant-design-vue/lib/tooltip'
import type { AlignType } from 'ant-design-vue/lib/vc-trigger/interface'
import type { CSSProperties } from 'vue'

export interface BaseTooltipProps extends TooltipProps {
    /** 该值将合并到 placement 的配置中，设置参考 dom-align */
    align?: AlignType
    /** 箭头是否指向目标元素中心 */
    arrowPointAtCenter?: boolean
    /** 修改箭头的显示状态以及修改箭头是否指向目标元素中心 */
    arrow?: boolean | { pointAtCenter: boolean }
    /** 气泡被遮挡时自动调整位置 */
    autoAdjustOverflow?: boolean
    /** 背景颜色 */
    color?: string
    /** 隐藏后是否销毁 tooltip */
    destroyTooltipOnHide?: boolean
    /** 浮层渲染父节点，默认渲染到 body 上 */
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
    /** 鼠标移入后延时多少才显示 Tooltip，单位：秒 */
    mouseEnterDelay?: number
    /** 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 */
    mouseLeaveDelay?: number
    /** 卡片类名 */
    overlayClassName?: string
    /** 卡片样式 */
    overlayStyle?: CSSProperties
    /** 卡片内容区域样式 */
    overlayInnerStyle?: CSSProperties
    /** 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom */
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
    /** 触发行为，可选 hover/focus/click/contextmenu */
    trigger?: 'hover' | 'focus' | 'click' | 'contextmenu'
    /** 用于手动控制浮层显隐 */
    open?: boolean
}

export type CSTooltipProps = BaseTooltipProps

export interface TooltipEmits {
    /** 显示隐藏的回调 */
    (e: 'openChange', open: boolean): void
}