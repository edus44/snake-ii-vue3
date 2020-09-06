import { onBeforeUnmount } from 'vue'
import { Size } from '../types'

export const useResize = (fn: (size: Size) => void) => {
  const handler = () => {
    fn({
      width: Math.min(window.innerWidth, document.documentElement.clientWidth),
      height: Math.min(window.innerHeight, document.documentElement.clientHeight),
    })
  }

  window.addEventListener('resize', handler)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handler)
  })
}
