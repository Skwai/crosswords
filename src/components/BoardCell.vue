<template>
  <div
    class="BoardCell"
    :data-question="cell === '%' ? cellIndex + 1 : false"
    :class="{ '-blank': isBlank, '-start': isStart, '-focused': isFocused }"
    :data-start="start"
    :data-across="words.across"
    :data-down="words.down"
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
      if (!this.isBlank) {
        const { cell } = this
        this.$store.dispatch('focusWord', {
          across: cell.across ? cell.across.word : null,
          down: null
        })
      }
    },

    mousedown () {
      const { isFocused, cell, focusedWord } = this
      if (isFocused && cell.down && cell.across) {
        this.$store.dispatch('focusWord', {
          across: focusedWord.across ? null : cell.across.word,
          down: focusedWord.down ? null : cell.down.word
        })
      }
    },

    blur () {
      this.$store.dispatch('unfocusWord')
    }
  },

  data () {
    return {
      boardId: null
    }
  },

  created () {
    this.boardId = this.$route.params.boardId
  },

  computed: {
    isFocused () {
      /*
      const { cell, focusedWord } = this
      return cell && (cell.across && cell.across.word === focusedWord.across) || (cell.down && cell.down.word === focusedWord.down)
      */
      return false
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

    ...mapGetters(['focusedWord'])
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

  & + .BoardCell
    margin-left: 1px

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

    .-focused &
      background: #eaebec

    &:focus
      outline: 0
      background: #eaebec

  &.-start
    &::before
      top: 0.25rem
      left: 0.25rem
      line-height: 1
      position: absolute
      font-size: 0.75rem
      content: attr(data-start)

  &.-blank
    background: transparent
</style>
