<template>
   <div class="project-table mt-4">
     <div>
      <p class="msg mb-3" :class="[{ 'success': messageResult === 'Success'  }, 'error']">{{ messageResult }}</p>  
     </div>
    <b-table
      striped
      hover
      table-bordered
      :fields="fieldsProjectType"
      :items="listPjType"
      class="table-bordered mb-4"
      selectable
      select-mode="single"
      :per-page="perPage"
       @row-selected="onRowSelected"
    >
      <template v-slot:cell(id)="row" class="w-10">{{ row.index+1 }}</template>
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
  name: 'TableProjectType',
  data(){
    return {
      arrayProjectType:[],
      fieldsProjectType:[],
      optionSelected: [],
      listPjType: [],
      paramsProjectType: {
        'isSearch': 0,
        'projectTypeCode': '',
        'projectTypeName': '',
        'currentPage': 1,
        'pageRecord': 20,
        'sortBy': 'projectTypeCode-ASC',
      },
      perPage: 20,
      currentPage: 1,
      lengthOfList:0,
      msgResult:'',
    }
  },
  mounted(){
    this.ProjectType()
    this.fieldsProjectType = [
      { key: 'id', label: 'No' },
      { key: 'projectTypeCode', label: 'Project Type Code', thClass: 'striped' },
      { key: 'projectTypeName', label: 'Description', thClass: 'w-50' },
    ]
  },
  methods: {
     //List Project Type
    ProjectType(){
      this.$store.dispatch('project/listProjectType', this.paramsProjectType)
    },
    
    //Paging
    changePaging(){
      this.$nextTick(() => {
        const { isSearch, projectTypeCode, projectTypeName, currentPage, pageRecord, sortBy } = this.getParamsTypeProjects
        const dataPaging = {
          isSearch: 1,
          projectTypeCode: projectTypeCode,
          projectTypeName: projectTypeName,
          currentPage: this.currentPage,
          pageRecord: 20,
          sortBy: 'projectTypeCode-ASC',
        }
        this.$store.commit('project/GET_PARAMS_TYPE_PROJECT', dataPaging)
        this.$store.dispatch('project/searchProjectType')
      });
    },

    //Show field selected
    onRowSelected(items) {
      this.optionSelected = items
      this.$store.dispatch('project/selectedProjectType', this.optionSelected)
    },
  },

  computed: {
    ...mapState('project', {
      listProjectType: state => state.listProjectType,
      valueSelected: state => state.valueSelected,
      isLoading: state => state.isLoading,
      messageResult: state => state.messageResult,
      totalRecordType: state => state.totalRecordType
    }),
    ...mapGetters('project', {
      getParamsTypeProjects: 'getParamsTypeProjects',
    })    
  },

  watch: {
    messageResult(val){
      this.msgResult = val
    },
    
    listProjectType(val){
      this.listPjType = val
    },
    
    totalRecordType(val){
      this.lengthOfList = val
    },
    
    isLoading(val){
      if (val === true) {
         const tmpParam = {
          id:'',
          isSearch: 1,
          projectTypeCode: '',
          projectTypeName: '',
          currentPage: this.getParamsTypeProjects.currentPage,
          pageRecord: 20,
          sortBy: 'projectTypeCode-ASC'
        }
        this.$store.dispatch('project/listProjectType',tmpParam)
      }
    }
  }
}
</script>
