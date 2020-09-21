<template>
  <div class="body-content er-omproject">
    <OMProject  :listOmproject="listOmproject"
                :listOmEmployee="listOmEmployee"
                :paramsOmProject="paramsOmProject"
                :dataSelected="dataSelected"
                @dataSearch="dataSearch"
                @dataAdd="dataAdd"
                @dataUpdate="dataUpdate"
                @dataDelete="dataDelete"  />
    <tableCommon 
      :fields="fields"
      :items="listOmEmployeeProject"
      @valueRowSelect="getDataSelected"
    />
     <Pagination 
        @currentPage="changePaging"
       />
  </div>
</template>
<script>
import tableCommon from '@/components/TableCommon';
import OMProject from '@/components/OMProject';
import Pagination from '@/components/Pagination';

import { mapState } from 'vuex';


export default {
  name: 'OM-Project',
  components: {
    OMProject,
    tableCommon,
    Pagination
  },
  data() {
    return {
      paramsOmProject: {
        isSearch: 0,
        projectId: null,
        employeeId: null,
        currentPage: 1,
        pageRecord: 2000,
        sortBy: 'projectCode-ASC',
        employeeBy: 'firstName-ASC',
        projectBy: 'projectCode-ASC',
      },
      
      fields: [
        {
          key: 'id',
          label: 'No',
          class: 'text-center',
          sort: false,
          valueSort: 0,
        },
        {
          key: 'projectCode',
          label: 'Project Code',
          class: '',
          sort: true,
          valueSort: 0,
        },
        {
          key: 'projectName',
          label: 'Project Name',
          class: '',
          sort: true,
          valueSort: 0,
        },
        {
          key: 'employeeCode',
          label: 'Employee Code',
          class: '',
          sort: true,
          valueSort: 0,
        },
        {
          key: 'employeeName',
          label: 'Employee Name',
          class: '',
          sort: true,
          valueSort: 0,
        },
      ],
      listProjects:[],
      opsProject:[],
      currentPage: 0,
      dataSelected:{}
     
    };
  },

  methods: {
    autoLogin() {
      this.$store.dispatch('login/setUserData')
    },

    getListOmProjects(){
      this.$store.dispatch('omproject/getOmProject', this.paramsOmProject);
    },

    //Get params search
    dataSearch(val) {
      this.$store.dispatch('omproject/searchOmProject', val);
    },

    //Get params Add
    dataAdd(val) {
      this.$store.dispatch('omproject/addOmProject', val);
    },

    //get params Update
    dataUpdate(val) {
      this.$store.dispatch('omproject/updateOmProject', val);
    },

    //Get id Delete 
    dataDelete(val) {
      this.$store.dispatch('omproject/deleteOmProject', val);
    },

   //Select data
    getDataSelected(val){
      this.dataSelected = val
    },
    changePaging(val){
      this.currentPage = val
    },
  },

  mounted() {
    this.autoLogin()
    this.getListOmProjects()
  },

  computed: {
    ...mapState('omproject', {
      listOmEmployeeProject: (state) => state.listOmEmployeeProject,
      listOmproject: (state) => state.listOmproject,
      listOmEmployee: (state) => state.listOmEmployee,
      isLoading: (state) => state.isLoading
    })
  },
  watch: {
    isLoading(val1, val2) {
      if (val2 !== val1) {
        this.$store.dispatch('omproject/getOmProject', this.paramsOmProject);
      }
    }
  }
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
