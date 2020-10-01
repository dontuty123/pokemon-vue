<template>
  <div class="er-table-commom">
    <table class="table-comp table-bordered mb-4 table-responsive">
      <thead>
        <th
          v-for="(item, index) in fields"
          :key="index"
          :class="fields[index].class"
        >
          <span> {{ $t(fields[index].label) }}</span>
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          @click="valueRowSelected(item)"
        >
          <td v-for="(td, num) in fields " :key="num">
            <span>{{ td.key === 'workLogDate' ? item[td.key] : item[td.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TableLogwork',
  data() {
    return {
      selectedItem: null,
      numberLog: new Date()
    };
  },
  
  props:{
    items: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: false,
    },
    
  },

  methods: {
    //Select rows to Form
    valueRowSelected(val) {
      this.selectedItem = val
      this.$emit('valueRowSelect', JSON.parse(JSON.stringify(val)))
    },
  },

  computed: {
  
  },

  watch: {
    items(val) {
      let findIndex = val.findIndex(item => {
        return item.workLogDate
      })
      if (findIndex > -1) {
        this.numberLog = new Date(val[findIndex].workLogDate[0].date);
      }
    }
  }
};
</script>

<style scoped lang='scss'>
  @import 'style.scss';
</style>
