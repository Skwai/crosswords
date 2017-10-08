export const focusedWord = ({ focusedWord }) => focusedWord
export const board = ({ board }) => board
export const game = ({ game }) => game
export const boardId = ({ boardId }) => boardId
export const uid = ({ uid }) => uid
export const stringToHSL = () => (str) => {
  const num = str.split('').reduce((hash, char) => {
    hash = String(char).charCodeAt(0) + ((hash << 5) - hash)
    return hash & hash
  }, 0)
  const hue = Math.abs(num) % 360
  return `hsl(${hue}, 90%, 60%)`
}
