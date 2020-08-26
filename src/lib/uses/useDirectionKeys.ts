import { onBeforeUnmount } from 'vue'
import { Dir } from '../types'

export const useDirectionKeys = (fn: (dir: Dir) => void) => {
  const handler = e => {
    if (e.key == 'ArrowUp') {
      fn(Dir.up)
    } else if (e.key == 'ArrowLeft') {
      fn(Dir.left)
    } else if (e.key == 'ArrowDown') {
      fn(Dir.down)
    } else if (e.key == 'ArrowRight') {
      fn(Dir.right)
    }

    // if (e.key == 'w') {
    //   game.value.vipers[1].setDir(Dir.up)
    // } else if (e.key == 'a') {
    //   game.value.vipers[1].setDir(Dir.left)
    // } else if (e.key == 's') {
    //   game.value.vipers[1].setDir(Dir.down)
    // } else if (e.key == 'd') {
    //   game.value.vipers[1].setDir(Dir.right)
    // }
  }

  document.addEventListener('keydown', handler)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handler)
  })
}
