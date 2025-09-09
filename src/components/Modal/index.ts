export { default as Modal } from "./Modal.vue"
export { default as ModalMethodContainer } from "./ModalMethodContainer.vue"
export type { CSModalProps, ModalEmits, ModalMethodProps } from "./lib/type"

import { Modal as AModal } from 'ant-design-vue'
import { Modal as CSModal } from './index'

// 把 antd Modal 的静态方法挂到 CSModal 上
;(CSModal as any).info = AModal.info
;(CSModal as any).success = AModal.success
;(CSModal as any).error = AModal.error
;(CSModal as any).warning = AModal.warning
;(CSModal as any).confirm = AModal.confirm
;(CSModal as any).useModal = AModal.useModal
