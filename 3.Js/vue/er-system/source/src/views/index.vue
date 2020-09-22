<template>
  <div id="er-system-management">
    <Header v-if="dataRole.isLogin" />
    <router-view/>
    <Footer />
    <ScrollTop v-if="dataRole.isLogin" />
  </div>
</template>
<script>
import ScrollTop from '@/components/GoTop'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mapState } from 'vuex'
export default {
  components: {
    ScrollTop,
    Header,
    Footer
  },
  data() {
    return {
     
    }
  },
  computed: {
    ...mapState('userRole', {
      dataRole: (state) => state.dataRole,
    })
  },
  methods: {
    //Call Data User Role
    getDataUserRole() {
      this.$store.dispatch('userRole/getDataUser')
    }
  },
  mounted() {
    this.getDataUserRole()
  }

}
</script>
<style lang='scss'>
  @import 'style.scss';
</style>
