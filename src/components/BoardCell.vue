<template>
  <div
    class="BoardCell"
    :data-question="cell === '%' ? cellIndex + 1 : false"
    :class="{ '-blank': isBlank, '-start': isStart }"
    :data-start="start"
    :data-across="words.across"
    :data-down="words.down"
    :data-x="x"
    :data-y="y"
  >
    <div
      class="BoardCell__Wrap"
      :style="cellStyles"
    >
      <span class="BoardCell__User" :style="{ backgroundColor: cellUserColor }"></span>
      <input
        class="BoardCell__Input"
        v-if="!isBlank"
        maxlength="1"
        minlength="0"
        pattern="[A-Za-z ]{1}"
        @keydown="change"
        @focus="focus"
        @mousedown="mousedown"
        @blur="blur"
        :value="cell.value"
        :id="cellInputId"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['cell', 'x', 'y'],

  methods: {
    change (ev) {
      const { key, keyCode } = ev
      const deletes = [8, 46, 32]
      if ((key.toLowerCase() !== key.toUpperCase() && key.length === 1) || deletes.includes(keyCode)) {
        const { x, y, boardId, uid: userId } = this
        const value = deletes.includes(keyCode) ? '' : key.toUpperCase()
        this.$store.dispatch('setCellValue', {
          value,
          x,
          y,
          boardId,
          userId
        })
      }
    },

    focus () {
      const { cell: { across, down } } = this
      const word = across ? `across.${across.word}` : `down.${down.word}`
      this.$store.dispatch('focusWord', word)
    },

    mousedown () {
      const { isFocused, cell: { down, across }, focusedWord } = this
      if (isFocused && down && across) {
        const word = focusedWord.includes('across') ? `down.${down.word}` : `across.${across.word}`
        this.$store.dispatch('focusWord', word)
      }
    },

    blur () {
      this.$store.dispatch('unfocusWord')
    }
  },

  computed: {
    cellInputId () {
      if (this.isBlank) return null
      const { x, y } = this
      return `${x}:${y}`
    },

    cellUserColor () {
      const { cell } = this
      return cell.user ? this.stringToHSL(cell.user) : null
    },

    isFocused () {
      const { focusedWord, isBlank } = this
      if (isBlank || !focusedWord) return false
      const { cell: { down, across }, isFocusedWord } = this
      return isFocusedWord('down', down.word) ||
        isFocusedWord('across', across.word)
    },

    cellStyles () {
      if (!this.isFocused) return null
      const color = this.stringToHSL(this.uid, 0.2)
      return {
        backgroundColor: color,
        boxShadow: `inset ${color} 0 0 0 3px`
      }
    },

    isBlank () {
      return this.cell === false
    },

    words () {
      const { cell: { down, across } } = this

      return {
        down: down ? down.word : null,
        across: across ? across.word : null
      }
    },

    isStart () {
      return !!this.start
    },

    start () {
      if (this.isBlank) return false
      const { cell: { down, across } } = this
      const found = [down, across].find(w => w && w.pos === 1)
      return found && 'word' in found ? found.word : false
    },

    ...mapGetters(['focusedWord', 'boardId', 'stringToHSL', 'uid', 'isFocusedWord'])
  }
}
</script>

<style lang="stylus">
.BoardCell
  cellSize = 3rem
  position: relative
  min-width: cellSize
  min-height: cellSize
  max-width: cellSize
  max-height: cellSize
  display: flex
  background: #fff
  flex: 1

  & + .BoardCell
    margin-left: 2px

  &__Input
    width: 100%
    height: 100%
    top: 0
    left: 0
    border: 0
    background: transparent
    text-align: center
    font-size: 1.5rem
    font-family: inherit
    text-transform: uppercase
    margin: 0
    padding: 0
    transform: translate3d(0,0,0)
    backface-visibility: none

    &:focus
      outline: 0

  &.-start
    &::before
      top: 0.25rem
      left: 0.25rem
      line-height: 1
      position: absolute
      font-size: 0.875rem
      content: attr(data-start)

  &.-blank
    background: transparent

  &__User
    position: absolute
    width: 0.65rem
    height: 0.65rem
    background: transparent
    border-radius: 50%
    bottom: 0.25rem
    left: 0.25rem
</style>
