<template>
  <canvas ref="canvas" :style="`--color:var(--viper-${color})`" />
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { Controller } from '../lib/Controller'
import { useResize } from '../lib/uses/useResize'
import { Color } from '../lib/types'

export default {
  props: {
    color: {
      required: true,
      type: String as () => keyof typeof Color,
    },
    single: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    let controller: Controller
    const canvas = ref<HTMLCanvasElement>()

    onMounted(() => {
      controller = new Controller(canvas.value!, {
        width: 10,
        height: 10,
      })

      watchEffect(() => {
        const dir = controller.getHandlerDir().value
        if (dir) emit('dir', dir)
      })

      useResize(size => {
        controller.setSize({
          width: size.width / (props.single ? 1 : 2),
          height: size.height / 4,
        })
      })
    })

    onBeforeUnmount(() => {
      controller.unbind()
    })

    return { canvas }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  /* display: block; */
  border-radius: 30px;

  box-shadow: 0 0 0 3px inset var(--color), 0 0 0 6px inset rgba(var(--body-bg-color-comps), 0.6);
  background-color: var(--color);
}
</style>
