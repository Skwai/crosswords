<template>
  <main id="app">
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
@import url("https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700")

html
  font-size: (fontSize - 3px)

  @media (min-width: 640px)
    font-size: (fontSize - 2px)

  @media (min-width: 768px)
    font-size: (fontSize - 1px)

  @media (min-width: 1024px)
    font-size: fontSize

body
  margin: 0
  font-family: "Merriweather Sans", Helvetica, Arial, sans-serif
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
