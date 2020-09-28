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
      class="pagination mb-5"
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
  props:{
    lengthOfList: {
      type: Number,
      required: false,
    },
    resetCurrentPage: {
      type: Number,
      required: false,
    }
  },
  methods: {
    //Send current page for table
    changeNumberPage() {
      this.$nextTick(() => {
        this.$emit('currentPage', this.currentPage)
      });
    }
  },
  watch: {
    resetCurrentPage(val) {
      this.currentPage = 1  
    },
  },
}
</script>

<style lang='scss' scoped>
  @import 'style.scss';
</style>
