<template>
  <div>
    <div class="shadow-sm">
      <headerCommon class="container-lg" />
    </div>
    <div class="container-lg">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to='"/"'>Master</router-link></li>
          <li class="breadcrumb-item"><router-link :to='"/project"'>Project</router-link></li>
        </ol>
      </nav>
     <groupProject
      :disabled="disabled"
      :options="typeList"
      :dataForm="dataForm"
      :dataMess="dataMess"
      :isLoading="isLoading"
      @addProjectData="addProjectData"
      @searchProjectData="searchProjectData"
      @updateProjectData="updateProjectData"
      @deleteProjectData="deleteProjectData"
      @exportData="exportData"
      @clearData="clearData"
     ></groupProject>
     <p :class="messCode.class">{{messCode.mess}}</p>
     <p :class="searchError.class" class="mt-4" v-if="!searchError.status">{{searchError.mess}}</p>
      <tableCommon
        :isLoading="isLoading"
        :fields="headerName" 
        :items="projectList.result"
        @clickTable="clickTable"
        @sortTable="sortTable"
      >
      </tableCommon>
      <pagination v-if="resetPage" :totalPage="totalPage" @changePage="changePage"/>
    </div>
    <p class="text-center">Copyright © 2019 Kobelco. All rights reserved</p>
  </div>
</template>

