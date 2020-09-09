<template>
  <div>
   
    <b-overlay :show="isLoading" rounded="sm">
      <table class="table-list mt-4">
        <thead>
          <tr >
            <th 
              v-for="(item, index) in fields" 
              :key="index" :class="fields[index].class"
              @click="sortData(fields[index])"
            >
              {{fields[index].label}}
              <div class="sort-data">
                <b-icon v-if="fields[index].sort" icon="caret-down-fill"
                 font-scale="0.5" 
                 class="ml-2" 
                 :rotate="fields[index].sortType ==='ASC' ? 0 : 180 "
                  ></b-icon>
              </div>
            </th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(item, index) in items " :key="index" @click="clickRow(item)">
            <td 
              v-for="(item1, index1) in fields " 
              :key="index1"
            >
                {{ item1.key === 'no' ? index + 1 : item1.key === 'active' ? '' : item[item1.key]}}
                <b-form-checkbox 
                  v-if="!item1.checkbox && item1.key === 'active'"
                  unchecked-value = 0
                  value= 1
                  v-model="item[item1.key]"
                  disabled
                ></b-form-checkbox> 
            </td>
          </tr>
        </tbody>
      </table>
    </b-overlay>
    </div>
</template>

<script>
export default {
  name: 'tableCommon',
  data() {
      return {
        rotate: 0,
        status: 0
      }
    },
  props: ['items', 'fields', 'isLoading'],
   computed: {
  },

  methods: {
    clickRow(val) {
      this.$emit('clickTable', val)
    },

    sortData(val) {
      this.$emit('sortTable', val)
    }
  }
}
</script>

<style lang="scss">
 @import "style.scss";
</style>
