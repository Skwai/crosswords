<template>
  <div class="Clue" :class="{ '-focused': isFocused }">
    <strong class="Clue__Num">{{num}}</strong>
    <span class="Clue__Content"><slot /></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['num', 'dir'],

  computed: {
    isFocused () {
      const { focusedWord, num, dir } = this
      return focusedWord && focusedWord[dir] === Number(num)
    },
    ...mapGetters(['focusedWord'])
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.Clue
  font-size: 0.875rem
  display: flex
  padding: spacingSmall
  margin: 0 (-1 * spacingSmall)

  &.-focused
    background: rgba(#BD10E0, .2)

  &__Num
    margin-right: spacingSmall
</style>
