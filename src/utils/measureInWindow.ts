import {UIManager, ScreenRect} from 'react-native'

export function measureInWindow(node: number) {
  return new Promise<ScreenRect>(resolve => {
    UIManager.measureInWindow(node, (screenX, screenY, width, height) => {
      resolve({screenX, screenY, width, height})
    })
  })
}
