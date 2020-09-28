<template>
  <div>
    <Datepicker v-model="dateSeleted"  :lang="lang" format="DD/MM/YYYY" />
  </div>
</template>

<script>
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      dateSeleted:null,
      lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],

      },
    }
  },
  watch: {
    dateSeleted(val) {
      this.$emit('dateSeleted', val)
    }
  }
};
</script>
