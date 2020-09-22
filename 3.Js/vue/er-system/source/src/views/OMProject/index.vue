<template>
  <div class="body-content er-omproject">
    <OMProject 
      :listOmproject="listOmproject"
      :listOmEmployee="listOmEmployee"
      :paramsOmProject="paramsOmProject"
      :dataSelected="dataSelected"
      :sortTable="sortTable"
      @dataSearch="dataSearch"
      @dataAdd="dataAdd"
      @dataUpdate="dataUpdate"
      @dataDelete="dataDelete" 
      @isAdd="isAdd" 
    />
      <p class="mt-2 mb-2" :class="resultMess.class">{{ resultMess.content }}</p>
      <p class="mt-2 mb-2 text-danger">{{ noDataMess }}</p>
    <TableCommon 
      :fields="fields"
      :items="listOmEmployeeProject"
      @valueRowSelect="getDataSelected"
      @sortData="sortData"
    />
    <Pagination 
      :lengthOfList="lengthOfList"
      @currentPage="changePaging"
    />
  </div>
</template>
<script>
import TableCommon from '@/components/TableCommon';
import OMProject from '@/components/OMProject';
import Pagination from '@/components/Pagination';
import { mapState } from 'vuex';

export default {
  name: 'OM-Project',
  components: {
    OMProject,
    TableCommon,
    Pagination
  },
  data() {
    return {
      paramsOmProject: {
        isSearch: 0,
        projectId: null,
        employeeId: null,
        currentPage: 1,
        pageRecord: 20,
        sortBy: 'projectCode-ASC',
        employeeBy: 'firstName-ASC',
        projectBy: 'projectCode-ASC',
      },
     
      fields: [
        {
          key: 'id',
          label: 'table["no"]',
          class: 'text-center',
          sort: false,
          valueSort: 0,
        },
        {
          key: 'projectCode',
          label: 'table["projectCode"]',
          class: '',
          sort: true,
          valueSort: 1,
        },
        {
          key: 'projectName',
          label: 'table["projectName"]',
          class: '',
          sort: true,
          valueSort: 0,
        },
        {
          key: 'employeeCode',
          label: 'table["employeeCode"]',
          class: '',
          sort: true,
          valueSort: 0,
        },
        {
          key: 'employeeName',
          label: 'table["employeeName"]',
          class: '',
          sort: true,
          valueSort: 0,
        },
      ],
      listProjects:[],
      opsProject:[],
      currentPage: 0,
      lengthOfList:0, 
      dataSelected:{},
      sortTable: 'projectCode-ASC',
      resultMess: {
        content: '',
        class: 'text-danger'
      },
      noDataMess:'',
      resetTable: false
    };
  },

  methods: {

    async getListOmProjects(val){
      await this.$store.dispatch('omproject/getOmProject', val);
        if (this.status.error_code === '018') {
          this.noDataMess = this.$t('messages[' + this.status.error_code + ']')
        } 
      setTimeout(() => {
        this.noDataMess = ''
      }, 3000); 
    },

    //Sort Table
    sortData(sort, val){
      sort ? this.sortTable = 'projectCode-ASC' : this.sortTable = 'projectCode-DESC'
      const dataAfterSort = this.paramsOmProject
      dataAfterSort.sortBy = this.sortTable
      this.$store.dispatch('omproject/getOmProject', dataAfterSort);
    },

    //Get params search
    async dataSearch(val) {
      await this.$store.dispatch('omproject/searchOmProject', val);
       if (this.status.error_code === '018') {
        this.noDataMess = this.$t('messages[' + this.status.error_code + ']')
      } 
      setTimeout(() => {
        this.noDataMess = ''
      }, 3000); 
    },

    //Get params Add
    async dataAdd(val) {
      await this.$store.dispatch('omproject/addOmProject', val);
      if (this.status.http_code !== 200) {
        this.resultMess.content = this.$t('messages[' + this.status.error_code + ']')
        this.resultMess.class = 'text-danger'
      } else {
        this.resultMess.content = this.$t('messages["004"]')
        this.resultMess.class = 'text-success'
      }
      setTimeout(() => {
        this.resultMess.content = ''
        this.resultMess.class = 'text-danger'
      }, 3000);      
    },

    //Get params Update
    async dataUpdate(val) {
      await this.$store.dispatch('omproject/updateOmProject', val);
      if (this.status.http_code !== 201) {
        this.resultMess.content = this.$t('messages[' + this.status.error_code + ']')
        this.resultMess.class = 'text-danger'
      } else {
        this.resultMess.content = this.$t('messages["004"]')
        this.resultMess.class = 'text-success'
        this.getListOmProjects(this.paramsOmProject)
      }
      setTimeout(() => {
        this.resultMess.content = ''
        this.resultMess.class = 'text-danger'
      }, 3000);      
    },

    //Get id Delete 
    async dataDelete(val) {
      await this.$store.dispatch('omproject/deleteOmProject', val);
      if (this.status.http_code !== 200) {
        this.resultMess.content = this.$t('messages[' + this.status.error_code + ']')
        this.resultMess.class = 'text-danger'
      } else {
        this.resultMess.content = this.$t('messages["004"]')
        this.resultMess.class = 'text-success'
      }
      setTimeout(() => {
        this.resultMess.content = ''
        this.resultMess.class = 'text-danger'
      }, 3000);     
    },

    isAdd(val) {
      this.resetTable = val
    },

   //Select data
    getDataSelected(val){
      this.dataSelected = val
    },
    
    //Change Pagge
    changePaging(val){
      this.currentPage = val
      const dataAfterTurningPage = this.paramsOmProject
      dataAfterTurningPage.currentPage = this.currentPage
      this.$store.dispatch('omproject/getOmProject', dataAfterTurningPage);
    },
  },

  mounted() {
     this.$store.dispatch('userRole/getDataUser')
    this.getListOmProjects(this.paramsOmProject)
  },

  computed: {
    ...mapState('omproject', {
      listOmEmployeeProject: (state) => state.listOmEmployeeProject,
      listOmproject: (state) => state.listOmproject,
      listOmEmployee: (state) => state.listOmEmployee,
      totalRecord: (state) => state.totalRecord,
      isLoading: (state) => state.isLoading,
      status : state => state.status
    })
  },
  watch: {
    //Reload list OM project if have change
    isLoading(val1, val2) {
      if (val2 !== val1) {
        if (!this.resetTable) {
          this.getListOmProjects(this.paramsOmProject)
          
        } else {
           const paramsReset = {
            isSearch: 0,
            projectId: null,
            employeeId: null,
            currentPage: 1,
            pageRecord: 20,
            sortBy: 'projectCode-ASC',
            employeeBy: 'firstName-ASC',
            projectBy: 'projectCode-ASC',
          }
          this.getListOmProjects(paramsReset)
        }    
      }
    },

    //Total Record in Table
    totalRecord(val){
      this.lengthOfList = val;
    },
  }
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
