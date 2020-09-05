<template>
  <Board ref="board" />
  <Controller @dir="changeDir" :player="0" />
  <Controller @dir="changeDir" :player="1" />
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
      changeDir({ player, dir }: { player: number; dir: Dir }) {
        // console.log(dir, board.value.game.tur)
        board.value.game.turnViper(player, dir)
      },
    }
  },
}
</script>

<style lang="postcss" scoped></style>
