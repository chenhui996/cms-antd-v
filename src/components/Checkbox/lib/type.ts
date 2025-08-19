import type { CheckboxProps, CheckboxGroupProps } from 'ant-design-vue/lib/checkbox'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface';

export interface BaseCheckboxProps extends CheckboxProps {
    /** 自动获取焦点 */
    autofocus?: boolean;
    /** 指定当前是否选中(v-model) */
    checked?: boolean;
    /** 禁用 Radio */
    disabled?: boolean;
    /** 设置 indeterminate 状态，只负责样式控制 */
    indeterminate?: boolean;
    /** 根据 value 进行比较，判断是否选中 */
    value?: boolean | string | number;
}

export interface BaseCheckboxGroupProps extends CheckboxGroupProps {
    /** 整组失效 */
    disabled?: boolean;
    /** CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 */
    name?: string;
    /** 指定可选项，可以通过 slot="label" slot-scope="option" 定制label */
    options?: string[] | Array<{ label: string; value: string; disabled?: boolean, indeterminate?: boolean, onChange?: (e: CheckboxChangeEvent) => void }>
    /** 用于设置当前选中的值(v-model) */
    value?: (boolean | string | number)[];
}

export type CSCheckboxProps = BaseCheckboxProps
export type CSCheckboxGroupProps = BaseCheckboxGroupProps

export interface CheckboxEmits {
    /** 变化时回调函数 */
    (e: 'change', event: Event): void
    /** 获取焦点 */
    (e: 'focus', event: MouseEvent): void
    /** 移除焦点 */
    (e: 'blur', event: MouseEvent): void
}

export interface CheckboxGroupEmits {
    /** 变化时回调函数 */
    (e: 'change', val: (boolean | string | number)[]): void
    /** 获取焦点 */
    (e: 'focus', event: MouseEvent): void
    /** 移除焦点 */
    (e: 'blur', event: MouseEvent): void
}

export interface OptionItem {
    label: string
    value: string
    disabled?: boolean
    indeterminate?: boolean
    onChange?: (e: CheckboxChangeEvent) => void
}