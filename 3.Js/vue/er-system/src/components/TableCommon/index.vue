<template>
  <div class="er-table-commom">
    <table class="table-comp table-bordered mb-4">
      <thead>
        <th
          v-for="(item, index) in fields"
          :key="index"
          :class="fields[index].class"
          @click="sortTable(fields[index].valueSort)"
        >
          <span>{{ fields[index].label }}</span>
          <b-icon
            v-if="fields[index].sort && (fields[index].valueSort === 1 || fields[index].valueSort === 2)"
            icon="caret-down-fill"
            class="icon-arrow"
            :rotate="fields[index].valueSort === 1 ? rotate1 ?  0 : 180  : rotate2 ?  0 : 180 "
          ></b-icon>
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          @click="valueRowSelected(item)"
          :class="{'selected': (item == selectedItem)}"
        >
          <td v-for="(td, num) in fields " :key="num">
            <span>{{ td.key === 'id' ? index + 1 : td.key === 'active' ? '' : item[td.key]}}</span>
            <b-form-checkbox
              v-if="td.key === 'active'"
              v-model="item[td.key]"
              value="1"
              unchecked-value="0"
              disabled
            ></b-form-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Tablecommon',

  data() {
    return {
      sortData: true,
      rotate1: true,
      rotate2: true,
      selectedItem: null
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
    }
  },
  
  methods: {
    //Select rows to Form
    valueRowSelected(val){
      this.selectedItem = val
      this.$emit('valueRowSelect', JSON.stringify(val))
    },
    //Sort Table
    sortTable(val){
      if (val === 1) {
         this.rotate1 = !this.rotate1
      }
      if (val === 2) {
         this.rotate2 = !this.rotate2
      }
      this.sortData = !this.sortData 
      this.$emit('sortData', this.sortData, val)
    }
  },

  mounted() {
    
  },

  computed: {
    
  },
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
