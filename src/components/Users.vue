<template>
  <div class="Users">
    <div
      v-for="(user, id) in users"
      class="Users__User"
      :class="{ '-self': isSelf(id) }"
      :data-id="id"
      :key="id"
      :style="{ backgroundColor: stringToHSL(id) }"
    >{{isSelf(id) ? "You" : ""}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['users'],

  methods: {
    isSelf (userId) {
      return this.uid === userId
    }
  },

  computed: {
    ...mapGetters(['uid', 'stringToHSL'])
  }
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
    width: 2.25rem
    height: 2.25rem
    border-radius: 50%
    display: inline-flex
    box-shadow: inset 0 -2px 0 rgba(0,0,0,.2)
    position: relative
    color: #fff
    font-size: 0.75rem
    align-items: center
    justify-content: center
    font-weight: 600
    text-shadow: rgba(0,0,0,.2) 0 1px 0
</style>
