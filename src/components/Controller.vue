<template>
  <canvas ref="canvas" />
  <input v-model="size.width" />
  <input v-model="size.height" />
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect, reactive } from 'vue'
import { Controller } from '../lib/Controller'
import { Size } from '../lib/types'

export default {
  setup(props, { emit }) {
    const canvas = ref<HTMLCanvasElement>()
    const controller = ref<Controller>()
    const size = reactive<Size>({ width: 200, height: 300 })

    onMounted(() => {
      controller.value = new Controller(canvas.value, {
        width: 300,
        height: 200,
      })

      watchEffect(() => {
        emit('dir', controller.value.getHandlerDir())
      })

      watchEffect(() => {
        controller.value.setSize(size)
      })
    })

    onBeforeUnmount(() => {
      controller.value.unbind()
    })

    return { canvas, size }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--viper-1-color);
}
</style>
