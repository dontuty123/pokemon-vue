<template>
  <div id="app">
    <Index :key="$route.fullPath" />
  </div>
</template>
<script>
import Index from '@/views/index'
export default {
  components: {
    Index
  },
  data() {
    return {
     
    }
  },
  created(){

  },

}
</script>
<style lang='scss'>

</style>
