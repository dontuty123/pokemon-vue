<template>
  <div>
    <Header />
    <div class="body-content project">
      <h2 class="page-heading mb-4">Master/ Project/ Project Type</h2>
      <FormProjectType  
      :projectTypeSelect="dataSelected" 
      :sortCommon="sortCommon"
      :numberPage="numberPage"
       @resetPage="resetPage"
       />
          <div class="mt-3">
            <p  class="msg" :class="[{ 'success': messageResult === 'Success'  }, 'error']">{{ messageResult }}</p>  
          </div>
       <tableCommon
        :items="listPjType"
        :fields="fieldsProjectType"
        @valueRowSelect="getDataProject"
        @sortData="sortData"
      />
       <Paging 
        :lengthOfList="lengthOfList"
        @currentPage="changePaging"
        :numberPage="numberPage"
       />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import Header from '@/views/Header';
import FormProjectType from '@/components/Project/Basic/Type/Form'
import tableCommon from '@/components/Base/Table';
import Paging from '@/components/Base/Paging';

export default {
   name: 'ProjectType',
   components: {
    Header,
    FormProjectType,
    tableCommon,
    Paging
   },
   data(){
     return {
      paramsProjectType: {
        isSearch: 0,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 1,
        pageRecord: 20,
        sortBy: 'projectTypeCode-ASC',
      },
      listPjType: [],
      fieldsProjectType: [
        {
          key: 'id',
          label: 'No',
          class: 'text-center width-1',
          sort: false,
          valueSort:0,
        },
        {
          key: 'projectTypeCode',
          label: 'Project Type Code',
          class: 'width-10',
          sort: true,
          valueSort: 1, 
        },
        {
          key: 'projectTypeName',
          label: 'Description',
          class: 'width-50',
          sort: true,
          valueSort:2,
        },
      ],
      
      dataSelected: {},
      lengthOfList: 0,
      numberPage: 0,
      msgResult:'',
      sortCommon: 'projectCode-ASC',

    }
   },
   mounted() {
     this.ProjectType()
   },
  computed: {
    ...mapState('project', {
        listProjectType: state => state.listProjectType,
        totalRecordType: (state) => state.totalRecordType,
        messageResult: (state) => state.messageResult,
    }),
  },
  methods: {
    //List Project Type
    ProjectType(){
      this.$store.dispatch('project/listProjectType', this.paramsProjectType)
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
      const  paramList = { param1, param2, other } = this.paramsProjectType
      const dataResult = paramList
      dataResult.currentPage = this.numberPage
      dataResult.pageRecord = 20
      return dataResult
    },

    //Paging
    changePaging(val){
      this.numberPage = val
      this.$store.dispatch('project/listProjectType', this.addParams())
    },

    //Sort Table
    sortData(sort, val){   
      if (val === 1) {
        sort ? this.addParams().sortBy = 'projectTypeCode-ASC' : this.addParams().sortBy = 'projectTypeCode-DESC'
        this.sortCommon = this.addParams().sortBy
      } else {
        sort ? this.addParams().sortBy = 'projectTypeName-ASC' : this.addParams().sortBy = 'projectTypeName-DESC'
        this.sortCommon = this.addParams().sortBy
      }
      this.$store.dispatch('project/listProjectType', this.addParams())
    }
   },
   watch: {
      messageResult(val){
        this.msgResult = val;
      },
      listProjectType(val){
        this.listPjType = val
      },
      totalRecordType(val){
        this.lengthOfList = val
      },

   },
}
</script>
