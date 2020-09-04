import { onBeforeUnmount } from 'vue'
import { Dir } from '../types'

const moves: Record<string, [number, Dir]> = {
  ArrowUp: [0, Dir.up],
  ArrowLeft: [0, Dir.left],
  ArrowDown: [0, Dir.down],
  ArrowRight: [0, Dir.right],

  w: [1, Dir.up],
  a: [1, Dir.left],
  s: [1, Dir.down],
  d: [1, Dir.right],

  i: [2, Dir.up],
  j: [2, Dir.left],
  k: [2, Dir.down],
  l: [2, Dir.right],
}

export const useDirectionKeys = (fn: (idx: number, dir: Dir) => void) => {
  const handler = e => {
    const move = moves[e.key]
    if (move) fn(...move)
  }

  document.addEventListener('keydown', handler)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handler)
  })
}
