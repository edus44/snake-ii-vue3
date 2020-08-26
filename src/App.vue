<template>
  <canvas ref="canvas" />
  <button @click="setDir('up')">up</button>
  <button @click="setDir('down')">down</button>
  <button @click="setDir('left')">left</button>
  <button @click="setDir('right')">right</button>
</template>

<script lang="ts">
import { ref, onMounted, onDeactivated, onUnmounted, onBeforeMount } from 'vue'
import * as figures from './lib/figures'
import { Board } from './lib/Board'
import { Viper } from './lib/Viper'
import { Game } from './lib/Game'
import { Dir } from './lib/types'
import { useAnimationLoop } from './lib/uses/useAnimationLoop'
import { useDirectionKeys } from './lib/uses/useDirectionKeys'

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
    const game = ref<Game>()
    onMounted(() => {
      game.value = new Game()

      game.value.setBoard(
        new Board(canvas.value, { cols: 20, rows: 20 }, { width: 600, height: 600 }),
      )
      game.value.addViper(new Viper({ row: 0, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 10, col: 10 }, Dir.up))

      useAnimationLoop(diff => game.value.tick(diff))

      useDirectionKeys(dir => game.value.vipers[0].setDir(dir))
    })

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
