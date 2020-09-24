<template>
  <div class="er-department px-5">
    <Department
      :dataInfo="dataInfo"
      @SearchList="SearchList"
    />
    <p v-if="dataMess.status" :class="dataMess.class">{{ successMess }}</p>
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
      currentPage: 0,
      keySort: '',
      searchStaus: 0,
      successMess: ''      
    }
  },
  created() {
    this.$store.dispatch('department/loadList', this.loadPage)
  },
  computed: {
    ...mapState('department', {
      dataList : state => state.dataList,
      resultMess: state => state.resultMess,
      totalPage: state => state.totalPage,
      http_code: state => state.http_code,
      dataMess: state => state.dataMess
    })
  },
  methods: {
    valueRowSelect(val) {
      this.dataInfo = val
    },

    sortData(sort, val, key) {
      const status = sort ? 'ASC' : 'DESC' 
      this.keySort = key + '-' +  status
      const data = {
        isSearch: this.searchStaus,
        departmentCode: this.dataInfo.departmentCode,
        departmentName: this.dataInfo.departmentName,
        currentPage: this.currentPage,
        pageRecord: CONTANT.pageRecord,
        sortBy: this.keySort
      }
      this.$store.dispatch('department/loadList', data)
    },

    changePaging(val) {
      this.currentPage = val
    },

    async SearchList(val) {
      const data = {
        isSearch: val.departmentCode === '' && val.departmentName === '' ? 0 : 1,
        departmentCode: val.departmentCode,
        departmentName: val.departmentName,
        currentPage: 1,
        pageRecord: CONTANT.pageRecord,
        sortBy: this.keySort === '' ? 'departmentCode-ASC' : this.keySort
      }
      await this.$store.dispatch('department/searchData', data)
      if (this.http_code === 200) {
        this.$store.dispatch('department/loadList', data)
        this.successMess = this.$t('messages[' + this.dataMess.content + ']')
      }
      this.searchStaus = data.isSearch
      this.$store.dispatch('department/resetMess')
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>