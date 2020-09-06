<template>
  <canvas ref="canvas" />
  <Controller @dir="dir => changeDir(0, dir)" :color="'blue'" />
  <Controller @dir="dir => changeDir(1, dir)" :color="'red'" />
  <Controller @dir="dir => changeDir(2, dir)" :color="'yellow'" />
  <Controller @dir="dir => changeDir(3, dir)" :color="'purple'" />
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { Game } from '../lib/Game'
import { Color, Dir } from '../lib/types'
import { useSpaceKey } from '../lib/uses/useSpaceKey'
import { useDirectionKeys } from '../lib/uses/useDirectionKeys'
import { useAnimationLoop } from '../lib/uses/useAnimationLoop'
import Controller from './Controller.vue'

export default {
  components: {
    Controller,
  },
  setup() {
    const canvas = ref<HTMLCanvasElement>()
    const game = ref<Game>()

    onMounted(() => {
      const g = new Game(canvas.value, { cols: 13, rows: 13 }, { width: 300, height: 300 })
      game.value = window['game'] = g

      g.addViper({ row: 5, col: 0 }, Dir.right, Color.blue)
      g.addViper({ row: 8, col: 0 }, Dir.right, Color.red)
      g.addViper({ row: 10, col: 0 }, Dir.right, Color.yellow)
      g.addViper({ row: 12, col: 0 }, Dir.right, Color.purple)

      // useSpaceKey(() => g.tick(10000))
      useAnimationLoop(g.tick)
      useDirectionKeys(g.turnViper)
    })

    return {
      canvas,
      game,
      changeDir(player: number, dir: Dir) {
        game.value?.turnViper(player, dir)
      },
    }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--board-bg-color);
}
</style>
