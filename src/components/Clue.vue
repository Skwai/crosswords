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
        backgroundColor: this.stringToHSL(this.uid, 0.2)
      }
    },

    isFocused () {
      const { isFocusedWord, num, dir } = this
      return isFocusedWord(dir, num)
    },

    ...mapGetters(['uid', 'isFocusedWord', 'stringToHSL'])
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.Clue
  font-size: 0.875rem
  display: flex
  padding: (spacingSmall / 2) spacingSmall
  margin: 0 (-1 * spacingSmall)

  &__Num
    margin-right: spacingSmall
</style>
