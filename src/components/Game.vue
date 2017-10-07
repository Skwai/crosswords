<template>
  <div class="Game">
    <GamePermalink :boardId="$route.params.boardId" />
    <Board :boardId="$route.params.boardId" />
  </div>
</template>

<script>
import Board from '@/components/Board'
import GamePermalink from '@/components/GamePermalink'

export default {
  components: {
    Board,
    GamePermalink
  }
}
</script>

<style lang="stylus">
</style>
