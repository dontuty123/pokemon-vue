<template>
  <div class="er-department px-5">
    <Department
      :dataInfo="dataInfo"
    />
    <p v-if="resultMess.status" :class="resultMess.class">{{$t('messages["018"]')}}</p>
    <TableCommon 
      :fields="fields"
      :items="dataList"
      @valueRowSelect="valueRowSelect"
      class="mt-5" />
  </div>
</template>

<script>
import Department from '@/components/Department'
import TableCommon from '@/components/TableCommon'
import CONTANT from '@/core/contant';
import { mapState } from 'vuex'
export default {
  components: {
    Department,
    TableCommon,
  },
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: 'table["no"]',
          class: 'width-1  text-center',
          sort: false,
        },
        {
          key: 'departmentCode',
          label: 'table["code"]',
          class: '',
          sort: true,
          valueSort: 1,
        },
        {
          key: 'departmentName',
          label: 'table["description"]',
          class: 'width-70',
          sort: true,
          valueSort: 2,
        }
      ],
      loadPage:{
        isSearch: 0,
        departmentCode: '',
        departmentName: '',
        currentPage: 1,
        pageRecord: CONTANT.pageRecord,
        sortBy: 'departmentCode-ASC'
      },
      dataInfo: {
        departmentCode: '',
        departmentName: '',
      } 
    }
  },
  created() {
    this.$store.dispatch('department/loadList', this.loadPage)
  },
  computed: {
    ...mapState('department', {
      dataList : state => state.dataList,
      resultMess: state => state.resultMess
    })
  },
  methods: {
    valueRowSelect(val) {
      
      this.dataInfo = JSON.parse(val)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>