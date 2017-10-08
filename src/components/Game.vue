<template>
  <Loading v-if="loading" />
  <div class="Game" v-else-if="game">
    <Users :users="game.users" />
    <Board :boardId="game.board" />
    <Clues />
    <!--<GamePermalink :boardId="game.board" />-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Board from '@/components/Board'
import Loading from '@/components/Loading'
import Users from '@/components/Users'
import GamePermalink from '@/components/GamePermalink'
import Clues from '@/components/Clues'

export default {
  components: {
    Board,
    Loading,
    Users,
    GamePermalink,
    Clues
  },

  data () {
    return {
      gameId: null,
      loading: false
    }
  },

  computed: {
    ...mapGetters(['game', 'uid'])
  },

  async created () {
    this.gameId = this.$route.params.gameId
    await this.$store.dispatch('loadGame', this.gameId)
    await this.$store.dispatch('joinGame', {
      gameId: this.gameId,
      userId: this.uid
    })
    this.loading = false
  }
}
</script>

<style lang="stylus">

</style>
