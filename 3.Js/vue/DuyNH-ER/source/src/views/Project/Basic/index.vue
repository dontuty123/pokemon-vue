<template>
  <div>
    <Header />
    <div class="body-content project">
      <h2 class="page-heading mb-4">Master/ Project Basic</h2>
      <FormProject @resetPage="resetPage" :numberPage="numberPage" :projectDataSelect="dataSelected"  :sortCommon="sortCommon" class="mb-3" />
      <div class="mt-3">
        <p  class="msg" :class="[{ 'success': messageResult === 'Success'  }, 'error']">{{ messageResult }}</p>  
      </div>
      <tableCommon
        :items="arrayProjects"
        :fields="fieldsOfProject"
        @valueRowSelect="getDataProject"
        @sortData="sortData"
      />
      <Paging 
        :lengthOfList="lengthOfList"
        @currentPage="changePaging"
        :numberPage="numberPage"
       />
    </div>
    <scrollTop />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Header from '@/views/Header';
import tableCommon from '@/components/Base/Table';
import Paging from '@/components/Base/Paging';
import scrollTop from '@/components/Base/ScrollTop';

import FormProject from '@/components/Project/Basic/Detail/Form';

export default {
  name: 'Project',
  data() {
    return {
      paramsProject: {
        isSearch: 1,
        projectCode: '',
        projectName: '',
        projectTypeId: '',
        aliasName: '',
        currentPage: 1,
        active: null,
        defaultProject: null,
        pageRecord: 20,
        sortBy: 'projectCode-ASC',
      },
      fieldsOfProject: [
        {
          key: 'id',
          label: 'No',
          class: 'text-center',
          sort: false,
          valueSort:0,
        },
        {
          key: 'projectTypeName',
          label: 'Project Type',
          class: '',
          sort: true,
          valueSort: 1, 
        },
        {
          key: 'projectCode',
          label: 'Project Code',
          class: '',
          sort: true,
          valueSort:2,
        },
        {
          key: 'projectName',
          label: 'Project Name',
          class: '',
          sort: false,
          valueSort:0,
        },
        {
          key: 'aliasName',
          label: 'Alias Name',
          class: '',
          sort: false,
          valueSort:0,
        },
        {
          key: 'active',
          label: 'Active Project',
          class: '',
          sort: false,
          valueSort:0,
        },
      ],
      arrayProjects: [],
      dataSelected:{},
      msgResult:'',
      lengthOfList:0, 
      numberPage:0,
      sortCommon: 'projectCode-ASC'
    };
  },
  components: {
    Header,
    FormProject,
    tableCommon,
    Paging,
    scrollTop
  },
  computed: {
    ...mapState('project', {
      listProjects: (state) => state.listProjects,
      messageResult: (state) => state.messageResult,
      totalRecord: (state) => state.totalRecord,
      isLoading: (state) => state.isLoading,
    }),
    ...mapGetters('project', {
      getParamsProjects: 'getParamsProjects',
    }),    
  },
  mounted() {
    this.listProject();
  },
  methods: {
    //Call list project
    listProject(){
      this.$store.dispatch('project/getListProject', this.paramsProject);
    },

    //Select data
    getDataProject(val){
      this.dataSelected = val
    },

    //Reset page to 1
    resetPage(val){
      this.numberPage = val
    },

    //Add param for api
    addParams(param1, param2, ...other){
      const  paramList = { param1, param2, other } = this.getParamsProjects
      const dataResult = paramList
      dataResult.currentPage = this.numberPage
      dataResult.pageRecord = 20
      return dataResult
    },

    //Paging
    changePaging(val){
      this.numberPage = val
      this.$store.dispatch('project/getListProject', this.addParams())
    },

    //Sort Table
    sortData(sort, val){   
      if (val === 1) {
        sort ? this.addParams().sortBy = 'projectTypeName-ASC' : this.addParams().sortBy = 'projectTypeName-DESC'
        this.sortCommon = this.addParams().sortBy
      } else {
        sort ? this.addParams().sortBy = 'projectCode-ASC' : this.addParams().sortBy = 'projectCode-DESC'
        this.sortCommon = this.addParams().sortBy
      }
      this.$store.dispatch('project/getListProject', this.addParams())
    }
  },
  watch: {
    messageResult(val){
      this.msgResult = val;
    },
    listProjects(val){
      this.arrayProjects = val;
    },
    totalRecord(val){
      this.lengthOfList = val;
    },
  },
};
</script>
<style lang='scss'>
  @import '../style.scss';
</style>
