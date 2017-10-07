<template>
  <div>
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
      await new Promise((resolve) => setTimeout(resolve, 2000))
      this.$router.push({ name: 'game', params: { boardId: 1 } })
      this.loading = false
    }
  }
}
</script>

<style>
</style>
