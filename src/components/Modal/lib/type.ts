import type { VueNode } from 'ant-design-vue/lib/_util/type'
import type { ModalProps } from 'ant-design-vue/lib/modal'
import type { CSSProperties, VNode } from 'vue'
import type { ButtonProps } from 'ant-design-vue/lib/button'

export type getContainerFunc = () => HTMLElement;

export interface BaseModalProps extends ModalProps {
    /** Modal 完全关闭后的回调 */
    afterClose?: () => void
    /** Modal body 样式 */
    bodyStyle?: CSSProperties
    /** cancel 按钮 props */
    cancelButtonProps?: ButtonProps
    /** cancel 按钮文字 */
    cancelText?: string | (() => VueNode) | VueNode
    /** 垂直居中展示 Modal */
    centered?: boolean
    /** 是否显示右上角的关闭按钮 */
    closable?: boolean
    /** 自定义关闭图标 */
    closeIcon?: string | (() => VueNode) | VueNode
    /** 确定按钮 loading */
    confirmLoading?: boolean
    /** 关闭时销毁 Modal 里的子元素 */
    destroyOnClose?: boolean
    /** 底部内容，当不需要默认底部按钮时，可以设为 :footer="null" */
    footer?: string | (() => VueNode) | VueNode | null
    /** 强制渲染 Modal */
    forceRender?: boolean
    /** 指定 Modal 挂载的 HTML 节点 */
    getContainer?: string | false | HTMLElement | getContainerFunc | HTMLBodyElement
    /** 是否支持键盘 esc 关闭 */
    keyboard?: boolean
    /** 是否展示遮罩 */
    mask?: boolean
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean
    /** 遮罩样式 */
    maskStyle?: CSSProperties
    /** ok 按钮 props */
    okButtonProps?: ButtonProps
    /** ok 按钮文字 */
    okText?: string | (() => VueNode) | VueNode
    /** ok 按钮类型 */
    okType?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
    /** 标题 */
    title?: string | (() => VueNode) | VueNode
    /** 对话框是否可见 */
    open?: boolean
    /** 宽度 */
    width?: string | number
    /** 对话框外层容器的类名 */
    wrapClassName?: string;
    /** 设置 Modal 的 z-index */
    zIndex?: number
}

export type CSModalProps = BaseModalProps

export interface ModalEmits {
    /** 点击遮罩层或右上角叉或取消按钮的回调 */
    (e: 'cancel', event: Event): void
    /** 点击确定按钮的回调 */
    (e: 'ok', event: Event): void
}

export interface ModalMethodProps {
    /** 弹窗的上下文，一般用于获取全局注册组件、vuex 等内容 */
    appContext?: any
    /** 指定自动获得焦点的按钮 */
    autoFocusButton?: 'ok' | 'cancel' | null
    /** cancel 按钮 props */
    cancelButtonProps?: ButtonProps
    /** 取消按钮文字 */
    cancelText?: string
    /** 垂直居中展示 Modal */
    centered?: boolean
    /** 容器类名 */
    class?: string
    /** 是否显示右上角的关闭按钮 */
    closable?: boolean
    /** 内容 */
    content?: string | VNode | (() => VueNode)
    /** 底部内容，当不需要默认底部按钮时，可以设为 footer: null */
    footer?: string | (() => VueNode) | VueNode | null
    /** 自定义图标（1.14.0 新增） */
    icon?: VNode | (() => VNode)
    /** 是否支持键盘 esc 关闭 */
    keyboard?: boolean
    /** 是否展示遮罩 */
    mask?: boolean
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean
    /** ok 按钮 props */
    okButtonProps?: ButtonProps
    /** 确认按钮文字 */
    okText?: string
    /** 确认按钮类型 */
    okType?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
    /** 标题 */
    title?: string | (() => VueNode) | VueNode
    /** 宽度 */
    width?: string | number
    /** 对话框外层容器的类名 */
    wrapClassName?: string
    /** 设置 Modal 的 z-index */
    zIndex?: number
    /** 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 */
    onCancel?: (close: () => void) => void
    /** 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 */
    onOk?: (close: () => void) => void
}

export interface ModalMethodEmits {}