export const focusedWord = ({ focusedWord }) => focusedWord
export const board = ({ board }) => board
export const game = ({ game }) => game
export const boardId = ({ boardId }) => boardId
export const uid = ({ uid }) => uid
export const stringToHSL = () => (str) => {
  const code = str.split('').reduce((hash, char) => {
    hash = char + ((hash << 5) - hash)
    return hash & hash
  }, 0)
  const hue = code % 360
  return `hsl(${hue}, 90%, 60%)`
}
