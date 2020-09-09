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
      :options="projectTypeList"
      :dataForm="dataForm"
      :dataMess="dataMess"
      @addProjectData="addProjectData"
      @searchProjectData="searchProjectData"
     ></groupProject>
     <p :class="messCode.class">{{messCode.mess}}</p>
      <tableCommon
        :isLoading="isLoading"
        :fields="headerName" 
        :items="projectList.result"
        @clickTable="clickTable"
      >
      </tableCommon>
      
    </div>
  </div>
</template>

<script>
import headerCommon from '@/components/HeaderCommon'
import groupProject from '@/components/GroupProject'
import tableCommon from '@/components/TableCommon'
import CONTANT from '@/core/contant'
import { mapState } from 'vuex'
// import pagination from '@/components/Pagination'
export default {
   components: {
    headerCommon,
    groupProject,
    tableCommon
    // pagination
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
          class: 'curson-on'          
        },
        { 
          key: 'projectCode',
          label: 'Project Code',
          sort: true,
          checkbox: false,
          class: 'curson-on'       
        },
        { 
          key: 'projectName',
          label: 'Project Name',
          sort: false,
          checkbox: false          
        },
        { 
          key: 'aliasName',
          label: 'Alias Name',
          sort: false,
          checkbox: false          
        },
        { 
          key: 'active',
          label: 'Active Project',
          sort: false,
          checkbox: false          
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
        projectTypeCode: '',
        projectTypeName: 'All'
      },
      dataMess: {
        code: '',
        name: '',
        type: ''
      }
    }
   
  },
  async created(){
    this.$store.dispatch('project/loadingData', true)
    await this.$store.dispatch('project/projectList', this.loadData)
    await this.$store.dispatch('project/projecType', this.loadProjectType)
    this.projectTypeList.unshift(this.default)
  },
  computed: {
    ...mapState('project', {
      isLoading: state => state.isLoading,
      projectList: state => state.projectList,
      projectTypeList: state => state.projectTypeList,
      messCode: state => state.messCode,
      errorCode: state => state.errorCode
    }),
  },
  methods: {
    validateInput(val) {
      if (val === '') {
        return false
      } else {
        return true
      }
    },
    clickTable(val) {
      console.log(val)
      this.dataForm = {
        projectCode: val.projectCode,
        projectName: val.projectName,
        aliasName: val.aliasName,
        projectTypeId: val.projectTypeId,
        defaultProject: val.defaultProject,
        active: val.active,
        projectTypeCode: val.projectTypeCode
      }
    },

    async addProjectData(val){
      const valiCode = this.validateInput(val.projectCode)
      const valiName = this.validateInput(val.projectName)
      const valiType = this.validateInput(val.projectTypeCode)
      this.dataMess.code = valiCode ? '' : CONTANT.message['013'] 
      this.dataMess.name = valiName ? '' : CONTANT.message['014']
      this.dataMess.type = valiType ? '' : CONTANT.message['025']
      val.defaultProject = val.defaultProject === 0 ? false : true
      val.active = val.active === 0 ? false : true
      if (valiType && valiCode && valiName){
        await this.$store.dispatch('project/addProject', val)
        if ( this.errorCode === 200 ) {
          await this.$store.dispatch('project/loadingData', true)
          await this.$store.dispatch('project/projectList', this.loadData)
        }
      }
      this.$store.dispatch('project/resetMess', '')
      console.log(val)
    },

    async searchProjectData(val){
      const valiCode = this.validateInput(val.projectCode)
      const valiName = this.validateInput(val.projectName)
      const valiType = this.validateInput(val.projectTypeCode)
      if (valiType || valiCode || valiName){
        const data = {
          isSearch: 1,
          projectCode: val.projectCode,
          projectName: val.projectName,
          projectTypeId: val.projectTypeId,
          aliasName: val.aliasName,
          active: val.active,
          defaultProject: val.defaultProject,
          currentPage: 1,
          pageRecord: CONTANT.pageRecord,
          sortBy: 'projectCode-ASC'
        }
        await this.$store.dispatch('project/loadingData', true)
        await this.$store.dispatch('project/projectList', data)
      }
    }
  }
}
</script>
<style lang="scss">
  @import "style.scss";
</style>