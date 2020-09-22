<template>
  <div class="er-breadcrumb">
     <ul class="breadcrumb">
       <li v-for="item in breadcrumb" :key="item.id">
         <router-link :to="item.url">{{ $t(item.label) }}</router-link>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
     
    };
  },
  props: {
    breadcrumb: {
      type: Array,
      required: false,
    },
  },
 
};
</script>

<style lang='scss' scoped>
  @import 'style.scss';
</style>