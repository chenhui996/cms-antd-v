import type { InputProps, TextAreaProps } from 'ant-design-vue/lib/input'
import type { Slot } from 'vue'

export interface BaseInputProps extends InputProps {
    /** 带标签的 input，设置后置标签 */
    addonAfter?: string | Slot<any>
    /** 带标签的 input，设置前置标签 */
    addonBefore?: string | Slot<any>
    /** 可以点击清除图标删除内容 */
    allowClear?: boolean
    /** 是否有边框 */
    bordered?: boolean
    /** 自定义清除图标 （allowClear 为 true 时生效） */
    clearIcon?: Slot<any>
    /** 输入框默认内容 */
    defaultValue?: string
    /** 是否禁用状态，默认为 false */
    disabled?: boolean
    /** 输入框的 id */
    id?: string
    /** 最大长度 */
    maxlength?: number
    /** 开启中文字符计数（中文字符占用2字符） */
    openChinese?: boolean
    /** 带有前缀图标的 input */
    prefix?: string | Slot<any>
    /** 是否展示字数 */
    showCount?: boolean
    /** 设置校验状态 */
    status?: 'error' | 'warning'
    /** 控件大小。注：标准表单内的输入框大小限制为 middle。可选 large middle small */
    size?: 'large' | 'middle' | 'small'
    /** 带有后缀图标的 input */
    suffix?: string | Slot<any>
    /** 声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 <a-textarea /> 代替 type="textarea")。 */
    type?:
    | 'number'
    | 'reset'
    | 'submit'
    | 'button'
    | 'time'
    | 'image'
    | 'text'
    | 'search'
    | 'hidden'
    | 'color'
    | 'checkbox'
    | 'radio'
    | 'range'
    | 'date'
    | 'url'
    | 'email'
    | 'week'
    | 'month'
    | 'datetime-local'
    | 'file'
    | 'password'
    | 'tel'
    /** 输入框内容(v-model) */
    value?: string
}

export interface BaseTextAreaProps extends TextAreaProps {
    /** 可以点击清除图标删除内容 */
    allowClear?: boolean
    /** 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 } */
    autosize?: boolean | object
    /** 输入框默认内容 */
    defaultValue?: string
    /** 是否展示字数 */
    showCount?: boolean
    /** 输入框内容 */
    value?: string
}

export interface BaseInputGroupProps {
    /** 可以点击清除图标删除内容 */
    compact?: boolean
    /** Input.Group 中所有的 Input 的大小，可选 large default small */
    size?: 'large' | 'default' | 'small'
}

export interface BaseInputPasswordProps extends InputProps {
    /** 密码是否可见 */
    visible?: boolean
    // /** 自定义切换按钮 */
    // iconRender?: Slot<any>
    /** 是否显示切换按钮或者控制密码显隐 */
    visibilityToggle?: boolean
}

export type CSInputProps = BaseInputProps
export type CSTextAreaProps = BaseTextAreaProps
export type CSInputSearchProps = BaseInputProps
export type CSInputGroupProps = BaseInputGroupProps
export type CSInputPasswordProps = BaseInputPasswordProps

export interface InputEmits {
    /** 输入框内容变化时的回调 */
    (e: 'change', event: any): void
    /** 按下回车的回调 */
    (e: 'pressEnter', event: any): void
    /** v-model 更新事件 */
    (e: 'update:value', value: string): void
}

export interface TextAreaEmits {
    /** 按下回车的回调 */
    (e: 'pressEnter', event: any): void
}

export interface InputSearchEmits extends InputEmits {
    /** 点击搜索或按下回车键时的回调 */
    (e: 'search', value: any, event: any): void
}

export interface InputGroupEmits extends InputEmits { }

export interface InputPasswordEmits extends InputEmits { }
