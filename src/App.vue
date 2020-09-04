<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { ref, onMounted, onDeactivated, onUnmounted, onBeforeMount } from 'vue'
import * as figures from './lib/figures'
import { Board } from './lib/Board'
import { Viper } from './lib/Viper'
import { Game } from './lib/Game'
import { Store } from './lib/Store'
import { Color, Dir } from './lib/types'
import { useAnimationLoop } from './lib/uses/useAnimationLoop'
import { useDirectionKeys } from './lib/uses/useDirectionKeys'
import { useSpaceKey } from './lib/uses/useSpaceKey'

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const game = ref<Game>()

    onMounted(() => {
      const game = new Game(canvas.value, { cols: 20, rows: 13 }, { width: 600, height: 400 })
      window['game'] = game

      game.addViper({ row: 5, col: 0 }, Dir.right, Color.blue)
      game.addViper({ row: 8, col: 0 }, Dir.right, Color.red)
      game.addViper({ row: 10, col: 0 }, Dir.right, Color.yellow)

      // useAnimationLoop(diff => game.tick(diff))
      useSpaceKey(() => game.tick(10000))

      useDirectionKeys((idx, dir) => game.turnViper(idx, dir))
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
