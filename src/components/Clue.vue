<template>
  <div
    class="Clue"
    :class="{ '-focused': isFocused }"
    @click="click"
  >
    <strong class="Clue__Num">{{num}}.</strong>
    <span class="Clue__Content"><slot /></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['num', 'dir'],

  methods: {
    click () {
      const { dir, num } = this
      this.$store.dispatch('focusWord', `${dir}.${num}`)
    }
  },

  computed: {
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
  padding: spacingSmall spacingSmall
  margin: 0 (-1 * spacingSmall)
  transition: transitionBase

  &.-focused
    background: rgba(255,255,255,.2)

  &__Num
    margin-right: spacingSmall
</style>
