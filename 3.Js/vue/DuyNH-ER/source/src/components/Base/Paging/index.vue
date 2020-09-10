<template>
  <div>
    <b-pagination
      first-number
      last-number
      aria-controls="my-table"
      v-model="currentPage"
      :total-rows="lengthOfList"
      @change="changeNumberPage()"
      align="right"
      class="pagination"
    ></b-pagination>
  </div>
</template>
<script>
export default {
  name: 'Paging',
  data() {
    return {
      perPage: 0,
      currentPage: 1,
    }
  },

  props:{
    numberPage: {
      type: Number,
      required: false,
    },
    lengthOfList: {
      type: Number,
      required: false,
    }
  },

  methods: {
    //Send current page for table
    changeNumberPage(){
      this.$nextTick(() => {
        this.$emit('currentPage', this.currentPage)
      });
    }
  },
  watch: {
    numberPage(val){
      this.currentPage = val
    }
  },
}
</script>
<style scoped lang='scss'>
    @import 'style.scss';
</style>
