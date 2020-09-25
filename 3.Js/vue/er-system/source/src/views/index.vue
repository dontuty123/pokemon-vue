<template>
  <div id="er-system-management">
    <Header v-if="checkLogged || checkError" />
    <router-view class="body-content" />
    <Footer />
    <ScrollTop v-if="checkLogged" />
  </div>
</template>
<script>
import ScrollTop from '@/components/GoTop' 
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import auth from '@/core/service/checkAuth';

export default {
  components: {
    ScrollTop,
    Header,
    Footer
  },
  data() {
    return {
     checkLogged: false,
     checkError: false
    }
  },
  methods: {
    errorPage(val) {
      this.isError = val
      this.checkLogged = false
    }
  },
  mounted() {
    this.checLogged = auth.checkAuth('Logged');
    this.checkError = auth.checkAuth('Error');
  }

}
</script>
<style lang='scss'>
  @import 'style.scss';
</style>
