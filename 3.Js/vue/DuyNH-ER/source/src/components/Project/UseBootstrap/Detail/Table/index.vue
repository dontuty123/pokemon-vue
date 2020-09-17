<template>
  <div class="project-table mt-4">
    <p class="msg mb-3" :class="{ 'success': msgResult === 'Success' }">{{ msgResult }}</p>  
    <b-table
      striped
      hover
      table-bordered
      :fields="fieldsProject"
      :items="arrayProjects"
      class="table-bordered mb-4"
      selectable
      select-mode="single"
      :per-page="perPage"
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(id)="row">{{ row.index+1 }}</template>
      <template v-slot:cell(active)="row">
        <b-form-checkbox v-model="row.item.active" value="1" unchecked-value="0" disabled></b-form-checkbox>
      </template>
    
    </b-table>
     <b-pagination
      v-model="currentPage"
      :total-rows="lengthOfList"
      :per-page="perPage"
      first-number
      last-number
      aria-controls="my-table"
      @change="changePaging()"
       align="right"
    ></b-pagination>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'TableProject',
 
  data(){
    return {
      fieldsProject: [],
      paramsProject: {
        'isSearch': 1,
        'projectCode': '',
        'projectName': '',
        'projectTypeId': '',
        'aliasName': '',
        'currentPage': 1,
        'active': null,
        'defaultProject': null,
        'pageRecord': 20,
        'sortBy': 'projectCode-ASC',
      },
      arrayProjects: [],
      pjSelectedTypeId:0,
      optionSelected: [],
      msgResult:'',
      perPage: 20,
      currentPage: 1,
      lengthOfList:0, 
    }
  },

  mounted(){
    this.listProject()
    
    this.fieldsProject = [
      { key: 'id', label: 'No' },
      { key: 'projectTypeName', label: 'Project Type', thClass: 'striped', sortable: true},
      { key: 'projectCode', label: 'Project Code', thClass: 'striped', sortable: true },
      { key: 'projectName', label: 'Project Name', thClass: 'striped' },
      { key: 'aliasName', label: 'Alias Name', thClass: 'striped' },
      { key: 'active', label: 'Active Project', thClass: 'striped' },
    ]
  },

  computed: {
    ...mapState('project', {
      listProjects: state => state.listProjects,
      messageResult:  state => state.messageResult,
      totalRecord:  state => state.totalRecord,
      isLoading:  state => state.isLoading,
    }),
    ...mapGetters('project', {
      getParamsProjects: 'getParamsProjects'
    })
  },
  methods: {
    //Call list project
    listProject(){
      this.$store.dispatch('project/getListProject', this.paramsProject)
    },

    //Paging
    changePaging(){
      this.$nextTick(() => {
        const { projectCode, projectName, projectTypeId, aliasName, active, defaultProject } = this.getParamsProjects
        const dataPaging = {
          'isSearch': 1,
          'projectCode':  projectCode,
          'projectName':  projectName,
          'projectTypeId': projectTypeId,
          'aliasName': aliasName,
          'currentPage': this.currentPage,
          'active':  active,
          'defaultProject': defaultProject,
          'pageRecord': 20,
          'sortBy': 'projectCode-ASC',
        }
        this.$store.commit('project/GET_PARAMS_LIST_PROJECT', dataPaging)
        this.$store.dispatch('project/searchProject')
      });
    },
    
    //Show field selected
    onRowSelected(items) {
      this.optionSelected = items
      this.$store.dispatch('project/selectedProject', this.optionSelected)     
    },

  },

  watch: {
    messageResult(val) {
      this.msgResult = val
    },

    listProjects(val) {
      this.arrayProjects = val
    },

    totalRecord(val) {
      this.lengthOfList = val
    }
  },
}
</script>
