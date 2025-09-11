import type { SelectProps, DefaultOptionType, BaseOptionType, SelectValue } from 'ant-design-vue/lib/select'
import type { OptGroupProps } from 'ant-design-vue/lib/vc-select/OptGroup'
import type { Slot, CSSProperties, VNode } from 'vue'

type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode;
type DropdownObject = {
    menuNode?: VueNode;
    props?: Record<string, any>;
};

export type Key = string | number;
export type RawValueType = string | number;
export interface LabelInValueType {
    label: any;
    originLabel?: any;
    value: RawValueType;
    /** @deprecated `key` is useless since it should always same as `value` */
    key?: Key;
}

export interface BaseSelectProps extends SelectProps {
    /** 支持清除 */
    allowClear?: boolean;
    /** 是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效。*/
    autoClearSearchValue?: boolean
    /** 默认获取焦点 */
    autofocus?: boolean
    /** 是否有边框 */
    bordered?: boolean
    /** 自定义的多选框清空图标 */
    clearIcon?: Node | Slot<any>
    /** 是否默认高亮第一个选项。 */
    defaultActiveFirstOption?: boolean;
    /** 是否默认展开下拉菜单 */
    defaultOpen?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 下拉菜单的 className 属性 */
    popupClassName?: string
    /** 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 */
    dropdownMatchSelectWidth?: boolean | number
    /** dropdown 菜单自定义样式 */
    dropdownMenuStyle?: CSSProperties
    /** 自定义下拉框内容 */
    dropdownRender?: (opt?: DropdownObject) => VNode
    /** 下拉菜单的 style 属性 */
    dropdownStyle?: CSSProperties
    /** 自定义节点 label、value、options 的字段 */
    fieldNames?: {
        value?: string;
        label?: string;
        options?: string;
    }
    /** 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。 */
    filterOption?: boolean | ((inputValue: string, option?: DefaultOptionType) => boolean);
    /** 搜索时对筛选结果项的排序函数, 类似Array.sort里的 compareFunction */
    filterSort?: (optionA: object, optionB: object) => number;
    /** 默认高亮的选项 */
    firstActiveValue?: string | string[]
    /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 */
    getPopupContainer?: (props: any) => HTMLElement;
    /** 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: vNodes, originLabel: any} 的格式, originLabel（3.1） 保持原始类型，如果通过 a-select-option children 构造的节点，该值是是个函数（即 a-select-option 的默认插槽） */
    labelInValue?: boolean
    /** 设置弹窗滚动高度 */
    listHeight?: number
    /** 最多显示多少个 tag */
    maxTagCount?: number
    /** 隐藏 tag 时显示的内容 */
    maxTagPlaceholder?: Slot<any> | ((omittedValues: string[]) => string)
    /** 最大显示的 tag 文本长度 */
    maxTagTextLength?: number
    /** 自定义当前选中的条目图标 */
    menuItemSelectedIcon?: VNode | Slot<any>
    /** 设置 Select 的模式为多选或标签 */
    mode?: "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE"
    /** 当下拉列表为空时显示的内容 */
    notFoundContent?: string | Slot<any>
    /** 是否展开下拉菜单 */
    open?: boolean
    /** 通过 option 插槽，自定义节点 */
    option?: Slot<{ option: { value: string, label: string, disabled?: boolean, key?: string, title?: string } }>
    /** 搜索时过滤对应的 option 属性，不支持 children */
    optionFilterProp?: string
    /** 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。 */
    optionLabelProp?: string
    /** options 数据，如果设置则不需要手动构造 selectOption 节点 */
    options?: DefaultOptionType[]
    /** 选择框默认文字 */
    placeholder?: string | Slot<any>
    /** 选择框弹出的位置 */
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
    /** 自定义的多选框清除图标 */
    removeIcon?: Node | Slot<any>
    /** 控制搜索文本 */
    searchValue?: string
    /** 是否显示下拉小箭头 */
    showArrow?: boolean
    /** 配置是否可搜索 */
    showSearch?: boolean
    /** 选择框大小，可选 large small */
    size?: 'large' | 'small' | 'middle'
    /** 设置校验状态 */
    status?: 'error' | 'warning'
    /** 自定义的选择框后缀图标 */
    suffixIcon?: VNode | Slot<any>
    /** 自定义 tag 内容 render，仅在 mode 为 multiple 或 tags 时生效 */
    tagRender?: Slot<any> | ((props: any) => any)
    /** 自动分词的分隔符，仅在 mode="tags" 时生效 */
    tokenSeparators?: string[]
    // /** 指定当前选中的条目(v-model) */
    value?: SelectValue
    /** 设置 false 时关闭虚拟滚动 */
    virtual?: boolean
    /** 设置是否为加载中状态 */
    loading?: boolean
}

export interface BaseSelectOptionProps extends BaseOptionType {
    /** 是否禁用 */
    disabled?: boolean
    /** Option 器类名 */
    class?: string
    /** 和 value 含义一致。如果 Vue 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 */
    key?: string
    /** 选中该 Option 后，Select 的 title */
    title?: string
    /** 默认根据此属性值进行筛选 */
    value?: string | number
}

export interface BaseSelectOptGroupProps extends OptGroupProps {
    /** Key */
    key?: string
    /** 组名 */
    label?: string | ((h: any) => void) | Slot<any>
}

export type CSSelectProps = BaseSelectProps
export type CSSelectOptionProps = BaseSelectOptionProps
export type CSSelectOptGroupProps = BaseSelectOptGroupProps

export interface CSOptionType extends DefaultOptionType {
    isAllSelected: boolean
  }

export interface SelectEmits {
    /** 失去焦点的时回调 */
    (e: 'blur', event: Event): void
    /** 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数, params: value, option, isAllSelected */
    (e: 'change', value: SelectValue, option: CSOptionType | Array<CSOptionType>): void
    /** 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 */
    (e: 'deselect', payload: { value: string | string[] | number | number[], option: DefaultOptionType | Array<DefaultOptionType> }): void
    /** 展开下拉菜单的回调 */
    (e: 'dropdownVisibleChange', open: boolean): void
    /** 获取焦点 */
    (e: 'focus', event: FocusEvent): void
    /** 键盘按下时回调 */
    (e: 'inputKeyDown', event: KeyboardEvent): void
    /** 文本框值变化时回调 */
    (e: 'search', value: string): void
    /** 被选中时调用，参数为选中项的 value (或 key) 值 */
    (e: 'select', value: RawValueType | LabelInValueType): void
    /** 鼠标移入时回调 */
    (e: 'mouseEnter', event: MouseEvent): void
    /** 鼠标离开时回调 */
    (e: 'mouseLeave', event: MouseEvent): void
    /** 下拉列表滚动时的回调 */
    (e: 'popupScroll', event: UIEvent): void
    /** 点击时回调 */
    (e: 'click', event: MouseEvent): void
}

export interface SelectOptionEmits { }
export interface SelectOptGroupEmits { }