import type { RadioProps, RadioGroupProps, RadioChangeEvent } from 'ant-design-vue/lib/radio'

export interface BaseRadioProps extends RadioProps {
    /** 自动获取焦点 */
    autofocus?: boolean;
    /** 指定当前是否选中(v-model) */
    checked?: boolean;
    /** 禁用 Radio */
    disabled?: boolean;
    /** 根据 value 进行比较，判断是否选中 */
    value?: boolean;
}

export interface BaseRadioGroupProps extends RadioGroupProps {
    /** RadioButton 的风格样式，目前有描边和填色两种风格 */
    buttonStyle?: 'outline' | 'solid';
    /** 禁选所有子单选器 */
    disabled?: boolean;
    /** RadioGroup 下所有 input[type="radio"] 的 name 属性 */
    name?: 'string';
    /** 以配置形式设置子元素 */
    options?: string[] | number[] | Array<{ label: string; value: string; disabled?: boolean }>;
    /** 用于设置 Radio options 类型 */
    optionType?: 'default' | 'button';
    /** 大小，只对按钮样式生效 */
    size?: 'large' | 'default' | 'small';
    /** 用于设置当前选中的值(v-model) */
    value?: any;
}

export type CSRadioProps = BaseRadioProps
export type CSRadioGroupProps = BaseRadioGroupProps

export interface RadioEmits {
    /** 获取焦点 */
    (e: 'focus', event: MouseEvent): void
    /** 移除焦点 */
    (e: 'blur', event: MouseEvent): void
}

export interface RadioGroupEmits {
    /** 选中时触发 */
    (e: 'change', event: RadioChangeEvent): void
    /** 获取焦点 */
    (e: 'focus', event: MouseEvent): void
    /** 移除焦点 */
    (e: 'blur', event: MouseEvent): void
}