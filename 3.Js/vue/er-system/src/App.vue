<template>
  <div id="app">
    <router-view/>
     <ScrollTop />
  </div>
</template>
<script>
import ScrollTop from '@/components/GoTop'

export default {
  components: {
    ScrollTop
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
</style>
