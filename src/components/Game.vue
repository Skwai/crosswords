<template>
  <Loading v-if="loading" />
  <div class="Game" v-else-if="game">
    <Users :users="game.users" />
    <Board :boardId="game.board" />
    <Clues :clues="game.clues" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Board from '@/components/Board'
import Loading from '@/components/Loading'
import Users from '@/components/Users'
import Clues from '@/components/Clues'

export default {
  components: {
    Board,
    Loading,
    Users,
    Clues
  },

  data () {
    return {
      gameId: null,
      loading: true
    }
  },

  computed: {
    ...mapGetters(['game', 'uid'])
  },

  async created () {
    this.gameId = this.$route.params.gameId

    try {
      await this.$store.dispatch('loadGame', this.gameId)
      await this.$store.dispatch('joinGame', {
        gameId: this.gameId,
        userId: this.uid
      })
    } catch (err) {
      this.$router.push('/404')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">

</style>
