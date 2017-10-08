<template>
  <div class="NotFound">
    <div>
      <h1 class="NotFound__Heading">404</h1>
      <h2 class="NotFound__Description">Not found</h2>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import Loading from '@/components/Loading'

export default {
  components: {
    Btn,
    Loading
  },

  data () {
    return {
      loading: false
    }
  },

  methods: {
    async generate () {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 2000))
      this.$router.push({ name: 'game', params: { gameId: 'game1' } })
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
.NotFound
  text-align: center
  display: flex
  min-height: 50vh
  align-items: center

  &__Heading
    font-size: 7vmin
    margin: 0

  &__Description
    margin: 0
    opacity: .5
</style>
