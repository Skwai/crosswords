<template>
  <div class="Home">
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
        this.$router.push({ name: 'game', params: { gameId: data.game } })
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
