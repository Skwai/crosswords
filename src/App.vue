<template>
  <main id="App">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  async created () {
    await this.$store.dispatch('auth')
  }
}
</script>

<style lang="stylus">
@require "./styles/config.styl"
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:400,700")

html
  font-size: (fontSize - 2px)

  @media (min-width: 768px)
    font-size: (fontSize - 1px)

  @media (min-width: 1280px)
    font-size: fontSize

body
  margin: 0
  font-family: "Roboto Slab", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: fontColor
  font-weight: 500
  background: #eaebec linear-gradient(135deg, #fff, #eaebec)

textarea,
select,
button,
input
  font-family: inherit
  font-size: inherit
  line-height: inherit

*
  box-sizing: border-box

#app
  min-height: 100vh
  width: 100%
  display: flex
  justify-content: center
</style>
