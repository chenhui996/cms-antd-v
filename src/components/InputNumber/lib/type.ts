import type { InputNumberProps } from 'ant-design-vue/lib/input-number'
import type { Slot } from 'vue'

export type ValueType = string | number;

export interface BaseInputNumberProps extends InputNumberProps {
    /** 带标签的 input，设置后置标签 */
    addonAfter?: Slot<any>;
    /** 带标签的 input，设置前置标签 */
    addonBefore?: Slot<any>;
    /** 自动获取焦点 */
    autofocus?: boolean;
    /** 是否显示边框 */
    bordered?: boolean;
    /** 是否显示增减按钮 */
    controls?: boolean;
    /** 是否显示边框 */
    decimalSeparator?: string;
    /** 初始值 */
    defaultValue?: number;
    /** 禁用 */
    disabled?: boolean;
    /** 指定输入框展示值的格式(value, info) */
    formatter?: (value: ValueType, info: { userTyping: boolean; input: string }) => string;
    /** 是否启用键盘快捷行为 */
    keyboard?: boolean;
    /** 最大值 */
    max?: string | number
    /** 最小值 */
    min?: string | number
    /** 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用(displayValue) */
    parser?: (displayValue: string) => number;
    /** 数值精度 */
    precision?: number;
    /** 带有前缀图标的 input */
    prefix?: Slot<any>;
    /** 输入框大小 */
    size?: 'large' | 'middle' | 'small';
    /** 设置校验状态 */
    status?: 'error' | 'warning';
    /** 每次改变步数，可以为小数 */
    step?: number | string;
    /** 字符值模式，开启后支持高精度小数。同时 change 事件将返回 string 类型 */
    stringMode?: boolean;
    /** 自定义上箭头图标 */
    upIcon?: Slot<any>;
    /** 自定义下箭头图标 */
    downIcon?: Slot<any>;
    /** 当前值(v-model) */
    value?: number;
}

export type CSInputNumberProps = InputNumberProps

export interface InputNumberEmits {
    /** 输入框内容变化时的回调 */
    (e: 'change', value: number | string): void
    /** 按下回车的回调 */
    (e: 'pressEnter', event: Event): void
    /** 点击上下箭头的回调 */
    (e: 'step', payload: { value: ValueType, info: { offset: ValueType, type: 'up' | 'down' } }): void
}