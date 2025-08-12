/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

/** useForward 的输入参数类型 */
export interface UseForwardOptions {
    /** 额外固定样式（优先级最低） */
    initStyle?: Record<string, any>
    /** 额外固定 class（优先级最低） */
    initClass?: any
}

/** useForward 返回值类型 */
export interface UseForwardReturn<TProps> {
    /** 合并后的 props+attrs（直接 v-bind 用） */
    bind: ComputedRef<TProps & Record<string, any>>
    /** 合并后的样式对象 */
    mergedStyle: ComputedRef<Record<string, any>>
    /** 合并后的 class（数组形式） */
    mergedClass: ComputedRef<any[]>
}


/**
 * 合并 props 与 attrs，实现类似 React {...props} 的透传效果
 * @param props 已声明的 props
 * @param attrs 未声明的属性（来自 useAttrs()）
 * @param options 额外的样式和 class
 */
function useForward<TProps extends Record<string, any>>(
    props: TProps,
    attrs: Record<string, any>,
    options: UseForwardOptions = {}
): UseForwardReturn<TProps> {
    // 合并 props + attrs（直接给 v-bind 用）
    const bind = computed(() => ({
        ...props,
        ...attrs,
    }))

    // 合并 style
    const mergedStyle = computed(() => {
        const incoming = attrs.style
        let base: Record<string, any> = {}

        // 处理 style 是对象的情况
        if (typeof incoming === 'object' && incoming !== null && !Array.isArray(incoming)) {
            base = incoming
        }

        return Object.assign({}, options.initStyle, base)
    })

    // 合并 class（保持数组形式方便 Vue 处理）
    const mergedClass = computed(() => {
        return Array.isArray(attrs.class)
            ? [...options.initClass, ...attrs.class]
            : [...options.initClass, attrs.class]
    })

    return { bind, mergedStyle, mergedClass }
}

export default useForward

