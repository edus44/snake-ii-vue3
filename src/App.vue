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
import { Dir } from './lib/types'
import { useAnimationLoop } from './lib/uses/useAnimationLoop'
import { useDirectionKeys } from './lib/uses/useDirectionKeys'
import { useSpaceKey } from './lib/uses/useSpaceKey'

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const game = ref<Game>()

    onMounted(() => {
      const game = new Game(canvas.value, { cols: 20, rows: 13 }, { width: 600, height: 400 })
      window.game = game

      game.addViper({ row: 5, col: 0 }, Dir.right)

      // useAnimationLoop(diff => game.tick(diff))
      useSpaceKey(() => game.tick(10000))

      useDirectionKeys(dir => game.vipers[0].setDir(dir))
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
