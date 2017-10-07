<template>
  <div class="Clues">
    <div class="Clues__Col">
      <h4>Down</h4>
      <Clue num="1" dir="down">The principal church of a city</Clue>
      <Clue num="2" dir="down">Dancing act heard close to Torvill and Dean's workplace</Clue>
      <Clue num="3" dir="down">Convert (novel) for the screen</Clue>
      <Clue num="4" dir="down">The principal church of a city</Clue>
      <Clue num="5" dir="down">The principal church of a city</Clue>
    </div>
    <div class="Clues__Col">
      <h4>Across</h4>
      <Clue num="1" dir="across">The principal church of a city</Clue>
      <Clue num="2" dir="across">Dancing act heard close to Torvill and Dean's workplace</Clue>
      <Clue num="3" dir="across">Convert (novel) for the screen</Clue>
      <Clue num="4" dir="across">Convert (novel) for the screen</Clue>
      <Clue num="5" dir="across">Convert (novel) for the screen</Clue>
    </div>
  </div>
</template>

<script>
import Clue from '@/components/Clue'

export default {
  props: ['size'],

  components: {
    Clue
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
