import { onBeforeMount, onBeforeUnmount } from 'vue'

export const useAnimationLoop = (fn: (diff: number) => boolean) => {
  let active = true
  let lastTs = Date.now()

  const loop = () => {
    if (!active) return
    const ts = Date.now()
    const diff = ts - lastTs
    if (fn(diff)) lastTs = ts
    requestAnimationFrame(loop)
  }

  onBeforeUnmount(() => {
    console.log('unmounted')
    active = false
  })

  requestAnimationFrame(loop)
}
