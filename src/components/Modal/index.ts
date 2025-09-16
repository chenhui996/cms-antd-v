import { Modal as AModal } from 'ant-design-vue'
import ModalComponent from './Modal.vue'

// 创建一个新的对象，包含组件和静态方法
const Modal = Object.assign(ModalComponent, {
  info: AModal.info,
  success: AModal.success,
  error: AModal.error,
  warning: AModal.warning,
  confirm: AModal.confirm,
  useModal: AModal.useModal
})

export { Modal }
export { default as ModalMethodContainer } from "./ModalMethodContainer.vue"
export type { CSModalProps, ModalEmits, ModalMethodProps } from "./lib/type"