<script>
import headerCommon from '@/components/HeaderCommon'
import groupProject from '@/components/GroupProject'
import tableCommon from '@/components/TableCommon'
import CONTANT from '@/core/contant'
import { mapState } from 'vuex'
import pagination from '@/components/Pagination'
import operater from '@/core/util/operater.action'
export default {
   components: {
    headerCommon,
    groupProject,
    tableCommon,
    pagination
  },
  data() {
    return {
      items: [],
      headerName: [
        { 
          key: 'no',
          label: 'No',
          sort: false,
          checkbox: false          
        },
        { 
          key: 'projectTypeName',
          label: 'Project Type',
          sort: true,
          checkbox: false,
          sortType: 'ASC',
          class: 'curson-on w-15'          
        },
        { 
          key: 'projectCode',
          label: 'Project Code',
          sort: true,
          checkbox: false,
          sortType: 'ASC',
          class: 'curson-on w-15'       
        },
        { 
          key: 'projectName',
          label: 'Project Name',
          sort: false,
          checkbox: false,
          class: 'w-22'   
          },
        { 
          key: 'aliasName',
          label: 'Alias Name',
          sort: false,
          checkbox: false,
          class: 'w-26'          
        },
        { 
          key: 'active',
          label: 'Active Project',
          sort: false,
          checkbox: false,
          class: 'w-15'          
        }
      ],
      projectType: [],
      loadData: {
        isSearch: 0,
        projectCode: '',
        projectName: '',
        projectTypeId: '',
        aliasName: '',
        active: '',
        defaultProject: '',
        currentPage: 1,
        pageRecord: CONTANT.pageRecord,
        sortBy: 'projectCode-ASC'
      },
      loadProjectType: {
        isSearch: 0,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 0,
        pageRecord: CONTANT.pageRecord,
        sortBy: 'projectTypeCode-ASC'
      },
      dataForm: {
        id:'',
        projectCode: '',
        projectName: '',
        aliasName: '',
        defaultProject: '',
        active: '',
        projectTypeCode: '',
        projectTypeId: ''
      },
      disabled: true,
      default: {
        id: '',
        projectTypeCode: '',
        projectTypeName: 'All'
      },
      dataMess: {
        code: '',
        name: '',
        type: ''
      },
      sort: {
        key: 'projectCode',
        type: 'ASC'
      },
      typeList: [],
      resetPage: true,
      currentPage: 1,
      statusSearch: 0
    }
  },
  async created() {
    this.$store.dispatch('project/loadingData', true)
    await this.$store.dispatch('project/projectList', this.loadData)
    await this.$store.dispatch('project/projecType', this.loadProjectType)
    this.typeList = [this.default, ...this.projectTypeList]
  },
  computed: {
    ...mapState('project', {
      isLoading: state => state.isLoading,
      projectList: state => state.projectList,
      projectTypeList: state => state.projectTypeList,
      messCode: state => state.messCode,
      errorCode: state => state.errorCode,
      searchError: state => state.searchError,
      totalPage: state => state.totalPage
    }),
  },
  methods: {
    validateInput(val) {
      return val ? true : false
    },
    clickTable(val) {
      this.dataForm = val
      this.disabled = false
    },

    async addProjectData(val) {
      //validate projectCode,projectName,projectTypeCode not ''
      const valiCode = this.validateInput(val.projectCode)
      const valiName = this.validateInput(val.projectName)
      const valiType = this.validateInput(val.projectTypeCode)
      this.dataMess.code = valiCode ? '' : CONTANT.message['013'] 
      this.dataMess.name = valiName ? '' : CONTANT.message['014']
      this.dataMess.type = valiType ? '' : CONTANT.message['025']
      //call API add if validate success 
      if (valiType && valiCode && valiName) {
        await this.$store.dispatch('project/addProject', val)
        //if add success call api reload table
        if ( this.errorCode === 200 ) {
          // convert value defaultProject ,active to booleen
          val.defaultProject = val.defaultProject === 0 ? false : true
          val.active = val.active === 0 ? false : true
          this.resetPage = false
          this.loadData.currentPage = 1
          this.currentPage = 1
          await this.$store.dispatch('project/loadingData', true)
          await this.$store.dispatch('project/projectList', this.loadData)
          // add seccess reset value input
          this.dataForm = {
            projectCode: '',
            projectName: '',
            aliasName: '',
            defaultProject: '',
            active: '',
            projectTypeCode: '',
            projectTypeId: ''
          }
          // reset paging
          this.resetPage = true
        }
      }
      this.$store.dispatch('project/resetMess', '')
    },
    async searchProjectData(val) {
      this.disabled = true
      const tmp = val.projectTypeCode
      this.resetPage = false
      const param = ['id', 'projectTypeCode', 'projectTypeName']
      // check status search if all val !== '' isSeach = 1, else isSearch = 0
      if (
        val.active === "" &&
        val.aliasName === "" &&
        val.defaultProject === "" &&
        val.projectCode === "" &&
        val.projectName === "" &&
        val.projectTypeCode === "" &&
        val.projectTypeId === ""
      ) {
        this.statusSearch = 0
      } else {
        this.statusSearch = 1
      }
      //remove operation
      let data =  operater.delete(val, param)
      data = {
        isSearch: this.statusSearch, 
        currentPage: 1,
        pageRecord: CONTANT.pageRecord,
        sortBy: this.sort.key + '-' + this.sort.type,
        ...data
      }
      // call API search & reload table, reload project type
      await this.$store.dispatch('project/searchData', data)
      await this.$store.dispatch('project/loadingData', true)
      await this.$store.dispatch('project/projectList', data)
      await this.$store.dispatch('project/projecType', this.loadProjectType)
      this.dataForm.projectTypeCode = tmp
      this.typeList = [this.default, ...this.projectTypeList]
      this.resetPage = true
      this.$store.dispatch('project/resetMess', '')
    },

    async changePage(val) {
      this.currentPage = val
      this.loadData.sortBy = this.sort.key + '-' + this.sort.type
      this.loadData.currentPage = this.currentPage
      this.$store.dispatch('project/loadingData', true)
      await this.$store.dispatch('project/projectList', this.loadData)
    },

    sortTable(val) {
      const type = val.sortType === 'ASC' ? 'DESC' : 'ASC'
      this.sort = {
        key: val.key,
        type: type
      }
      val.sortType = type 
      const data = this.dataForm
      data.isSearch = 1,
      data.currentPage = 1,
      data.pageRecord = CONTANT.pageRecord,
      data.sortBy = this.sort.key + '-' + this.sort.type
      this.$store.dispatch('project/loadingData', true)
      this.$store.dispatch('project/projectList', data)
    },

    async updateProjectData(val) {
      //validate projectCode,projectName,projectTypeCode not ''
      const valiCode = this.validateInput(val.projectCode)
      const valiName = this.validateInput(val.projectName)
      const valiType = this.validateInput(val.projectTypeCode)
      this.dataMess.code = valiCode ? '' : CONTANT.message['013'] 
      this.dataMess.name = valiName ? '' : CONTANT.message['014']
      this.dataMess.type = valiType ? '' : CONTANT.message['025']
      if (valiType && valiCode && valiName) {
        // check vaildate if success call API update
        await this.$store.dispatch('project/updateProject', val)
        // call API update and reload data table
        if ( this.errorCode === 201) {
          this.$store.dispatch('project/loadingData', true)
          const param = ['projectTypeCode', 'projectTypeName']
          let data =  operater.delete(val, param)
          data = {
            isSearch: this.statusSearch, 
            currentPage: 1,
            pageRecord: CONTANT.pageRecord,
            sortBy: this.sort.key + '-' + this.sort.type,
            ...data
          } 
          //check update with status isSearch 
          if ( this.statusSearch === 1 ) {
            await this.$store.dispatch('project/projectList', data)
          } else {
            await this.$store.dispatch('project/projectList', this.loadData)
          }          
          this.disabled = true
          const dataClear = []
          // clear data when update success
          this.dataForm = await operater.clear(this.dataForm, dataClear)
          this.dataForm.projectTypeCode = ""
        }
      }
      this.$store.dispatch('project/resetMess', '')
    },
    
    async deleteProjectData(val) {
      await this.$store.dispatch('project/deleteProject', val)
      // check error code when delete
      if ( this.errorCode === 200) {
        // delete success call API load data table
        this.$store.dispatch('project/loadingData', true)
        const param = ['projectTypeCode', 'projectTypeName']
        let data =  operater.delete(val, param)
        data = {
          isSearch: this.statusSearch, 
          currentPage: 1,
          pageRecord: CONTANT.pageRecord,
          sortBy: this.sort.key + '-' + this.sort.type,
          ...data
        } 
        if ( this.statusSearch === 1 ) {
          await this.$store.dispatch('project/projectList', data)
        } else {
          await this.$store.dispatch('project/projectList', this.loadData)
        }
        this.disabled = true
        const dataClear = []
        // clear all element form ưhen delete success
        this.dataForm = await operater.clear(this.dataForm, dataClear)
        this.dataForm.projectTypeCode = ""
      }
      this.$store.dispatch('project/resetMess', '')
    },
  
    async exportData() {
      await this.$store.dispatch('project/secretKey', '')
    },
    async clearData() {
      const dataClear = []
      this.dataForm = await operater.clear(this.dataForm, dataClear)
      this.dataForm.projectTypeCode = ""
      const messClear = []
      this.messClear = await operater.clear(this.dataMess, messClear)
    }
  }
}
</script>
<style lang="scss">
  @import "style.scss";
</style>