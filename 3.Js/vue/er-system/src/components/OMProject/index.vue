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
      <b-button class="btn-type btn-type-1">
        <b-icon icon="trash"></b-icon>Delete
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="file-earmark-medical-fill"></b-icon>Import
      </b-button>
      <b-button class="btn-type btn-type-2">
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
              {{projectSelected.id}}
               <model-list-select :list="listOmproject"
                class="input-select"
                  v-model="projectSelected"
                  size="sm"
                  option-value="projectCode"
                  :custom-text="customText"
                  placeholder="select item">
                  
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
              <model-list-select :list="listOmEmployee"
              class="input-select"
                v-model="employeeSelected"
                size="sm"
                option-value="employeeCode"
                option-text="employeeName"
                placeholder="select item">
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
      return `${item.projectCode} - ${item.projectName}`
    },

    //Search
    btnSearch() {
      const { isSearch, projectId, employeeId, currentPage, pageRecord, sortBy, employeeBy, projectBy } = this.paramsOmProject;
      const dataSearch = this.paramsOmProject
      dataSearch.isSearch = 1
      dataSearch.projectId = this.projectSelected.id
      dataSearch.employeeId = this.employeeSelected.id
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
          projectId: this.projectSelected.id,
          employeeId: this.employeeSelected.id
        }
        console.log(dataAdd);
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
          projectId: this.projectSelected.projectId,
          employeeId: this.employeeSelected.employeeId
        }
        this.$emit('dataUpdate', dataUpdate)
      }
    }
  },

  mounted() {
  
  },

  computed: {},
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
