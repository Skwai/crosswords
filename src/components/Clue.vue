<template>
  <div
    class="Clue"
    :style="focusedStyle"
  >
    <strong class="Clue__Num">{{num}}</strong>
    <span class="Clue__Content"><slot /></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['num', 'dir'],

  computed: {
    focusedStyle () {
      if (!this.isFocused) return null
      return {
        backgroundColor: this.stringToHSL(this.uid)
      }
    },

    isFocused () {
      const { focusedWord, num, dir } = this
      return focusedWord && focusedWord[dir] === Number(num)
    },

    ...mapGetters(['uid', 'focusedWord', 'stringToHSL'])
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

  &__Num
    margin-right: spacingSmall
</style>
