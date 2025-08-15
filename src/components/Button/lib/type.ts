import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'

export interface BaseButtonProps extends Omit<ButtonProps, "type"> {
    /** 将按钮宽度调整为其父宽度的选项 */
    block?: boolean;
    /** 设置危险按钮*/
    danger?: boolean
    /** 按钮失效状态 */
    disabled?: boolean
    /** 幽灵属性，使按钮背景透明 */
    ghost?: boolean
    /** 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
    href?: string
    /** 设置 button 原生的 type 值，可选值请参考 HTML 标准 */
    htmlType?: 'submit' | 'button' | 'reset';
    /** 设置按钮的图标类型 */
    icon?: any //v-slot
    /** 设置按钮载入状态 */
    loading?: boolean | { delay: number }
    /** 设置按钮形状 */
    shape?: 'default' | 'circle' | 'round'
    /** 设置按钮大小 */
    size?: 'large' | 'middle' | 'small'
    /** 相当于 a 链接的 target 属性，href 存在时生效 */
    target?: string
    /** 设置按钮类型 */
    type?: 'primary' | 'dashed' | 'link' | 'second' | 'weak' | 'text' | 'text-primary';
    /** 添加样式 */
    style?: Object
    /** 功能码，埋点用 */
    funCode?: string | undefined
}

export type CSButtonProps = BaseButtonProps

export interface ButtonEmits {
    /** 点击事件 */
    (e: 'click', event: MouseEvent): void
    /** 获取焦点 */
    (e: 'focus', event: MouseEvent): void
    /** 移除焦点 */
    (e: 'blur', event: MouseEvent): void
}