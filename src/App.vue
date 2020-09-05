<template>
  <Board ref="board" />
  <Controller @dir="dir => changeDir(0, dir)" />
  <!-- <Controller @dir="dir => changeDir(1, dir)" />
  <Controller @dir="dir => changeDir(2, dir)" /> -->
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import Board from './components/Board.vue'
import Controller from './components/Controller.vue'
import { Dir } from './lib/types'
export default {
  components: { Board, Controller },
  setup() {
    const board = ref()

    return {
      board,
      changeDir(player: number, dir: Dir) {
        board.value.game.turnViper(player, dir)
      },
    }
  },
}
</script>

<style lang="postcss" scoped></style>
