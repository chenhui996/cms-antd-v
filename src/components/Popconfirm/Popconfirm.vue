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
  const { class: _unusedClass, style: _unusedStyle, ...restAttrs } = attrs

  return {
    ...props,
    ...restAttrs
  } as PopconfirmProps
})

// 组件初始化 class
const classes = computed(() => {
  return cs('cs-popconfirm')
})

// 使用通用透传 Hook 合并 style 和 class
const { mergedStyle, mergedClass } = useForward(props, attrs, {
  initStyle: {},
  initClass: [classes.value]
})

const openChange = (bool: boolean) => {
  emit('openChange', bool)
}

const confirm = (e: MouseEvent) => {
  return new Promise((resolve) => {
    if (props.promiseResolve) {
      promiseResolve().then(() => {
        emit('confirm', e)
        resolve(true)
      })
    } else {
      emit('confirm', e)
      resolve(true)
    }
  })
}

const cancel = (e: MouseEvent) => {
  emit('cancel', e)
}

const promiseResolve = () => {
  const cb = props.promiseResolve
  return new Promise((resolve) => {
    cb?.(resolve)
  })
}
</script>

<template>
  <ConfigProvider :wave="{ disabled: false }">
    <APopconfirm
      v-bind="options"
      :style="mergedStyle"
      :class="mergedClass"
      @confirm="confirm"
      @cancel="cancel"
      @openChange="openChange"
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
