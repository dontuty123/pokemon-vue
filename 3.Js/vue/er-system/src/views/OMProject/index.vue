<template>
  <div class="body-content er-omproject">
    <OMProject :listProjects="listProjects" />
    <tableCommon 
      :fields="fields"
      :items="arrayProjects"
      @valueRowSelect="getDataProject"
    />
  </div>
</template>
<script>
import tableCommon from '@/components/TableCommon';
import OMProject from '@/components/OMProject';
import { mapState } from 'vuex';


export default {
  name: 'OM-Project',
  components: {
    OMProject,
    tableCommon,
  },
  data() {
    return {
      paramsProject: {
        isSearch: 0,
        projectId: '',
        employeeId: '',
        currentPage: 1,
        pageRecord: 20,
        sortBy: 'projectCode-ASC',
        employeeBy: '',
        projectBy: '',
      },
      arrayProjects:[
        {
          id: 1,
          projectCode: 'projectCode1',
          projectName: 'projectName1',
          employeeCode: 'employeeCode1',
          employeeName: 'employeeName1'
        },
        {
          id: 2,
          projectCode: 'projectCode2',
          projectName: 'projectName2',
          employeeCode: 'employeeCode2',
          employeeName: 'employeeName2'
        },
        {
          id: 3,
          projectCode: 'projectCode3',
          projectName: 'projectName3',
          employeeCode: 'employeeCode3',
          employeeName: 'employeeName3'
        },
        {
          id: 4,
          projectCode: 'projectCode4',
          projectName: 'projectName4',
          employeeCode: 'employeeCode4',
          employeeName: 'employeeName4'
        },
        {
          id: 5,
          projectCode: 'projectCode5',
          projectName: 'projectName5',
          employeeCode: 'employeeCode5',
          employeeName: 'employeeName5'
        },
        
      ],
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
    };
  },

  methods: {
    getListProjects(){
      this.$store.dispatch('project/getProject', this.paramsProject);
    },
    
   //Select data
    getDataProject(val){
      console.log(val);
    },
  },

  mounted() {
   this.getListProjects()
  },

  computed: {
    ...mapState('project', {
      listProjects: (state) => state.listProjects,
    })
  },
  watch: {
    
  }
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
