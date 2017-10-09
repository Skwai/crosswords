<template>
  <div class="Clues">
    <div class="Clues__Col">
      <h4>Down</h4>
      <Clue v-for="(clue, key) in down" :key="key" :num="key" dir="down">{{clue}}</Clue>
    </div>
    <div class="Clues__Col">
      <h4>Across</h4>
      <Clue v-for="(clue, key) in across" :key="key" :num="key" dir="across">{{clue}}</Clue>
    </div>
  </div>
</template>

<script>
import Clue from '@/components/Clue'

export default {
  props: ['clues'],

  components: {
    Clue
  },

  computed: {
    across () {
      const { clues: { across } } = this
      return Object.keys(across).reduce((obj, k) => {
        const num = k.replace(/\D/g, '')
        return Object.assign(obj, { [num]: across[k] })
      }, {})
    },
    down () {
      const { clues: { down } } = this
      return Object.keys(down).reduce((obj, k) => {
        const num = k.replace(/\D/g, '')
        return Object.assign(obj, { [num]: down[k] })
      }, {})
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.Clues
  display: flex
  max-width: 40rem

  &__Col
    flex: 0 0 50%
    padding: spacingSmall
</style>
