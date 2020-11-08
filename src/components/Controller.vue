<template>
  <div ref="root">
    <canvas ref="canvas" :style="{ backgroundColor }" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect, computed } from 'vue'
import { Controller } from '../lib/Controller'
import { useResize } from '../lib/uses/useResize'
import { Color } from '../lib/types'

export default {
  props: {
    color: {
      required: true,
      type: String as () => keyof typeof Color,
    },
  },
  setup(props, { emit }) {
    let controller: Controller
    const root = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const backgroundColor = computed(() => Color[props.color])

    onMounted(() => {
      controller = new Controller(canvas.value!, {
        width: 10,
        height: 10,
      })

      watchEffect(() => {
        const dir = controller.getHandlerDir().value
        if (dir) emit('dir', dir)
      })

      useResize(() => {
        const rect = root.value!.getBoundingClientRect()

        controller.setSize({
          width: rect.width,
          height: rect.height,
        })
      })
    })

    onBeforeUnmount(() => {
      controller.unbind()
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
