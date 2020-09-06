<template>
  <template v-if="playing">
    <Game :config="config" />
    <button @click="playing = false">stop</button>
  </template>
  <template v-else>
    <button @click="playing = true">play</button>
    <div>
      numPlayers
      <input type="number" v-model="config.numPlayers" />
    </div>
    <div>
      speed
      <input type="number" v-model="config.speed" />
    </div>
    <div>
      size
      <input type="number" v-model="config.size" />
    </div>
  </template>
</template>

<script lang="ts">
import Game from './components/Game.vue'
import { ref, reactive } from 'vue'
import { Config } from './lib/types'
export default {
  components: { Game },
  setup() {
    const playing = ref(false)
    const config = reactive<Config>({
      numPlayers: 2,
      speed: 1,
      size: 1,
    })
    return { playing, config }
  },
}
</script>

<style lang="postcss" scoped></style>
