<template>
  <Board ref="board" />
  <Controller @dir="changeDir" />
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
      changeDir(dir: Dir) {
        // console.log(dir, board.value.game.tur)
        board.value.game.turnViper(0, dir)
      },
    }
  },
}
</script>

<style lang="postcss" scoped></style>
