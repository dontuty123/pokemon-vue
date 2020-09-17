<template>
  <div class="er-omproject">
    <div class="list-button mb-3">
      <b-button class="btn-type btn-type-1">
        <b-icon icon="search"></b-icon>Search
      </b-button>
      <b-button class="btn-type btn-type-1">
        <b-icon icon="plus-circle-fill"></b-icon>Add
      </b-button>
      <b-button class="btn-type btn-type-1">
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
               <model-list-select :list="listProject"
                  v-model="projectSelected"
                  size="sm"
                  option-value="projectCode"
                  option-text="projectName"
                  placeholder="select item">
                </model-list-select>
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
              <model-list-select :list="listEmployee"
                v-model="employeeSelected"
                size="sm"
                option-value="employeeCode"
                option-text="employeeName"
                placeholder="select item">
              </model-list-select>
            </div>
          </div>
        </b-form-group>
        
      </b-form>
    </div>
  </div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select'

export default {
  name: 'OMProject',
  components: {
    ModelListSelect
  },
  data() {
    return {
      listProject: [
        {
          id: 1,
          projectCode: 'projectCode1',
          projectName: 'projectName1',
        },
        {
          id: 2,
          projectCode: 'projectCode2',
          projectName: 'projectName2',
        },
        {
          id: 3,
          projectCode: 'projectCode3',
          projectName: 'projectName3',
        },
        {
          id: 4,
          projectCode: 'projectCode4',
          projectName: 'projectName4',
        },
        {
          id: 5,
          projectCode: 'projectCode5',
          projectName: 'projectName5',
        },
      ],
      projectSelected: {},

      //Employee
      listEmployee: [
        {
          id: 1,
          employeeCode: 'employeeCode1',
          employeeName: 'employeeName1'
        },
        {
          id: 2,
          employeeCode: 'employeeCode2',
          employeeName: 'employeeName2'
        },
        {
          id: 3,
          employeeCode: 'employeeCode3',
          employeeName: 'employeeName3'
        },
        {
          id: 4,
          employeeCode: 'employeeCode4',
          employeeName: 'employeeName4'
        },
        {
          id: 5,
          employeeCode: 'employeeCode5',
          employeeName: 'employeeName5'
        },
      ],
      employeeSelected: {},

    };
  },

  methods: {},

  mounted() {},

  computed: {},
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
