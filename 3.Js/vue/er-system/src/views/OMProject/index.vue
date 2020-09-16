<template>
  <div class="body-content er-omproject">
    <OMProject />
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
export default {
  name: 'OM-Project',
  components: {
    OMProject,
    tableCommon,
  },
  data() {
    return {
      arrayProjects:[
        {
          id: 1,
          projectCode: 'test 1',
          projectName: 'test 11',
          employeeCode: 'employeeCode',
          employeeName: 'employeeName'
        },
        {
          id: 2,
          projectCode: 'test 1',
          projectName: 'test 11',
          employeeCode: 'employeeCode',
          employeeName: 'employeeName'
        },
        {
          id: 3,
          projectCode: 'test 1',
          projectName: 'test 11',
          employeeCode: 'employeeCode',
          employeeName: 'employeeName'
        },
        {
          id: 4,
          projectCode: 'test 1',
          projectName: 'test 11',
          employeeCode: 'employeeCode',
          employeeName: 'employeeName'
        },
        {
          id: 5,
          projectCode: 'test 1',
          projectName: 'test 11',
          employeeCode: 'employeeCode',
          employeeName: 'employeeName'
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
   //Select data
    getDataProject(val){
      console.log(val);
    },
  },

  mounted() {},

  computed: {},
};
</script>
<style scoped lang='scss'>
@import 'style.scss';
</style>
