<template>
  <teleport :disabled="!appendToBody" to="body">
    <div
      v-if="visible"
      :class="[
        {
          overlay: overlay,
          'bg-transparent': !overlay,
        },
      ]"
      :style="{
        position: appendToBody ? 'fixed' : 'absolute',
      }"
      class="drawer-overlay"
      @click="handleOverlayClick"
    >
      <div
        :class="[`drawer-${direction}`]"
        class="drawer-container"
        @click.stop
      >
        <slot name="header">
          <div class="container-space-between">
            <strong>{{ title || '' }}</strong>
            <QFormButton v-if="showClose" @click="close"> × </QFormButton>
          </div>
        </slot>

        <div class="drawer-body">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { QFormButton } from '@/components/form/FormButton';
import type { DrawerProps, DrawerEmits } from './type';
import { useDrawer } from './composable';

defineOptions({
  name: 'QDrawer',
});

const props = withDefaults(defineProps<DrawerProps>(), {
  visible: false,
  title: '',
  direction: 'right',
  showClose: true,
  closeOnClickOverlay: true,
  overlay: true,
  appendToBody: true,
});

const emit = defineEmits<DrawerEmits>();

const { close, handleOverlayClick } = useDrawer(props, emit);
</script>

<style scoped>
.drawer-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index-level-2);
}

.drawer-container {
  position: absolute;
  background-color: var(--card-bg);
  box-shadow: 0 0 10px var(--box-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-top {
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  animation: slide-down 0.3s ease-out;
}

.drawer-right {
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 0.5rem 0 0 0.5rem;
  animation: slide-right 0.3s ease-out;
}

.drawer-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  animation: slide-up 0.3s ease-out;
}

.drawer-left {
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
  animation: slide-left 0.3s ease-out;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
.drawer-body {
  flex: 1;
}
</style>
