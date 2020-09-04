import { onBeforeUnmount } from 'vue'
import { Dir } from '../types'

export const useDirectionKeys = (fn: (idx: number, dir: Dir) => void) => {
  const handler = e => {
    if (e.key == 'ArrowUp') {
      fn(0, Dir.up)
    } else if (e.key == 'ArrowLeft') {
      fn(0, Dir.left)
    } else if (e.key == 'ArrowDown') {
      fn(0, Dir.down)
    } else if (e.key == 'ArrowRight') {
      fn(0, Dir.right)
    } else if (e.key == 'w') {
      fn(1, Dir.up)
    } else if (e.key == 'a') {
      fn(1, Dir.left)
    } else if (e.key == 's') {
      fn(1, Dir.down)
    } else if (e.key == 'd') {
      fn(1, Dir.right)
    } else if (e.key == 'i') {
      fn(2, Dir.up)
    } else if (e.key == 'j') {
      fn(2, Dir.left)
    } else if (e.key == 'k') {
      fn(2, Dir.down)
    } else if (e.key == 'l') {
      fn(2, Dir.right)
    }
  }

  document.addEventListener('keydown', handler)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handler)
  })
}
