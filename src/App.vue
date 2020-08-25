<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import * as figures from './lib/figures'
import { Board } from './lib/Board'
import { Viper } from './lib/Viper'
import { Dir } from './lib/types'

const COLS = 3
const ROWS = 2

const WIDTH = 300
const HEIGHT = 400

const chunkSize = Math.min(WIDTH / COLS, HEIGHT / COLS)

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>()

    onMounted(() => {
      const board = new Board(canvas.value, { cols: 20, rows: 20 }, { width: 600, height: 600 })

      // board.drawFigure(1, 2, figures.Tail.right)
      // board.drawFigure(2, 2, figures.Body.right)
      // board.drawFigure(3, 2, figures.Body.right)
      // board.drawFigure(4, 2, figures.Body.right)
      // board.drawFigure(7, 2, figures.Head.right)

      const viper = new Viper({ row: 0, col: 2 }, Dir.right)
      board.drawChunks(viper.getChunks())
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
