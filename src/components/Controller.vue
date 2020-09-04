<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Controller } from '../lib/Controller'

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const controller = ref<Controller>()

    onMounted(() => {
      controller.value = new Controller(canvas.value, {
        width: 300,
        height: 200,
      })
    })

    onBeforeUnmount(() => {
      controller.value.unbind()
    })

    return { canvas }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--viper-1-color);
}
</style>
