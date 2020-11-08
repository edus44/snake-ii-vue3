<template>
  <div ref="root">
    <canvas ref="canvas" :style="{ backgroundColor }" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect, computed } from 'vue'
import { Controller } from '../lib/Controller'
import { useResize } from '../lib/uses/useResize'
import { Color, Size } from '../lib/types'

export default {
  props: {
    color: {
      required: true,
      type: String as () => keyof typeof Color,
    },
  },
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const controller = ref<Controller>()
    const backgroundColor = computed(() => Color[props.color])

    onMounted(() => {
      controller.value = new Controller(canvas.value!, {
        width: 10,
        height: 10,
      })

      watchEffect(() => {
        emit('dir', controller.value!.getHandlerDir())
      })

      useResize((size: Size) => {
        const rect = root.value!.getBoundingClientRect()

        controller.value?.setSize({
          width: rect.width,
          height: rect.height,
        })
      })
    })

    onBeforeUnmount(() => {
      controller.value!.unbind()
    })

    return { canvas, backgroundColor, root }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--viper-1-color);
}
div {
  flex: 1;
}
</style>
