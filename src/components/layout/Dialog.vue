<template>
  <teleport to="body">
    <div v-if="visible" class="dialog-overlay" @click="handleOverlayClick">
      <div :class="dialogClass" class="dialog-container " @click.stop>
        <div class="dialog-header container-space-between">
          <div class="container-align-center">
            <slot name="header">
              <span v-if="title" class="dialog-title">{{ title }}</span>
            </slot>
          </div>
          <FormButton
              v-if="showClose"
              size="small"
              @click="close"
          >
            ×
          </FormButton>
        </div>

        <div class="dialog-body">
          <slot></slot>
        </div>

        <div v-if="showFooter" class="dialog-footer container-space-between">
          <slot name="footer">
            <FormButton
                v-if="showCancel"
                @click="handleCancel"
            >
              {{ cancelText }}
            </FormButton>
            <FormButton
                @click="handleConfirm"
            >
              {{ confirmText }}
            </FormButton>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from 'vue'
import FormButton from "@/components/form/FormButton.vue";

interface DialogProps {
  visible?: boolean
  title?: string
  showClose?: boolean
  showFooter?: boolean
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  closeOnClickOverlay?: boolean
  width?: string
  customClass?: string
}

const props = withDefaults(defineProps<DialogProps>(), {
  visible: false,
  title: '',
  showClose: true,
  showFooter: true,
  showCancel: true,
  confirmText: '确定',
  cancelText: '取消',
  closeOnClickOverlay: true,
  customClass: ''
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const dialogClass = computed(() => {
  return [
    'dialog-wrapper',
    props.customClass
  ]
})

const close = () => {
  emit('update:visible', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    close()
  }
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  background-color: var(--card-bg);
  box-shadow: 0 0 10px var(--box-shadow);
  min-width: 450px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: dialog-fade-in 0.3s ease-out;
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dialog-header {
  padding: var(--half-distance);
}

.dialog-title {
  font-size: 1.1rem;
  font-weight: 500;
}

.dialog-body {
  flex: 1;
}

.dialog-footer {
  padding: var(--half-distance);
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .dialog-container {
    min-width: unset;
    max-width: 95vw;
  }
}
</style>