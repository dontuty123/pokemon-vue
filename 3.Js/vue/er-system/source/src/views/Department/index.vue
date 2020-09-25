<template>
  <div class="er-department px-5">
    <Breadcrumb :breadcrumb="breadcrumb" />
    <Department
      :dataInfo="dataInfo"
      :disabled="disabled"
      @searchList="searchList"
      @addList="addList"
      @updateList="updateList"
      @deleteList="deleteList"
      @clearList="clearList"
      @exportList="exportList"
    />
    <p 
      v-if="dataMess.status" 
      :class="dataMess.class"
      class="mt-2"
      >{{ successMess }}</p>
    <p 
      v-if="resultMess.status" 
      :class="resultMess.class"
      class="mt-2"
      >{{ errorMess }}</p>
    <TableCommon 
      :fields="fields"
      :items="dataList"
      @valueRowSelect="valueRowSelect"
      @sortData="sortData"
      class="mt-4" />
      <Pagination 
      :lengthOfList="lengthOfList"
      @currentPage="changePaging"
      v-if="reset"
    />
  </div>
</template>

<script>
import Department from '@/components/Department'
import TableCommon from '@/components/TableCommon'
import CONTANT from '@/core/contant'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/Breadcrumb'
import resetValueObj from '@/core/util/resetValueObj'
export default {
  components: {
    Department,
    TableCommon,
    Pagination,
    Breadcrumb
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
      breadcrumb: [
        {
          id:1,
          label: 'breadcrumb["master"]',
          url: '/',
        },
        {
          id:2,
          label: 'breadcrumb["employee"]',
          url: '/employee',
        },
        {
          id:3,
          label: 'breadcrumb["department"]',
          url: '/department',
        },
      ],
      lengthOfList: 0,
      currentPage: 0,
      keySort: '',
      searchStaus: 0,
      successMess: '',
      errorMess: '',
      reset: true,
      disabled: true, 
      dataSearch: {
        departmentCode: '',
        departmentName: ''
      }      
    }
  },
  created() {
    // Load data when create page
    this.$store.dispatch('department/loadList', this.loadPage)
  },
  watch: {
    totalRecord(val) {
      this.lengthOfList = val
    }
  },
  computed: {
    ...mapState('department', {
      dataList : state => state.dataList,
      resultMess: state => state.resultMess,
      totalRecord: state => state.totalRecord,
      http_code: state => state.http_code,
      dataMess: state => state.dataMess,
      secretKey: state => state.secretKey,
      linkExport: state => state.linkExport
    })
  },
  methods: {
    // Click row table get data and input from data
    valueRowSelect(val) {
      this.dataInfo = val
      this.disabled = false
    },

    //Sort data in table department
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
      // Reload data to sort 
      this.$store.dispatch('department/loadList', data)
    },

    changePaging(val) {
      this.currentPage = val
      const data = this.loadPage
      data.sortBy = this.keySort === '' ? 'departmentCode-ASC' : this.keySort
      data.currentPage = val,
      this.$store.dispatch('department/loadList', data)
    },

    // Call API search data in department list
    async searchList(val) {
      const data = {
        isSearch: val.departmentCode === '' && val.departmentName === '' ? 0 : 1,
        departmentCode: val.departmentCode,
        departmentName: val.departmentName,
        currentPage: 1,
        pageRecord: CONTANT.pageRecord,
        sortBy: this.keySort === '' ? 'departmentCode-ASC' : this.keySort
      }
      this.dataSearch = val
      await this.$store.dispatch('department/searchData', data)
      // If search data success reload table department
      if (this.http_code === 200) {
        this.$store.dispatch('department/loadList', data)
        this.successMess = this.$t('messages[' + this.dataMess.content + ']')
        this.errorMess = this.resultMess.content !== '' ? this.$t('messages[' + this.resultMess.content + ']') : ''
        this.disabled = true
      }
      this.searchStaus = data.isSearch
      this.$store.dispatch('department/resetMess')
      this.messName = true
      this.messCode = true
    },

    // Call API add data in department list
    async addList(val ,validate) {
      // If validate success call API add
      if (validate) {
        await this.$store.dispatch('department/addData', val)
        //If add success reload table else don't reload table and show messages
        if (this.http_code === 200) {
          this.reset = false
          this.loadPage.isSearch = 0
          await this.$store.dispatch('department/loadList', this.loadPage)
          this.successMess = this.$t('messages[' + this.dataMess.content + ']')
          const dataClear = []
          this.dataInfo = resetValueObj.clear(this.dataInfo, dataClear)
          this.reset = true
          this.disabled = true
        } else {
          this.errorMess = this.$t('messages[' + this.resultMess.content + ']')
        }
        this.$store.dispatch('department/resetMess')
      }
    },

    // Call API add data in department list
    async updateList(val, validate) {
      // If validate success call API update
      if (validate) {
        const data = this.loadPage
        data.isSearch = this.searchStaus
        data.departmentCode =this.dataSearch.departmentCode
        data.departmentName = this.dataSearch.departmentName,
        data.currentPage = this.currentPage,
        data.sortBy = this.keySort === '' ? 'departmentCode-ASC' : this.keySort
        //If update success reload table else don't reload table and show messages
        await this.$store.dispatch('department/updateData', val)
        if (this.http_code === 201) {
          this.successMess = this.$t('messages[' + this.dataMess.content + ']')
          await this.$store.dispatch('department/loadList', data)
          const dataClear = []
          this.dataInfo = resetValueObj.clear(this.dataInfo, dataClear)
          this.disabled = true
        } else {
          this.errorMess = this.$t('messages[' + this.resultMess.content + ']')
        }
        this.$store.dispatch('department/resetMess')
      }
    },

    // Call API delete data in department list
    async deleteList(val) {
      await this.$store.dispatch('department/deleteData', val)
      //If delete success reload table else and show messages
      if (this.http_code === 200) {
        const data = this.loadPage
        data.isSearch = this.searchStaus
        data.departmentCode = this.dataSearch.departmentCode
        data.departmentName = this.dataSearch.departmentName,
        data.currentPage = this.currentPage,
        data.sortBy = this.keySort === '' ? 'departmentCode-ASC' : this.keySort
        await this.$store.dispatch('department/loadList', data)
        this.successMess = this.$t('messages[' + this.dataMess.content + ']')
        this.errorMess = this.$t('messages[' + this.resultMess.content + ']')
        const dataClear = []
        this.dataInfo = resetValueObj.clear(this.dataInfo, dataClear)
        this.disabled = true
      } else {
        // If delete fail show messages and don't reload table
        this.errorMess = this.$t('messages[' + this.resultMess.content + ']')
      }
      this.$store.dispatch('department/resetMess')
    },

    //Export file excel
    async exportList(val) {
      //Call API get new secretKey
      await this.$store.dispatch('department/secretKey', '')
      // Get new secretKey success call API export file excel
      if (this.http_code === 200) {
        const data = {
          departmentCode: this.searchStaus === 1 ? val.departmentCode : '',
          departmentName: this.searchStaus === 1 ? val.departmentName : '',
          sortBy: this.keySort === '' ? 'departmentCode-ASC' : this.keySort,
          secretKey: this.secretKey
        }
        await this.$store.dispatch('department/exportFile', data)
        window.open(this.linkExport, '_blank')
      }
    },

    clearList(val) {
      const dataClear = []
      this.dataInfo = resetValueObj.clear(val, dataClear)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>
