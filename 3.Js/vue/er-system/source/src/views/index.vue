<template>
  <div id="er-system-management">
    <Header v-if="checLogged" />
    <router-view class="body-content" />
    <Footer />
    <ScrollTop v-if="checLogged" />
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
     checLogged: false,
    }
  },
  methods: {
    
  },
  mounted() {
    this.checLogged = auth.checkAuth('Logged');
  }

}
</script>
<style lang='scss'>
  @import 'style.scss';
</style>
