<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { ref, onMounted, onDeactivated, onUnmounted, onBeforeMount } from 'vue'
import { Game } from '../lib/Game'
import { Color, Dir } from '../lib/types'
import { useSpaceKey } from '../lib/uses/useSpaceKey'
import { useDirectionKeys } from '../lib/uses/useDirectionKeys'
import { useAnimationLoop } from '../lib/uses/useAnimationLoop'

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const game = ref<Game>()

    onMounted(() => {
      const g = new Game(canvas.value, { cols: 13, rows: 13 }, { width: 300, height: 300 })
      game.value = window['game'] = g

      g.addViper({ row: 5, col: 0 }, Dir.right, Color.blue)
      g.addViper({ row: 8, col: 0 }, Dir.right, Color.red)
      g.addViper({ row: 10, col: 0 }, Dir.right, Color.yellow)

      // useSpaceKey(() => g.tick(10000))
      useAnimationLoop(g.tick)

      useDirectionKeys(g.turnViper)
    })

    return { canvas, game }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--board-bg-color);
}
</style>
