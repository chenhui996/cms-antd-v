import type { SpinProps } from 'ant-design-vue/lib/spin'
import type { Slot } from 'vue'

export interface BaseSpinProps extends SpinProps {
    /** 延迟显示加载效果的时间（防止闪烁）	 */
    delay?: number;
    /** 加载指示符 */
    indicator?: Node | Slot
    /** 组件大小，可选值为 small default large */
    size?: 'small' | 'default' | 'large'
    /** 是否为加载中状态 */
    spinning?: boolean
    /** 当作为包裹元素时，可以自定义描述文案 */
    tip?: string | Slot;
    /** 包装器的类属性 */
    wrapperClassName?: string;
}

export type CSSpinProps = BaseSpinProps

export interface SpinEmits { }