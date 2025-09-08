import type { DrawerProps } from 'ant-design-vue/lib/drawer'
import type { Slot, CSSProperties, VNode } from 'vue'

export interface PushState {
    distance: string | number;
}

export interface BaseDrawerProps extends DrawerProps {
    /** 抽屉展开后是否将焦点切换至其 Dom 节点 */
    autofocus?: boolean;
    /** 可用于设置 Drawer 内容部分的样式 */
    bodyStyle?: CSSProperties;
    /** Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName */
    class?: string;
    /** 是否显示左上角的关闭按钮 */
    closable?: boolean;
    /** 自定义关闭图标 */
    closeIcon?: VNode | Slot<any>;
    /** 可用于设置 Drawer 包裹内容部分的样式 */
    contentWrapperStyle?: CSSProperties;
    /** 关闭时销毁 Drawer 里的子元素 */
    destroyOnClose?: boolean;
    /** 抽屉右上角的操作区域 */
    extra?: VNode | Slot<any>;
    /** 抽屉的页脚 */
    footer?: VNode | Slot<any>;
    /** 抽屉页脚部件的样式 */
    footerStyle?: CSSProperties;
    /** 预渲染 Drawer 内元素 */
    forceRender?: boolean;
    /** 指定 Drawer 挂载的节点，并在容器内展现 */
    getContainer?: string | false | HTMLElement | (() => HTMLElement)
    /** 用于设置 Drawer 头部的样式 */
    headerStyle?: CSSProperties;
    /** 高度, 在 placement 为 top 或 bottom 时使用 */
    height?: string | number;
    /** 是否支持键盘 esc 关闭 */
    keyboard?: boolean;
    /** 是否展示遮罩 */
    mask?: boolean;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** 遮罩样式 */
    maskStyle?: CSSProperties;
    /** 抽屉的方向 */
    placement?: 'top' | 'right' | 'bottom' | 'left';
    /** 用于设置多层 Drawer 的推动行为 */
    push?: any;
    /** 对话框外层容器的类名 */
    rootClassName?: string;
    /** 可用于设置 Drawer 最外层容器的样式，和 style 的区别是作用节点包括 mask */
    rootStyle?: CSSProperties;
    /** 预设抽屉宽度（或高度），default 378px 和 large 736px */
    size?: 'default' | 'large';
    /** 设计 Drawer 容器样式，如果你只需要设置内容部分请使用 bodyStyle */
    style?: CSSProperties;
    /** 标题 */
    title?: string | Slot<any>;
    /** Drawer 是否可见 */
    open?: boolean;
    /** 宽度 */
    width?: string | number;
    /** 设置 Drawer 的 z-index */
    zIndex?: number;
}

export type CSDrawerProps = BaseDrawerProps

export interface DrawerEmits {
    /** 点击遮罩层或左上角叉或取消按钮的回调 */
    (e: 'close', event: Event): void
    /** 切换抽屉时动画结束后的回调 */
    (e: 'afterOpenChange', open: boolean): void
}