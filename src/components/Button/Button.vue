<template>
  <a-button v-bind="$attrs" :block="block" :danger="danger" :disabled="disabled" :ghost="ghost" :href="href"
    :htmlType="htmlType" :loading="loading" :shape="shape" :size="size" :target="target" :type="type"
    @click="handleClick" @focus="handleFocus" @blur="handleBlur" :style="Object.assign({ margin: '4px' }, style)"
    :funCode="funCode">
    <template #icon>
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </a-button>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue'
import 'ant-design-vue/dist/reset.css'
import { Button as AButton } from 'ant-design-vue'
import type { ButtonHTMLType } from 'ant-design-vue/lib/button/buttonTypes'

defineOptions({
  name: 'CSButton',
})

withDefaults(
  defineProps<{
    /**
     * 将按钮宽度调整为其父宽度的选项
     */
    block?: boolean
    /**
     * 设置危险按钮
     */
    danger?: boolean
    /**
     * 按钮失效状态
     */
    disabled?: boolean
    /**
     * 幽灵属性，使按钮背景透明
     */
    ghost?: boolean
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href?: string
    /**
     * 设置 button 原生的 type 值，可选值请参考 HTML 标准
     */
    htmlType?: ButtonHTMLType
    /**
     * 	设置按钮的图标类型
     */
    icon?: any //v-slot
    /**
     * 设置按钮载入状态
     */
    loading?: boolean | { delay: number }
    /**
     * 设置按钮形状
     */
    shape?: 'default' | 'circle' | 'round'
    /**
     * 	设置按钮大小
     */
    size?: 'large' | 'middle' | 'small'
    /**
     * 	相当于 a 链接的 target 属性，href 存在时生效
     */
    target?: string
    /**
     * 	设置按钮类型
     */
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
    /**
     * 添加样式
     */
    style?: Object
    /**
     * 功能码，埋点用
     */
    funCode?: string | undefined
  }>(),
  {
    block: false,
    danger: false,
    disabled: false,
    ghost: false,
    loading: false,
    shape: 'default',
    size: 'middle',
    type: 'default',
    htmlType: 'button'
  }
)
const emit = defineEmits<{
  /**
   * 点击事件
   */
  (e: 'click', event: any): void
  /**
   * 获取焦点方法
   */
  (e: 'focus', event: any): void
  /**
   * 失去焦点方法
   */
  (e: 'blur', event: any): void
}>()

const handleClick = (args: any) => {
  emit('click', args)
}
const handleFocus = (args: any) => {
  emit('focus', args)
}
const handleBlur = (args: any) => {
  emit('blur', args)
}
</script>
<style lang="less">
.ant-btn-secoundPrimary {
  background-color: @btnSecoundPrimary;
  color: @btnSecoundColor;
  border-color: @btnSecoundPrimaryBorder;
  border-width: 1px;

  &:hover {
    background-color: @btnSecoundPrimaryHover;
    border-color: @btnSecoundPrimaryBorderHover;
  }

  &:active {
    background-color: @btnSecoundPrimaryActive;
    border-color: @btnSecoundPrimaryBorderActive;
  }
}

.ant-btn.ant-btn-dashed.ant-btn-background-ghost {
  border-color: @btnDashBorder;
  color: @btnDashColor;

  &:hover {
    background-color: @btnDashHover;
    border-color: @btnSecoundPrimaryBorderHover;
    color: @btnDashColorHover;
  }

  &:active {
    background-color: @btnSecoundPrimaryActive;
    border-color: @btnDashBorderActive;
    color: @btnDashBorderActive;
  }
}

.ant-btn-ghost {
  background-color: @btnGhost;
  color: @btnGhostColor;
  border-color: 0;
  border-width: 0;

  &:hover {
    background-color: @btnGhostHoverColor;
  }

  &:active {
    background-color: @btnGhostActiveColor;
  }

  &.ant-btn-dangerous {
    color: var(--antd-danger-text-color);

    &:hover {
      background-color: var(--antd-danger-hover-bg-color);
      color: var(--antd-danger-hover-text-color);
      border-color: var(--antd-danger-hover-bg-color);
    }

    &:active {
      background-color: var(--antd-danger-hover-bg-color);
      border-color: var(--antd-danger-hover-bg-color);
      color: var(--antd-danger-active-text-color);
    }

    .ant-wave {
      --wave-color: rgb(231, 86, 92) !important;
    }
  }
}

.ant-btn-weak {
  background-color: @btnWeak;
  color: @btnWeakColor;
  border-color: @btnWeakBorderColor;
  border-width: 1px;

  &:hover {
    border-color: @btnWeakHoverColor;
    color: @btnWeakHoverColor;
  }

  &:active {
    border-color: @btnWeakBorderActiveColor;
    color: @btnWeakActiveColor;
  }
}

.ant-btn[disabled]:not(.ant-btn-ghost) {
  color: #bfbfbf !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;

  &:hover {
    color: #bfbfbf;
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }

  &:active {
    color: #bfbfbf;
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }
}

.ant-btn[disabled] {
  cursor: not-allowed;
}

.ant-btn.ant-btn-ghost[disabled] {
  color: #bfbfbf;
  background-color: transparent;
  border-color: #d9d9d9;

  &:hover {
    color: #bfbfbf;
    background-color: transparent;
    border-color: #d9d9d9;
  }
}

.ant-btn.ant-btn-ghost.ant-btn-dangerous[disabled] {
  color: #bfbfbf;
  background-color: transparent;
  border-color: #d9d9d9;

  &:hover {
    color: #bfbfbf;
    background-color: transparent;
    border-color: #d9d9d9;
  }
}
</style>
