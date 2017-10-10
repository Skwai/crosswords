<template>
  <div class="Clues">
    <button v-if="hasCrypticClues" @click="toggleClueType" class="Clues__Toggle">
      <span class="Clues__ToggleOption" :class="{ '-selected': clueType === 'clue' }">Clues</span>
      <span class="Clues__ToggleOption" :class="{ '-selected': clueType === 'cryptic' }">Cryptic</span>
    </button>
    <div class="Clues__Row">
      <div class="Clues__Col">
        <h4>Down</h4>
        <Clue v-for="(clue, key) in down" :key="key" :num="key" dir="down">{{clue}}</Clue>
      </div>
      <div class="Clues__Col">
        <h4>Across</h4>
        <Clue v-for="(clue, key) in across" :key="key" :num="key" dir="across">{{clue}}</Clue>
      </div>

    </div>
  </div>
</template>

<script>
import Clue from '@/components/Clue'

export default {
  props: ['clues', 'cryptic'],

  components: {
    Clue
  },

  data () {
    return {
      clueType: 'clue'
    }
  },

  methods: {
    toggleClueType () {
      this.clueType = this.clueType === 'clue' ? 'cryptic' : 'clue'
    }
  },

  computed: {
    hasCrypticClues () {
      return true // return Object.keys(this.cryptic || {}).length
    },
    across () {
      const { clues } = this
      return Object.keys(clues.across).reduce((obj, k) => {
        const num = k.replace(/\D/g, '')
        return Object.assign(obj, { [num]: clues.across[k] })
      }, {})
    },
    down () {
      const { clues } = this
      return Object.keys(clues.down).reduce((obj, k) => {
        const num = k.replace(/\D/g, '')
        return Object.assign(obj, { [num]: clues.down[k] })
      }, {})
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.Clues
  background: fontColor
  color: #fff
  padding: spacingBase
  justify-content: center
  flex: 1 0
  height: 100vh

  &__Toggle
    border-radius: borderRadius
    display: inline-flex
    border: 0
    padding: 0
    box-shadow: inset #fff 0 0 0 2px, #fff 0 2px 0
    background: transparent
    color: #fff
    overflow: hidden
    cursor: pointer
    font-size: 0.875rem
    margin: 0 spacingSmall

    &:focus
      outline: 0

    &Option
      padding: 0.75rem 1rem

      &.-selected,
      &:hover,
      &:focus
        background: #fff
        color: fontColor

  &__Row
    display: flex

  &__Col
    flex: 0 0 20rem
    padding: spacingSmall
</style>
