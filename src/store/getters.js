export const focusedWord = ({ focusedWord }) => focusedWord
export const board = ({ board }) => board
export const game = ({ game }) => game
export const boardId = ({ boardId }) => boardId
export const uid = ({ uid }) => uid
export const stringToHSL = () => (str, opacity = 1) => {
  const b64 = btoa(btoa(str))
  const num = b64.split('').reduce((hash, char) => {
    hash = String(char).charCodeAt(0) + ((hash << 5) - hash)
    return hash & hash
  }, 0)
  const hue = Math.abs(num) % 360
  return `hsla(${hue}, 90%, 60%, ${opacity})`
}
export const isFocusedWord = ({ focusedWord }) => (dir, word) => {
  if (!focusedWord || !dir || !word) return false
  const [ d, w ] = focusedWord.split('.')
  return d === dir && Number(w) === Number(word)
}
