<template>
  <canvas ref="canvas" />
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

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const game = ref<Game>()

    onMounted(() => {
      window.game = game.value = new Game()

      game.value.setBoard(
        new Board(canvas.value, { cols: 60, rows: 60 }, { width: 600, height: 600 }),
      )
      game.value.addViper(new Viper({ row: 0, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 1, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 2, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 3, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 4, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 5, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 6, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 7, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 8, col: 0 }, Dir.right))
      // game.value.addViper(new Viper({ row: 9, col: 0 }, Dir.right))

      useAnimationLoop(diff => game.value.tick(diff))

      useDirectionKeys(dir => game.value.vipers[0].setDir(dir))
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
