<template>
  <div class="GamePermalink">
    <input
      class="GamePermalink__Input"
      :value="permalink"
      readonly
    >
  </div>
</template>

<script>
export default {
  props: ['boardId'],

  computed: {
    permalink () {
      return window.location
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.GamePermalink
  background: #fff
  cursor: text
  border-radius: borderRadiusSmall
  padding: spacingSmall
  font-size: 0.875rem
  margin: spacingBase auto spacingBase
  transition: transitionBase

  &__Input
    background: transparent
    border: 0
    width: 100%

    &:hover,
    &:focus
      opacity: 1
</style>
