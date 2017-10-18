<template>
  <Loading v-if="loading" />
  <div class="Game" v-else-if="game">
    <!--
    <div class="Game__Users">
      <Users :users="game.users" />
    </div>
    -->
    <div class="Game__Board">
      <Board :boardId="game.board" />
    </div>
    <div class="Game__Details">
      <Clues
        :clue="game.clue"
        :cryptic="game.cryptic"
      />
    </div>
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
    max-width: 100vw
    box-shadow: rgba(0,0,0,.15) 0 0 1rem
    overflow-x: scroll

    @media (min-width: 1024px)
      overflow: visible

  &__Details
    padding: spacingBase
    justify-content: center
    width: 100%
    max-width: 100vw
    background: rgba(0,0,0,.05)

    @media (min-width: 1024px)
      flex: 1 0
      min-height: 100vh
</style>
