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
      :style="cellStyles"
    >
      <span class="BoardCell__User" :style="{ backgroundColor: cellUserColor }"></span>
      <input
        class="BoardCell__Input"
        v-if="!isBlank"
        maxlength="1"
        minlength="1"
        @keydown="keydown"
        @focus="focus"
        @mousedown="mousedown"
        @blur="blur"
        :value="cell.value"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['cell', 'x', 'y'],

  methods: {
    keydown (ev) {
      const { key } = ev
      // check if alpha character
      if (key.length === 1 && key.toLowerCase() !== key.toUpperCase()) {
        const { x, y, boardId, uid } = this
        const value = key.toUpperCase()
        ev.target.value = value || ''
        this.$store.dispatch('setCellValue', {
          value,
          x,
          y,
          boardId,
          userId: uid
        })
        ev.target.blur()
      }
    },

    focus () {
      const { cell: { across, down } } = this
      this.$store.dispatch('focusWord', {
        across: across ? across.word : null,
        down: !across ? down.word : null
      })
    },

    mousedown () {
      const { isFocused, cell: { down, across }, focusedWord } = this
      if (isFocused && down && across) {
        this.$store.dispatch('focusWord', {
          across: focusedWord.across ? null : across.word,
          down: focusedWord.down ? null : down.word
        })
      }
    },

    blur () {
      this.$store.dispatch('unfocusWord')
    }
  },

  computed: {
    cellUserColor () {
      const { cell } = this
      return cell.user ? this.stringToHSL(cell.user) : null
    },

    isFocused () {
      if (this.isBlank) return false
      const { cell: { down, across }, focusedWord } = this
      return ((down || across) && (across.word === focusedWord.across) || (down.word === focusedWord.down))
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

    ...mapGetters(['focusedWord', 'boardId', 'stringToHSL', 'uid'])
  }
}
</script>

<style lang="stylus">
.BoardCell
  min-width: 4rem
  min-height: 4rem
  position: relative
  width: cellSize
  height: cellSize
  display: flex
  background: #fff
  flex: 1

  & + .BoardCell
    margin-left: 2px

  &__Input
    width: 100%
    height: 100%
    display: block
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
