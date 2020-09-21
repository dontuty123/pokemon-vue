<template>
  <div class="er-omproject">
    <div class="list-button mb-3">
      <b-button class="btn-type btn-type-1" @click="btnSearch()">
        <b-icon icon="search"></b-icon>Search
      </b-button>
      <b-button class="btn-type btn-type-1" @click="btnAdd()">
        <b-icon icon="plus-circle-fill"></b-icon>Add
      </b-button>
      <b-button class="btn-type btn-type-1" @click="btnUpdate()">
        <b-icon icon="plus-circle-fill"></b-icon>Update
      </b-button>
      <b-button class="btn-type btn-type-1"  @click="btnDelete()">
        <b-icon icon="trash"></b-icon>Delete
      </b-button>
      <b-button class="btn-type btn-type-2" @click="exportExcel()">
        <b-icon icon="file-earmark-medical-fill"></b-icon>Export
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="arrow-repeat"></b-icon>Clear All
      </b-button>
    </div>
    <div class="form-input">
      <b-form class="form-edit w-75 mb-1">
        <b-form-group
          label-cols="12"
          label-cols-md="2"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">Project</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
               <model-list-select :list="listOmproject"
                class="input-select"
                  v-model="projectSelected"
                  size="sm"
                  option-value="projectCode"
                  :custom-text="customText"
                  placeholder="All">
                  
                </model-list-select>
                <p
                  class="required-msg"
                  v-if="!projectSelected.id && requiredMsg !== ''"
                >Project {{ requiredMsg }}</p>
            </div>
          </div>
        </b-form-group>
        <b-form-group
          label-cols="12"
          label-cols-md="2"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">Employee</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <!-- option-text="employeeName" -->
              <model-list-select :list="listOmEmployee"
                class="input-select"
                v-model="employeeSelected"
                size="sm"
                option-value="employeeCode"
                :custom-text="customText2"
                placeholder="All">
              </model-list-select>
                 <p
                  class="required-msg"
                  v-if="!employeeSelected.id && requiredMsg !== ''"
                >Project {{ requiredMsg }}</p>
            </div>
          </div>
        </b-form-group>
        
      </b-form>
    </div>
  </div>
</template>
<script>
import { log } from 'util';
import { ModelListSelect } from 'vue-search-select'
import { mapState } from 'vuex';

export default {
  name: 'OMProject',
  components: {
    ModelListSelect
  },
  props: ['listOmproject', 'listOmEmployee', 'paramsOmProject', 'dataSelected'],
  data() {
    return {
      requiredMsg: '',
      projectSelected: {},
      employeeSelected: {},
      valueSelected: {},
      idUpdate: 0
    };
  },

  methods: {
    // Format text  at combobox
    customText (item) {
      return `${item.id} - ${item.projectCode} - ${item.projectName}`
    },

    customText2(item) {
      return `${item.id} - ${item.employeeCode} - ${item.employeeName}`
    },
    //Search
    btnSearch() {
      const { isSearch, projectId, employeeId, currentPage, pageRecord, sortBy, employeeBy, projectBy } = this.paramsOmProject;
      const dataSearch = this.paramsOmProject
      dataSearch.isSearch = 1
      dataSearch.projectId = this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id
      dataSearch.employeeId = this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id
      this.$emit('dataSearch', dataSearch)
    },

    //Add
    btnAdd() {
      if (!this.projectSelected.id || !this.employeeSelected.id) {
         this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const { projectId, employeeId } = this.paramsOmProject;
        const dataAdd = {
          projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id,
          employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id,
        }
        this.$emit('dataAdd', dataAdd)
      }
    },
    
    //Update
    btnUpdate() {
       if (!this.projectSelected.id || !this.employeeSelected.id) {
         this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataUpdate = {
          id: this.idUpdate,
          projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id,
          employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id,        }
        this.$emit('dataUpdate', dataUpdate)
      }
    },

    // Delete Item
    btnDelete() {
      const idDelete = {
        id: this.idUpdate
      }
      this.$emit('dataDelete', idDelete)
    },

    //Export Excel
    // projectId=&employeeId=&sortBy=projectCode-ASC&secretKey=MjQ2WTFGbVZHcFhibHB4TkhRM2R5RjZKVU1xUmkxS1lVNWtVbWRWYTFod01uTT0xNjAwNjU1NDU3WTFGbVZHcFhibHB4TkhRM2R5RjZKVU1xUmkxS1lVNWtVbWRWYTFod01uTT0%3D
    exportExcel(){
      const { projectId, employeeId } = this.paramsOmProject;
      const dataSecretKey = {
        projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id,
        employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id,       
        sortBy: 'projectCode-ASC',
        secretKey: '',
      };
      
      this.$store.dispatch('omproject/getSecretKey', dataSecretKey);
      setTimeout(() => {
        const dataExport = {
          projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id ? this.projectSelected.id : '',
          employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id ? this.employeeSelected.id : '',       
          sortBy: 'projectCode-ASC',
          secretKey: this.secretKey,
        };
        this.$store.dispatch('omproject/exportFile', dataExport);
        window.open(this.linkExportExcel, '_blank');
      }, 350);
    },
  },

  mounted() {
  
  },

  computed: {
    ...mapState('omproject', {
      linkExportExcel: (state) => state.linkExportExcel,
      secretKey: (state) => state.secretKey,

    }),
  },
  watch: {
    //Show data from table selected
    dataSelected(val) {
      if (val.id) {
        this.projectSelected = val
        this.employeeSelected = val
        this.idUpdate = val.id
      }
    },
  }
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
