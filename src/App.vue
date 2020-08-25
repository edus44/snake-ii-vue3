<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'

const COLS = 3
const ROWS = 2

const WIDTH = 300
const HEIGHT = 400

const chunkSize = Math.min(WIDTH / COLS, HEIGHT / COLS)

export default {
  // mounted() {
  //   console.log(this.$refs.canvas)
  // },
  setup() {
    const canvas = ref<HTMLCanvasElement>()

    onMounted(() => {
      canvas.value.width = WIDTH
      canvas.value.height = HEIGHT
      const ctx = canvas.value.getContext('2d')
      ctx.fillStyle = '#060e0c'
      ctx.fillRect(0, 0, chunkSize, chunkSize)
    })

    return { canvas }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--board-bg-color);
}
</style>
