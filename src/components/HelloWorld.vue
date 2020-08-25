<template>
  <div>
    -{{ count }}-
    <button @click="inc">inc</button>
    <pre>{{ person }}</pre>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue'

interface Person {
  name: string
  age: number
}

export default {
  setup() {
    const person = reactive<Person>({
      name: 'algo',
      age: 2,
    })

    const count = ref(0)

    const inc = () => count.value++

    onMounted(() => {
      console.log('hello')
      console.log(person.name, person.age)
      console.log(person)
      console.log(count)
    })

    return { count, inc, person }
  },
}
</script>
