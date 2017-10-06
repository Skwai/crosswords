<template>
  <button class="UiBtn" @click="$listeners.click"><slot /></button>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.UiBtn
  border: 0
  background: transparent
  border-radius: 999px
  padding: 1rem 2rem
  font-weight: 700
  cursor: pointer
  border: currentColor solid 1px
  box-shadow: 0 2px 0 currentColor
  transition: transitionBase
  letter-spacing: 0.025em
  transform: translate3d(0,0,0)
  background: #fff

  &:hover,
  &:focus
    transform: translate3d(0, -2px, 0)
    box-shadow: 0 4px 0 currentColor
    outline: 0
</style>
