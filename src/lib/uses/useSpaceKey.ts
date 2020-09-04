import { onBeforeUnmount } from 'vue'

export const useSpaceKey = (fn: () => void) => {
  const handler = e => {
    if (e.key == ' ') {
      fn()
    }
  }

  document.addEventListener('keydown', handler)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handler)
  })
}
