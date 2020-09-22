<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer/>
    <ScrollTop />
  </div>
</template>
<script>
import ScrollTop from '@/components/GoTop'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    ScrollTop,
    Header,
    Footer
  },
  data() {
    return {
      isLoad: true
    }
  },
  created(){

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
