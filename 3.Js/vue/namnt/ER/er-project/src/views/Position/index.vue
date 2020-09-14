<template>
  <div>
    <div class="shadow-sm">
      <headerCommon class="container-lg" />
    </div>
    <div class="container-lg">
      <breadcrumb :breadcrumb="breadcrumb"/>
      <groupForm :disabled="disabled" 
        @addData="addData" 
        :dataTable="dataTable"
        :dataMess="dataMess"
        @updateData="updateData"
        @deleteData="deleteData"
        @searchData="searchData"
        @clearAll="clearAll"
      ></groupForm>
      <p :class="messError.color" class="mt-4" v-if="!messError.status">{{messError.mess}}</p>
      <p :class="searchError.color" class="mt-4" v-if="!searchError.status">{{searchError.mess}}</p>
      <tableCommon 
        :isLoading="isLoading" 
        :items="positionList" 
        :fields="headerName" 
        @sortTable="sortTable"
        @clickTable="clickTable"
      ></tableCommon>
      <pagination v-if="resetPage" :totalPage="totalPage" @changePage="changePage"/>
      <p class="text-center">Copyright © 2019 Kobelco. All rights reserved</p>
    </div>
  </div>
</template>

<script>
import headerCommon from '@/components/HeaderCommon'
import breadcrumb from '@/components/Breadcrumb'
import groupForm from '@/components/GroupForm'
import tableCommon from '@/components/TableCommon'
import pagination from '@/components/Pagination'
import { mapState } from 'vuex'
import CONTANT from '@/core/contant'
export default {
  components: {
    headerCommon,
    breadcrumb,
    groupForm,
    tableCommon,
    pagination
  },
  data() {
    return {
      items: [],
      dataTable:{
        id: '',
        positionCode: '',
        positionName: ''
      },      
      dataReload: {
        isSearch: 0,
        positionCode: '',
        positionName: '',
        currentPage: 1,
        pageRecord: CONTANT.pageRecord,
        sortBy: 'positionCode-ASC'
      },
      sort: {
        key: 'positionCode',
        type: 'ASC'
      },
      dataMess: {
        code: '',
        name: ''
      },
      breadcrumb: {

      },
      headerName: [
        {
          key: 'no',
          label: 'No',
          sort: false,
          sortType: 'ASC'
        },
        {
          key: 'positionCode',
          label: 'Position Code',
          sort: true,
          sortType: 'ASC',
          class: 'w-35 curson-on'
        },
        {
          key: 'positionName',
          label: 'Description',
          sort: true,
          sortType: 'ASC',
          class: 'w-60 curson-on'
        }
      ],
      currentPage:'',
      resetPage: true,
      disabled: true
      
    }
  },
  created() {
    this.$store.dispatch('position/loadingData', true)
    this.$store.dispatch('position/positionData', this.dataReload)
  },
  watch:{
 
  },
   computed: {
    ...mapState('position', {
      positionList : state => state.positionList,
      record: state => state.record,
      isLoading: state => state.isLoading,
      messError: state => state.messError,
      totalPage: state => state.totalPage,
      status: state => state.status,
      searchError: state => state.searchError,
      errorCode: state => state.errorCode
    }),
  },
  methods: {
    validateInput(val) {
      return val ? true : false;
    },
    sortTable(val) {
      const type = val.sortType === 'ASC' ? 'DESC' : 'ASC'
      this.sort = {
        key: val.key,
        type: type
      } 
      const data = {
        isSearch: 0,
        positionCode: '',
        positionName: '',
        currentPage: this.currentPage,
        pageRecord: CONTANT.pageRecord,
        sortBy: val.key + '-' + type
      }
      val.sortType = type
      this.$store.dispatch('position/loadingData', true)
      this.$store.dispatch('position/positionData', data)
    },

    async addData(data) {
      this.dataReload.currentPage = 1
      // Check validate positionCode & positionName not ''
      const valiCode = this.validateInput(data.positionCode)
      const valiName = this.validateInput(data.positionName)
      this.dataMess.code = valiCode === false ? CONTANT.message['013'] : ''
      this.dataMess.name = valiName === false ? CONTANT.message['014'] : ''
      // Call APi if vaildate success
      if (valiCode === true && valiName === true) {
        
        this.dataReload.sortBy = this.sort.key + '-' + this.sort.type
        this.dataReload.isSearch = 0
        await this.$store.dispatch('position/addPosition', data)
        // If call Api success to do reload page
        if ( this.errorCode === 200) {
          this.resetPage = false
          this.dataTable.positionCode = ''
          this.dataTable.positionName = ''
          await this.$store.dispatch('position/positionData', this.dataReload)
          this.resetPage = true  
        }
        // Reset message after 3s 
        this.$store.dispatch('position/resetMess', true)
  
      }
    },

    async updateData(val) {
      // Check validate positionCode & positionName not ''
      this.dataReload.sortBy = this.sort.key + '-' + this.sort.type
      this.dataReload.currentPage = this.currentPage
      const valiCode = this.validateInput(val.positionCode)
      const valiName = this.validateInput(val.positionName)
      this.dataMess.code = valiCode === false ? CONTANT.message['013'] : ''
      this.dataMess.name = valiName === false ? CONTANT.message['014'] : ''
      // Call APi if vaildate success
      if (valiCode === true && valiName === true) {
        await this.$store.dispatch('position/updatePosition', val)
        // If call Api success to do reload page
        if ( this.errorCode === 201) {
          this.dataTable.positionCode = ''
          this.dataTable.positionName = ''
          await this.$store.dispatch('position/positionData', this.dataReload)
          this.disabled = true
        }  
        // Reset message after 3s
        this.$store.dispatch('position/resetMess', true)            
      }
    },

    async deleteData(val) {
      this.dataReload.sortBy = this.sort.key + '-' + this.sort.type
      this.dataReload.currentPage = this.currentPage
      this.dataReload.isSearch = 1
      // Call API delete if errorCode return 200 call API reload table
      await this.$store.dispatch('position/deletePosition', val)   
      if ( this.errorCode === 200) {
        await this.$store.dispatch('position/positionData', this.dataReload)
        this.disabled = true
        this.dataTable.positionCode = ''
        this.dataTable.positionName = ''
      }
        this.$store.dispatch('position/resetMess', true)     
    },

    async searchData(val) {  
      this.dataReload.sortBy = this.sort.key + '-' + this.sort.type
      this.dataReload.positionCode = val.positionCode
      this.dataReload.positionName = val.positionName
      this.disabled = true
      // Check value search, if positionCode & positionName === '' => search all
      if (this.dataReload.positionCode === '' && this.dataReload.positionName === '') {
        this.dataReload.currentPage = 1
        this.dataReload.isSearch = 0
      } else {
        this.dataReload.isSearch = 1
      }
      // Call API reload dataTable
      await this.$store.dispatch('position/loadingData', true)
      await this.$store.dispatch('position/positionData', this.dataReload) 
      this.$store.dispatch('position/resetMess', true) 
    },

    clickTable(val) {
      this.dataTable = val
      this.disabled = false
    },

    async changePage(val) {
      this.currentPage = val,
      this.dataReload.sortBy = this.sort.key + '-' + this.sort.type
      this.dataReload.currentPage = val
      await this.$store.dispatch('position/loadingData', true)
      this.$store.dispatch('position/positionData', this.dataReload)
    },

    clearAll(val){
       this.dataTable = {
        id: val,
        positionCode: val,
        positionName: val
      }
     }
  },
}
</script>

<style lang="scss">
  @import "style.scss";
</style>
