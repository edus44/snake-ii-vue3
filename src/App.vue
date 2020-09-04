<template>
  <Board />
  <Controller />
</template>

<script lang="ts">
import Board from './components/Board.vue'
import Controller from './components/Controller.vue'
export default {
  components: { Board, Controller },
  setup() {},
}
</script>

<style lang="postcss" scoped></style>
