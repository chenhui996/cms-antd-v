// import type { PopconfirmProps } from 'ant-design-vue/lib/popconfirm'
import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import type { Slot } from 'vue'

export interface BasePopconfirmProps {
    /** 完全自定义取消按钮	 */
    cancelButton?: Slot
    /** cancel 按钮 props */
    cancelButtonProps?: ButtonProps;
    /** 取消按钮文字 */
    cancelText?: string | Slot
    /** 点击 Popconfirm 子元素是否弹出气泡确认框 */
    disabled?: boolean
    /** 自定义弹出气泡 Icon 图标 */
    icon?: Node;
    /** 完全自定义确认按钮 */
    okButton?: Slot;
    /** ok 按钮 props */
    okButtonProps?: ButtonProps;
    /** 确认按钮文字 */
    okText?: string | Slot
    /** 确认按钮类型 */
    okType?: 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text' | 'danger';
    /** 是否显示取消按钮 */
    showCancel?: boolean;
    /** 确认框的描述 */
    title?: string | number | Slot<any> // ? slot
    /** 确认内容的详细描述 */
    description?: string | number | Slot<any> // ? slot
    /** 是否显示 (v-model) */
    open?: boolean | undefined;
}

export type CSPopconfirmProps = BasePopconfirmProps

export interface PopconfirmEmits { 
    (e: 'cancel', event: MouseEvent): void
    (e: 'confirm', fn: any): void
    (e: 'openChange', open: boolean): void
}