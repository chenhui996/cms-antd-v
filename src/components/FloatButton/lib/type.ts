import type { FloatButtonProps, FloatButtonBadgeProps, FloatButtonGroupProps, BackTopProps } from 'ant-design-vue/lib/float-button/interface'
import type { Slot } from 'vue'

export interface BaseFloatButtonProps extends FloatButtonProps {
  /** 自定义图标 */
  icon?: Slot<any>
  /** 设置按钮描述文本 */
  description?: string
  /** 设置提示信息 */
  tooltip?: string
  /** 设置按钮类型 */
  type?: 'primary' | 'default'
  /** 设置按钮形状 */
  shape?: 'circle' | 'square'
  /** 设置链接地址 */
  href?: string
  /** 设置链接目标 */
  target?: string
  /** 设置徽标属性 */
  badge?: FloatButtonBadgeProps
}

export interface BaseFloatButtonGroupProps extends FloatButtonGroupProps {
  /** 设置包含的 FloatButton 按钮形状 */
  shape?: 'circle' | 'square'
  /** 触发方式（有触发方式为菜单模式） */
  trigger?: 'click' | 'hover'
  /** 受控展开(v-model) */
  open?: boolean | undefined
}

export interface BaseBackTopProps extends BackTopProps {
  /** 回到顶部所需时间（ms） */
  duration?: number
  /** 设置需要监听其滚动事件的元素 */
  target?: () => HTMLElement
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number
  /** 点击按钮的回调函数 */
  onClick?: () => void
}

export type CSFloatButtonProps = BaseFloatButtonProps

export type CSFloatButtonGroupProps = BaseFloatButtonGroupProps

export type CSBackTopProps = BaseBackTopProps

export interface FloatButtonEmits {
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
}

export interface FloatButtonGroupEmits {
  /** 展开收起时的回调 */
  (e: 'openChange', open: boolean): void
}

export interface BackTopEmits {
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
}