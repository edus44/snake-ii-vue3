<template>
  <div class="game">
    <div class="controllers">
      <Controller @dir="dir => changeDir(1, dir)" :color="'red'" />
      <Controller v-if="config.numPlayers > 2" @dir="dir => changeDir(2, dir)" :color="'yellow'" />
    </div>
    <div class="board">
      <canvas ref="canvas" />
    </div>
    <div class="controllers">
      <Controller @dir="dir => changeDir(0, dir)" :color="'blue'" />
      <Controller v-if="config.numPlayers > 3" @dir="dir => changeDir(3, dir)" :color="'purple'" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { Game } from '../lib/Game'
import { Color, Config, Dir } from '../lib/types'
import { useSpaceKey } from '../lib/uses/useSpaceKey'
import { useDirectionKeys } from '../lib/uses/useDirectionKeys'
import { useAnimationLoop } from '../lib/uses/useAnimationLoop'
import Controller from './Controller.vue'

export default {
  props: {
    config: {
      required: true,
      type: Object as () => Config,
    },
  },
  components: {
    Controller,
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement>()
    const game = ref<Game>()

    onMounted(() => {
      const g = new Game(2, canvas.value, { cols: 13, rows: 13 }, { width: 300, height: 300 })
      game.value = window['game'] = g

      // Players
      g.addViper({ row: 3, col: 2 }, Dir.right, Color.blue)
      g.addViper({ row: 5, col: 2 }, Dir.right, Color.red)
      if (props.config.numPlayers > 2) g.addViper({ row: 7, col: 2 }, Dir.right, Color.yellow)
      if (props.config.numPlayers > 3) g.addViper({ row: 9, col: 2 }, Dir.right, Color.purple)

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
.game {
  display: flex;
  flex: 1;
  flex-direction: column;

  & .controllers {
    background-color: #fc0;
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  & .board {
    background-color: #0fc;
    flex: 2;
    width: 100%;
  }
}
</style>
