<template>
  <div
    class="BoardCell"
    :data-question="cell === '%' ? cellIndex + 1 : false"
    :class="{ '-blank': cell === 'X', '-start': isStart, '-focused': isFocused }"
    :data-num="'1'"
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
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['cell'],

  methods: {
    keydown (ev) {
      const { key } = ev
      if (key.length !== 1 || key.toLowerCase() === key.toUpperCase()) {
        return false
      }
      ev.target.value = key.toUpperCase()
      this.$listeners.next()
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

  computed: {
    isFocused () {
      /*
      const { cell, focusedWord } = this
      return cell && (cell.across && cell.across.word === focusedWord.across) || (cell.down && cell.down.word === focusedWord.down)
      */
      return false
    },

    isBlank () {
      return this.cell === null
    },

    isStart () {
      const { cell } = this
      return cell && (cell.down && cell.down.pos === 1) || (cell.across && cell.across.pos === 1)
    },

    words () {
      const { cell: { down, across } } = this

      return {
        down: down ? down.word : null,
        across: across ? across.word : null
      }
    },

    pos () {
      const { cell: { down, across } } = this

      return {
        down: down && down.pos ? down.pos : null,
        across: across && across.pos ? across.pos : null
      }
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
      content: attr(data-num)

  &.-blank
    background: transparent
</style>
