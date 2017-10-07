<template>
  <div class="Users">
    <div
      v-for="(user, id) in users"
      class="Users__User"
        :key="id"
        :style="{ background: user }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ['users']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Users
  display: flex
  margin-bottom: spacingBase
  width: 100%
  justify-content: center

  &__User + &__User
    margin-left: 0.25rem

  &__User
    width: 2rem
    height: 2rem
    border-radius: 50%
    display: inline-block
    box-shadow: inset 0 -2px 0 rgba(0,0,0,.2)
</style>
