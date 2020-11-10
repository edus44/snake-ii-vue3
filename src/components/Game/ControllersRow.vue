<template>
  <Controller
    v-for="[playerId, color] in row"
    @dir="dir => $emit('dir', [playerId, dir])"
    :color="color"
    :single="row.length == 1"
  />
</template>

<script lang="ts">
import Controller from '../Controller.vue'
import { Color } from '../../lib/types'
export default {
  emits: ['dir'],
  props: {
    row: {
      required: true,
      type: Array as () => [number, Color][],
    },
  },
  components: {
    Controller,
  },
}
</script>

<style></style>
