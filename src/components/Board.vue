<template>
  <Loading v-if="loading" />
  <div class="Board" v-else>
    <div v-for="(row, y) in sortKeys(board)" :key="y" class="Board__Row">
      <BoardCell
        v-for="(cell, x) in sortKeys(row)"
        :cell="cell"
        :key="x"
        :x="'x' + x"
        :y="'y' + y"
        :boardId="boardId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoardCell from '@/components/BoardCell'
import Loading from '@/components/Loading'

export default {
  props: ['boardId'],

  components: {
    BoardCell,
    Loading
  },

  data () {
    return {
      loading: true
    }
  },

  methods: {
    sortKeys (obj) {
      return Object.entries(obj)
        .reduce((obj, [k, v]) => Object.assign(obj, { [k.replace(/\D/g, '')]: v }), {})
    }
  },

  computed: {
    ...mapGetters(['board'])
  },

  async created () {
    await this.$store.dispatch('loadBoard', this.boardId)
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Board
  border: currentColor solid 2px
  background: currentColor
  box-shadow: currentColor 0 2px 0
  border-radius: borderRadius
  overflow: hidden
  backface-visibility: hidden
  perspective: 1000px
  flex-wrap: wrap
  width: auto
  display: inline-flex
  flex-direction: column
  margin: 0 auto $spacingBase

  &__Row
    display: flex
    flex: 0 1

    + .Board__Row
      margin-top: 2px
</style>
