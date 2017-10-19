<template>
  <div
    class="Clue"
    :class="{ '-focused': isFocused }"
    :style="clueStyles"
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

    clueStyles () {
      if (!this.isFocused) return null
      const color = this.stringToHSL(this.uid, 0.2)
      return { background: color }
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
  padding: 0.75rem 0.75rem
  transition: transitionBase

  &__Num
    margin-right: spacingSmall
</style>
