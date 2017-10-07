<template>
  <Loading v-if="loading" />
  <div class="Game" v-else-if="game">
    <Users :users="game.users" />
    <Board :boardId="game.board" />
    <!--<GamePermalink :boardId="game.board" />-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Board from '@/components/Board'
import Loading from '@/components/Loading'
import Users from '@/components/Users'
import GamePermalink from '@/components/GamePermalink'

export default {
  components: {
    Board,
    Loading,
    Users,
    GamePermalink
  },

  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters(['game'])
  },

  async created () {
    await this.$store.dispatch('loadGame', this.$route.params.gameId)
    this.loading = false
  }
}
</script>

<style lang="stylus">

</style>
