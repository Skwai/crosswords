<template>
  <div class="Home">
    <Header class="Home__Header">
      <img class="Home__Logo" src="../assets/logo.svg">
      <h1>WordHerd</h1>
      <p>The most dankest crossword app you've ever laid your peeping balls on.</p>
    </Header>
    <Loading v-if="loading" />
    <Btn v-else @click="generate">Create a crossword</Btn>
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
      try {
        const response = await fetch('/generate')
        const data = await response.json()
        if (!data.game) throw Error('No game was created')
        this.$router.push({ name: 'game', params: { gameId: data.game } })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.Home
  text-align: center

  &__Header
    margin-bottom: spacingBase

  // https://commons.wikimedia.org/wiki/File:Larry-the-cow-full.svg
  &__Logo
    width: 10rem
    margin-top: spacingBase
</style>
