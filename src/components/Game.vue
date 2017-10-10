<template>
  <Loading v-if="loading" />
  <div class="Game" v-else-if="game">
    <div class="Game__Board">
      <Users :users="game.users" />
      <Board :boardId="game.board" />
    </div>
    <Clues
      :clue="game.clue"
      :cryptic="game.cryptic"
    />
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
@require "../styles/config.styl"

.Game
  width: 100%
  display: flex
  flex-direction: column

  @media (min-width: 1024px)
    flex-direction: row

  &__Board
    flex: 1
    padding: spacingBase
    text-align: center
</style>
