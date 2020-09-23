<template>
  <div class="er-department px-5">
    <Department
      :dataInfo="dataInfo"
      @SearchList="SearchList"
    />
    <p v-if="resultMess.status" :class="resultMess.class">{{ $t('messages["018"]' )}}</p>
    <TableCommon 
      :fields="fields"
      :items="dataList"
      @valueRowSelect="valueRowSelect"
      @sortData="sortData"
      class="mt-5" />
      <Pagination 
      :lengthOfList="lengthOfList"
      @currentPage="changePaging"
    />
  </div>
</template>

<script>
import Department from '@/components/Department'
import TableCommon from '@/components/TableCommon'
import CONTANT from '@/core/contant'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination';
export default {
  components: {
    Department,
    TableCommon,
    Pagination
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
        id: '',
        departmentCode: '',
        departmentName: '',
      },
      lengthOfList: this.totalPage,
      currentPage: 0
    }
  },
  created() {
    this.$store.dispatch('department/loadList', this.loadPage)
  },
  computed: {
    ...mapState('department', {
      dataList : state => state.dataList,
      resultMess: state => state.resultMess,
      totalPage: state => state.totalPage
    })
  },
  methods: {
    valueRowSelect(val) {
      this.dataInfo = val
    },

    SearchList(val) {
      console.log(val)
    },

    sortData(sort, val, key) {
      const status = sort ? 'ASC' : 'DESC' 
      const data = {
        isSearch: 0,
        departmentCode: '',
        departmentName: '',
        currentPage: this.currentPage,
        pageRecord: CONTANT.pageRecord,
        sortBy: key + '-' +  status
      }
      this.$store.dispatch('department/loadList', data)
    },

    changePaging(val){
      this.currentPage = val
    },

    //Total Record in Table
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>