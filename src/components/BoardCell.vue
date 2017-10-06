<template>
  <div
    class="BoardCell"
    :data-question="cell === '%' ? cellIndex + 1 : false"
    :class="{ '-blank': cell === 'X', '-start': isStart, '-focused': isFocused }"
    :data-num="word.num"
    :data-across="word.across"
    :data-down="word.down"
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
        const { word } = this
        this.$store.dispatch('focusWord', {
          across: word.across ? word.across : null,
          down: !word.across && word.down ? word.down : null
        })
      }
    },

    mousedown () {
      const { isFocused, word, focusedWord } = this
      if (isFocused && word.down && word.across) {
        this.$store.dispatch('focusWord', {
          across: focusedWord.across ? null : word.across,
          down: focusedWord.down ? null : word.down
        })
      }
    },

    blur () {
      this.$store.dispatch('unfocusWord')
    }
  },

  computed: {
    isFocused () {
      const { cell, focusedWord } = this
      return cell.across.word === focusedWord.across || cell.down.word === focusedWord.down
    },

    isBlank () {
      return this.cell === BLANK_CHAR
    },

    isStart () {
      return this.cell.includes(START_CHAR)
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
