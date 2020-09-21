<template>
  <div>
    <b-pagination
      first-number
      last-number
      aria-controls="my-table"
      align="right"
      class="pagination"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      perPage: 0,
      currentPage: 1,
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

<style lang='scss' scoped>
  @import 'style.scss';
</style>