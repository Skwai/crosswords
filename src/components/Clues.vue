<template>
  <div class="Clues">
    <button v-if="hasClueToggle" @click="toggleClueType" class="Clues__Toggle">
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
  props: ['clue', 'cryptic'],

  components: {
    Clue
  },

  data () {
    return {
      clueType: null
    }
  },

  created () {
    this.clueType = this.clue ? 'clue' : 'cryptic'
  },

  methods: {
    toggleClueType () {
      this.clueType = this.clueType === 'clue' ? 'cryptic' : 'clue'
    }
  },

  computed: {
    hasClueToggle () {
      return this.cryptic && this.clue
    },
    across () {
      const clues = this[this.clueType]
      return Object.keys(clues.across).reduce((obj, k) => {
        const num = k.replace(/\D/g, '')
        return Object.assign(obj, { [num]: clues.across[k] })
      }, {})
    },
    down () {
      const clues = this[this.clueType]
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
  h4
    margin: 0 0 1rem

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
    margin-bottom: spacingBase

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
    @media (min-width: 640px)
      display: flex

  &__Col
    padding: spacingSmall

    @media (min-width: 640px)
      flex: 0 0 50%
</style>
