<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalPage"
      :per-page="perPage"
      first-number
      last-number
      class="pb-5 pt-3 d-flex justify-content-end"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPage: 1,
      currentPage: 1
    }
  },
  props: ['totalPage', 'reset'],
  watch: {
    currentPage(val) {
      this.$emit('changePage', val)
    },
  }
}
</script>

<style>

</style>
