import type { SwitchProps } from 'ant-design-vue/lib/switch'
import type { Slot } from 'vue'

export interface BaseSwitchProps extends SwitchProps {
    /** 组件自动获取焦点	 */
    autofocus?: boolean;
    /** 指定当前是否选中*/
    checked?: boolean | string | number
    /** 选中时的内容 */
    checkedChildren?: string | Slot<any>
    /** 选中时的值 */
    checkedValue?: boolean | string | number
    /** 是否禁用 */
    disabled?: boolean;
    /** 加载中的开关 */
    loading?: boolean;
    /** 开关大小，可选值：default small */
    size?: 'default' | 'small'
    /** 非选中时的内容 */
    unCheckedChildren?: string | Slot<any>
    /** 非选中时的值 */
    unCheckedValue?: boolean | string | number
}

export type CSSwitchProps = BaseSwitchProps

export interface SwitchEmits {
    /** 点击事件 */
    (e: 'change', checked: boolean | string | number, event: Event): void
    /** 点击事件 */
    (e: 'click', checked: boolean | string | number, event: Event): void
    /** 获取焦点 */
    (e: 'focus', event: MouseEvent): void
    /** 移除焦点 */
    (e: 'blur', event: MouseEvent): void
}