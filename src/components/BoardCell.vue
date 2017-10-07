<template>
  <div
    class="BoardCell"
    :data-question="cell === '%' ? cellIndex + 1 : false"
    :class="{ '-blank': isBlank, '-start': isStart, '-focused': isFocused }"
    :data-start="start"
    :data-across="words.across"
    :data-down="words.down"
    :data-x="x"
    :data-y="y"
  ><input
    class="BoardCell__Input"
    v-if="!isBlank"
    @keydown.prevent="keydown"
    maxlength="1"
    minlength="1"
    @focus="focus"
    @mousedown="mousedown"
    @blur="blur"
    :value="cell.value"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['cell', 'x', 'y'],

  methods: {
    keydown (ev) {
      const { key } = ev

      if (key.length !== 1 || key.toLowerCase() === key.toUpperCase()) return false

      const { x, y, boardId } = this
      const value = key.toUpperCase()
      ev.target.value = value
      this.$store.dispatch('setCellValue', {
        value,
        x,
        y,
        boardId
      })
      this.$listeners.next(x, y)
      ev.target.blur()
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
    isFocused () {
      if (this.isBlank) return false

      const { cell: { down, across }, focusedWord } = this
      return ((down || across) && (across.word === focusedWord.across) || (down.word === focusedWord.down))
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

    ...mapGetters(['focusedWord', 'boardId'])
  }
}
</script>

<style lang="stylus">
.BoardCell
  cellSize = 8vmin
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
    font-size: 4vmin
    font-family: inherit
    text-transform: uppercase
    margin: 0
    padding: 0
    transform: translate3d(0,0,0)
    backface-visibility: none

    .-focused &
      box-shadow: inset rgba(#BD10E0, .2) 0 0 0 3px
      background: rgba(#BD10E0, .2)

    &:focus
      outline: 0
      background: rgba(#BD10E0, .2)

  &.-start
    &::before
      top: 0.25rem
      left: 0.25rem
      line-height: 1
      position: absolute
      font-size: 2vmin
      content: attr(data-start)

  &.-blank
    background: transparent
</style>
