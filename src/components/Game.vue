<template>
  <div class="game">
    <div class="controllers">
      <ControllersRow :row="topPlayersRow" @dir="changeDir" />
    </div>
    <div class="board" :style="{ height: boardHeight }">
      <span>a</span>
      <canvas ref="canvas" />
      <span>b</span>
    </div>
    <div class="controllers">
      <ControllersRow :row="bottomPlayersRow" @dir="changeDir" />
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
import { useResize } from '../lib/uses/useResize'
import ControllersRow from './Game/ControllersRow.vue'

export default {
  props: {
    config: {
      required: true,
      type: Object as () => Config,
    },
  },
  components: {
    ControllersRow,
  },
  setup({ config }) {
    const canvas = ref<HTMLCanvasElement>()
    let game: Game
    const boardHeight = ref<string>()

    onMounted(() => {
      game = new Game(2, canvas.value!, { cols: 15, rows: 15 }, { width: 100, height: 100 })
      ;(window as any).game = game

      // Players
      game.addViper({ row: 3, col: 2 }, Dir.right, Color.blue)
      game.addViper({ row: 5, col: 2 }, Dir.right, Color.red)
      if (config.numPlayers > 2) game.addViper({ row: 7, col: 2 }, Dir.right, Color.yellow)
      if (config.numPlayers > 3) game.addViper({ row: 9, col: 2 }, Dir.right, Color.purple)

      // Board size
      useResize(size => {
        game.setBoardSize({
          width: size.width,
          height: size.height / 2,
        })
        boardHeight.value = size.height / 2 + 'px'
      })

      // Bindings
      useAnimationLoop(game.tick)
      useDirectionKeys(game.turnViper)
      // useSpaceKey(() => game!.tick(10000))
    })

    return {
      canvas,
      boardHeight,
      topPlayersRow: [
        [1, 'red'],
        [3, 'yellow'],
      ],
      bottomPlayersRow: [
        [0, 'blue'],
        [4, 'purple'],
      ],
      changeDir([player, dir]: [number, Dir]) {
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
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    overflow: hidden;
    & canvas {
      background-color: var(--board-bg-color);
      box-shadow: 0 0 0 20px rgba(var(--board-bg-color-comps), 0.4),
        0 0 0 40px rgba(var(--board-bg-color-comps), 0.4);
    }
  }
}
</style>
