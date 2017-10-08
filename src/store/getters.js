export const focusedWord = ({ focusedWord }) => focusedWord
export const board = ({ board }) => board
export const game = ({ game }) => game
export const boardId = ({ boardId }) => boardId
export const uid = ({ uid }) => uid
export const stringToHSL = () => (str) => {
  const checksum = str.split('').reduce((hash, char) => {
    hash = ((hash << 5) - hash) + char
    return hash & hash
  }, 0)
  const hue = Math.abs(checksum) % 360
  return `hsl(${hue}, 90%, 80%)`
}
