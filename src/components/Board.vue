<template>
  <Loading v-if="loading" />
  <div class="Board" v-else>
    <div v-for="(row, y) in board" :key="y" class="Board__Row">
      <BoardCell
        v-for="(cell, x) in row"
        :cell="cell"
        :key="x"
        :x="x"
        :y="y"
        @next="next"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoardCell from '@/components/BoardCell'
import Loading from '@/components/Loading'

export default {
  components: {
    BoardCell,
    Loading
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapGetters(['board'])
  },

  methods: {
    next () {
      console.log('next')
    }
  },

  async created () {
    await this.$store.dispatch('loadBoard', this.$route.params.boardId)
    this.loading = false
  }
}
</script>

<style lang="stylus">
@keyframes jiggle {
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.Board
  border: currentColor solid 1px
  background: currentColor
  box-shadow: currentColor 0 2px 0
  border-radius: 3px
  overflow: hidden
  animation: jiggle 0.82s cubic-bezier(.36,.07,.19,.97) both
  backface-visibility: hidden
  perspective: 1000px

  &__Row
    display: flex

    + .Board__Row
      margin-top: 1px
</style>
