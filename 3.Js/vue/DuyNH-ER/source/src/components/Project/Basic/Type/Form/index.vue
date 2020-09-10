<template>
  <div>
    <div>
      <div class="project-list-button mb-3">
        <b-button class="btn-type btn-type-1" @click="pjSearch()" :disabled="loadingBtn.search">
          <b-icon icon="search"></b-icon>Search
        </b-button>

        <b-button class="btn-type btn-type-1" @click="pjAdd()" :disabled="loadingBtn.add">
          <b-icon icon="plus-circle-fill"></b-icon>Add
        </b-button>

        <b-button class="btn-type btn-type-1" @click="pjUpdate()" :disabled="loadingBtn.edit">
          <b-icon icon="plus-circle-fill"></b-icon>Update
        </b-button>

        <b-button class="btn-type btn-type-1" @click="pjDelete()" :disabled="loadingBtn.remove">
          <b-icon icon="trash"></b-icon>Delete
        </b-button>

        <b-button class="btn-type btn-type-2" :disabled="true">
          <b-icon icon="file-earmark-medical-fill"></b-icon>Import
        </b-button>

        <b-button class="btn-type btn-type-2" @click="exportExcel()">
          <b-icon icon="file-earmark-medical-fill"></b-icon>Export
        </b-button>

        <b-button class="btn-type btn-type-2" @click="pjClear()">
          <b-icon icon="arrow-repeat"></b-icon>Clear All
        </b-button>
      </div>
      <div class="project-form">
        <b-form class="form-edit w-75 mb-1">
          <b-form-group
            label-cols="12"
            label-cols-md="2"
            label-size="sm"
            label-for="input-sm"
            class="form-required"
          >
            <template v-slot:label>
              <span class="label">Project Type Code</span>
            </template>
            <div class="row w-input">
              <div class="col-6">
                <b-form-input size="sm" type="text" v-model="pjTypeData.projectTypeCode"></b-form-input>
              </div>
            </div>
            <p
              class="required-msg"
              v-if="pjTypeData.projectTypeCode === '' && requiredMsg !== ''"
            >Project Type Code {{ requiredMsg }}</p>
          </b-form-group>

          <b-form-group
            label-cols="12"
            label-cols-md="2"
            label-size="sm"
            label-for="input-sm"
            class="form-required"
          >
            <template v-slot:label>
              <span class="label">Description</span>
            </template>
            <div class="row w-input">
              <div class="col-6">
                <b-form-input size="sm" type="text" v-model="pjTypeData.projectTypeName"></b-form-input>
              </div>
            </div>
            <p
              class="required-msg"
              v-if="pjTypeData.projectTypeName === '' && requiredMsg !== ''"
            >Description {{ requiredMsg }}</p>
          </b-form-group>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FormProjectType',
  data(){
    return {
      requiredMsg: '',
      pjTypeData: {
        isSearch: 1,
        id: 0,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 1,
        pageRecord: 20,
        sortBy: 'projectCode-ASC',
      },
      loadingBtn: {
        search: false,
        add: false,
        edit: true,
        remove: true,
      },
    };
  },
  methods: {
    // Search project Type
    pjSearch(){
      const { isSearch, projectTypeCode, projectTypeName, currentPage, pageRecord, sortBy } = this.pjTypeData;
      const dataSearch = {
        isSearch: 1,
        projectTypeCode: projectTypeCode ? projectTypeCode : '',
        projectTypeName: projectTypeName ? projectTypeName : '',
        currentPage: 1,
        pageRecord: 20,
        sortBy: 'projectTypeCode-ASC',
      };
      this.$store.commit('project/GET_PARAMS_TYPE_PROJECT', dataSearch);
      this.$store.dispatch('project/searchProjectType');
    },

    // Add Project Type
    pjAdd(){
      const { projectTypeCode, projectTypeName } = this.pjTypeData;
      if (projectTypeCode === '' || projectTypeName === '') {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataAdd = this.pjTypeData;
        this.$store.dispatch('project/addProjectType', dataAdd);
      }
    },

    // Update Project Type
    pjUpdate(){
      const { projectTypeCode, projectTypeName } = this.pjTypeData;
      if (projectTypeCode === '' || projectTypeName === '') {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataUpdate = this.pjTypeData;
        this.$store.dispatch('project/updateProjectType', dataUpdate);
      }
    },

    //Delete Project type
    pjDelete(){
      const dataDel = {
        id: this.pjTypeData.id,
      };
      this.$store.dispatch('project/deleteProjectType', dataDel);
    },

    // Clear all input of Form
    pjClear(){
      this.pjTypeData = {
        isSearch: 1,
        id: null,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 1,
        pageRecord: 20,
      };
      this.projectTypeId = 0;
    },

    //Export Excel
    exportExcel(){
      const { projectTypeCode, projectTypeName } = this.pjTypeData;
      const dataSecretKey = {
        projectTypeCode: projectTypeCode ? projectTypeCode : '',
        projectTypeName: projectTypeName ? projectTypeName : '',
        sortBy: 'projectTypeCode-ASC',
        secretKey: '',
      };
      this.$store.dispatch('project/getSecretKeyPjType', dataSecretKey);
      setTimeout(() => {
        const dataExport = {
          projectTypeCode: projectTypeCode ? projectTypeCode : '',
          projectTypeName: projectTypeName ? projectTypeName : '',
          sortBy: 'projectTypeCode-ASC',
          secretKey: this.secretKeylPjType,
        };
        this.$store.dispatch('project/exportExcelPjType', dataExport);
        window.open(this.linkExportExcelPjType, '_blank');
      }, 350);
    },
  },

  computed: {
    ...mapState('project', {
      listProjects: (state) => state.listProjects,
      listProjectType: (state) => state.listProjectType,
      valueSelected: (state) => state.valueSelected,
      isLoading: (state) => state.isLoading,
      secretKeylPjType: (state) => state.secretKeylPjType,
      linkExportExcelPjType: (state) => state.linkExportExcelPjType,
    }),
    ...mapGetters('project', {
      getParamsTypeProjects: 'getParamsTypeProjects',
    }),
  },

  watch: {
    valueSelected(val){
      if (val.length > 0) {
        this.pjTypeData.id = val[0].id;
        this.pjTypeData.projectTypeCode = val[0].projectTypeCode;
        this.pjTypeData.projectTypeName = val[0].projectTypeName;
        this.loadingBtn.edit = false;
        this.loadingBtn.remove = false;
      } else {
        this.loadingBtn.edit = true;
        this.loadingBtn.remove = true;
      }
    },
    
    isLoading(val){
      if (val === true) {
        const tmpParam = {
          id: '',
          isSearch: 1,
          projectTypeCode: '',
          projectTypeName: '',
          currentPage: this.getParamsTypeProjects.currentPage,
          pageRecord: 20,
          sortBy: 'projectTypeCode-ASC',
        };
        this.$store.dispatch('project/listProjectType', tmpParam);
        this.pjTypeData = {
          projectTypeCode: '',
          projectTypeName: '',
        };
      }
    },
  },
};
</script>
