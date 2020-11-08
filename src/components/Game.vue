<template>
  <div class="game">
    <div class="controllers">
      <Controller @dir="dir => changeDir(1, dir)" :color="'red'" :single="config.numPlayers == 2" />
      <Controller v-if="config.numPlayers > 2" @dir="dir => changeDir(2, dir)" :color="'yellow'" />
    </div>
    <div class="board" :style="{ height: boardHeight }">
      <canvas ref="canvas" />
    </div>
    <div class="controllers">
      <Controller
        @dir="dir => changeDir(0, dir)"
        :color="'blue'"
        :single="config.numPlayers == 3"
      />
      <Controller v-if="config.numPlayers > 3" @dir="dir => changeDir(3, dir)" :color="'purple'" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { Game } from '../lib/Game'
import { Color, Config, Dir } from '../lib/types'
// import { useSpaceKey } from '../lib/uses/useSpaceKey'
import { useDirectionKeys } from '../lib/uses/useDirectionKeys'
import { useAnimationLoop } from '../lib/uses/useAnimationLoop'
import Controller from './Controller.vue'
import { useResize } from '../lib/uses/useResize'

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
    let game: Game
    const boardHeight = ref<string>()

    onMounted(() => {
      game = new Game(2, canvas.value!, { cols: 20, rows: 13 }, { width: 100, height: 100 })
      ;(window as any).game = game

      // Players
      game.addViper({ row: 3, col: 2 }, Dir.right, Color.blue)
      game.addViper({ row: 5, col: 2 }, Dir.right, Color.red)
      if (props.config.numPlayers > 2) game.addViper({ row: 7, col: 2 }, Dir.right, Color.yellow)
      if (props.config.numPlayers > 3) game.addViper({ row: 9, col: 2 }, Dir.right, Color.purple)

      // useSpaceKey(() => game!.tick(10000))
      useAnimationLoop(game.tick)
      useDirectionKeys(game.turnViper)

      useResize(size => {
        game.board.setSize({
          width: size.width,
          height: size.height / 2,
        })
        boardHeight.value = size.height / 2 + 'px'
      })
    })

    return {
      canvas,
      boardHeight,
      changeDir(player: number, dir: Dir) {
        game.turnViper(player, dir)
      },
    }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
}
.game {
  & .controllers {
    display: flex;
  }
  & .board {
    display: grid;
    align-items: center;
    justify-content: center;
    & canvas {
      background-color: var(--board-bg-color);
    }
  }
}
</style>
