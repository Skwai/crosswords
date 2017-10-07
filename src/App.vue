<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="stylus">
@require "./styles/config.styl"
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:400,700")

html
  font-size: fontSize

body
  margin: 0
  font-family: "Roboto Slab", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #222
  font-weight: 500
  background: #dadbdc linear-gradient(135deg, #fff, #dadbdc)

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
  padding-top: 5vh
  display: flex
  justify-content: center
</style>
