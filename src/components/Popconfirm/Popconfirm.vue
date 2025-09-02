<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import cs from 'classnames'
import { useAttrs, computed } from 'vue'
import { Popconfirm as APopconfirm, ConfigProvider } from 'ant-design-vue'
import type { PopconfirmProps } from 'ant-design-vue/lib/popconfirm'
import useForward from '@/hooks/useForward'
import type { CSPopconfirmProps, PopconfirmEmits } from './lib/type'

defineOptions({
  name: 'CSPopconfirm',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CSPopconfirmProps>(), {
  cancelText: '取消',
  disabled: false,
  okText: '确定',
  okType: 'primary',
  showCancel: true,
  open: undefined
})

const emit = defineEmits<PopconfirmEmits>()
const attrs = useAttrs()

// options 为合并后的 props+attrs（直接 v-bind 用）
const options = computed(() => {
  console.log(attrs.onConfirm)

  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs

  return {
    ...props,
    ...restAttrs
  } as PopconfirmProps
})

console.log(options)

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-popconfirm')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

// const openChange = (bool: boolean) => {
//   emit('openChange', bool)
// }

const confirm = (e: MouseEvent) => {
  console.log('in confirm', e);
  emit('confirm', e)
}

// const cancel = (e: MouseEvent) => {
//   emit('cancel', e)
// }

</script>

<!-- @confirm="confirm" -->
<!-- @openChange="openChange"
@cancel="cancel" -->

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <APopconfirm
      v-bind="options"
      :style="mergedStyle"
      :class="mergedClass"
      @confirm="confirm"
      @cancel="(e) => emit('cancel', e)"
      @openChange="(v) => emit('openChange', v)"
    >
      <template v-if="$slots.cancelButton" #cancelButton>
        <slot name="cancelButton" />
      </template>
      <template v-if="$slots.okButton" #okButton>
        <slot name="okButton" />
      </template>
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>
      <template v-if="$slots.description" #description>
        <slot name="description" />
      </template>
      <slot />
    </APopconfirm>
  </ConfigProvider>
</template>

<style lang="less">
@import './styles.less';
</style>
