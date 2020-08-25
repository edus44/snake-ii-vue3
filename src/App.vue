<template>
  <canvas ref="canvas" />
  <button @click="setDir('up')">up</button>
  <button @click="setDir('down')">down</button>
  <button @click="setDir('left')">left</button>
  <button @click="setDir('right')">right</button>
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
    const board = ref<Board>()
    const viper = ref<Viper>()
    onMounted(() => {
      board.value = new Board(canvas.value, { cols: 20, rows: 20 }, { width: 600, height: 600 })
      viper.value = new Viper({ row: 0, col: 0 }, Dir.right)
      viper.value.grow()
      viper.value.grow()
      viper.value.advance()
      viper.value.setDir(Dir.down)
      viper.value.advance()
      viper.value.advance()
      board.value.drawChunks(viper.value.getChunks())
    })

    // setInterval(() => {
    // board.value.drawChunks(viper.value.getChunks())
    // }, 100)

    const setDir = (dir: Dir) => viper.value.setDir(dir)

    return { canvas, setDir }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--board-bg-color);
}
</style>
