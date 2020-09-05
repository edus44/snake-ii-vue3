<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { Controller } from '../lib/Controller'

export default {
  props: ['player'],
  setup(props, { emit }) {
    const canvas = ref<HTMLCanvasElement>()
    const controller = ref<Controller>()
    console.log(props)
    onMounted(() => {
      controller.value = new Controller(canvas.value, {
        width: 300,
        height: 200,
      })
      watchEffect(() => {
        console.log(controller.value.handlerDir)
        emit('dir', { player: props.player, dir: controller.value.handlerDir })
      })
    })

    onBeforeUnmount(() => {
      controller.value.unbind()
    })

    return { canvas }
  },
}
</script>

<style lang="postcss" scoped>
canvas {
  display: block;
  background-color: var(--viper-1-color);
}
</style>
