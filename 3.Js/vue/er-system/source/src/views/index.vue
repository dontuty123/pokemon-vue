<template>
  <div id="er-system-management">
    <div v-if="!isError">
      <Header v-if="checkLogged" />
    </div>
    <router-view class="body-content" @initErrorPage="initErrorPage" />
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
     isError: false,
    }
  },
  methods: {
    initErrorPage(val) {
      console.log(val);
      val ? this.isError = val : this.isError = false
      console.log(this.isError);
    },
  },
  mounted() {
    this.checkLogged = auth.checkAuth('Logged');
  }
}
</script>
<style lang='scss'>
  @import 'style.scss';
</style>
