<template>
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

      <b-button class="btn-type btn-type-2"  :disabled="true">
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
            <span class="label">Project Code</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <b-form-input size="sm" type="text" v-model="projectData.projectCode"></b-form-input>
            </div>
            <div class="col-3 label-checkbox">
              <b-form-checkbox
                name="Active Project"
                :value="1"
                :unchecked-value="0"
                v-model="projectData.active"
              >Active Project</b-form-checkbox>
            </div>
          </div>
          <p
            class="required-msg"
            v-if="projectData.projectCode === '' && requiredMsg !== ''"
          >Project Code {{ requiredMsg }}</p>
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="2"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">Project Name</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <b-form-input size="sm" type="text" v-model="projectData.projectName"></b-form-input>
            </div>
          </div>
          <p
            class="required-msg"
            v-if="projectData.projectName === '' && requiredMsg !== ''"
          >Project Name {{ requiredMsg }}</p>
        </b-form-group>
        <b-form-group label-cols="12" label-cols-md="2" label-size="sm" label-for="input-sm">
          <template v-slot:label>
            <span class="label">Alias Name</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <b-form-input size="sm" type="text" v-model="projectData.aliasName"></b-form-input>
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
            <span class="label">Project Type</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <b-form-select
                size="sm"
                v-model="projectTypeId"
                :options="listPjType"
                value-field="id"
                text-field="projectTypeName"
              >
                <option :value="0">All</option>
              </b-form-select>
            </div>
            <div class="col-3">
              <b-link href="/project-type">
                <b>New</b>
              </b-link>
            </div>
          </div>
          <p
            class="required-msg"
            v-if="projectTypeId === 0 && requiredMsg !== ''"
          >Project Type {{ requiredMsg }}</p>
        </b-form-group>

        <b-form-group label-cols="12" label-cols-md="2" label-size="sm" label-for="input-sm">
          <template v-slot:label>
            <span class="label">Upload File</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <b-form-file
                v-model="projectData.pjFile"
                ref="file-input"
                class="ui small icon right labeled button btn-upload"
              ></b-form-file>
            </div>
            <div class="col-3">
              <b-link>
                <b>Get Standard File</b>
              </b-link>
            </div>
          </div>
        </b-form-group>

        <b-form-group label-cols="12" label-cols-md="2" label-size="sm" label-for="input-sm">
          <template v-slot:label>
            <span class="label">Default Project</span>
          </template>
          <div class="row w-input d-flex pt-1">
            <div class="col-6">
              <b-form-checkbox
                id="checkbox-1"
                v-model="projectData.defaultProject"
                name="checkbox-1"
                value="1"
                unchecked-value="0"
              ></b-form-checkbox>
            </div>
          </div>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Project',
  data() {
    return {
      requiredMsg: '',
      projectData: {
        id: 0,
        projectCode: '',
        active: 0,
        projectName: '',
        aliasName: '',
        defaultProject: 0,
        pjFile: [],
      },
      paramsProjectType: {
        isSearch: 0,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 0,
        pageRecord: 20,
        sortBy: 'projectTypeCode-ASC',
      },
      projectTypeId: 0,
      listPjType: [],
      resultArray: [],
      loadingBtn: {
        search: false,
        add: false,
        edit: true,
        remove: true,
      },
    };
  },

  mounted() {
    this.litProjectType();
  },

  computed: {
    ...mapState('project', {
      listProjects: (state) => state.listProjects,
      listProjectType: (state) => state.listProjectType,
      valueSelected: (state) => state.valueSelected,
      isLoading: (state) => state.isLoading,
      secretKey: (state) => state.secretKey,
      linkExportExcel: (state) => state.linkExportExcel,
    }),
    ...mapGetters('project', {
      getParamsProjects: 'getParamsProjects',
    }),
  },

  methods: {
    //List Project Type at select-input
    litProjectType(){
      this.$store.dispatch('project/listProjectType', this.paramsProjectType);
    },

    // Search project
    pjSearch(){
      const { projectCode, projectName, aliasName, active, defaultProject } = this.projectData;
      const dataSearch = {
        isSearch: 1,
        projectCode: projectCode ? projectCode : '',
        projectName: projectName ? projectName : '',
        projectTypeId: this.projectTypeId === 0 ? null : this.projectTypeId,
        aliasName: aliasName ? aliasName : '',
        currentPage: 1,
        active: active === 0 ? null : active,
        defaultProject: defaultProject === 0 ? null : defaultProject,
        pageRecord: 20,
        sortBy: 'projectCode-ASC',
      };
      this.$store.commit('project/GET_PARAMS_LIST_PROJECT', dataSearch);
      this.$store.dispatch('project/searchProject');
    },

    // Add Project
    pjAdd(){
      const { projectCode, projectName, aliasName, active, defaultProject, projectTypeId } = this.projectData;
      if (projectCode === '' || projectName === '' || this.projectTypeId === 0) {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataAdd = this.projectData;
        delete dataAdd['id'];
        dataAdd.projectTypeId = this.projectTypeId;
        this.$store.dispatch('project/addProject', dataAdd);
        const dataResult = {
          isSearch: 1,
          projectCode: '',
          projectName: '',
          projectTypeId: null,
          aliasName: '',
          currentPage: 1,
          active: null,
          defaultProject: null,
          pageRecord: 20,
          sortBy: 'projectCode-ASC',
        };
        this.$store.commit('project/GET_PARAMS_LIST_PROJECT', dataResult);
        this.$store.dispatch('project/searchProject');
      }
    },

    //Update Project
    pjUpdate(){
      const { id, projectCode, projectName, aliasName, active, defaultProject, projectTypeId } = this.projectData;
      if (projectCode === '' || projectName === '' || this.projectTypeId === 0) {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataUpdate = this.projectData;
        dataUpdate.projectTypeId = this.projectTypeId;
        dataUpdate.currentPage = this.getParamsProjects.currentPage;
        this.$store.dispatch('project/updateProject', dataUpdate);
      }
    },

    //Delete Project
    pjDelete(){
      const dataDel = {
        id: this.projectData.id,
        projectTypeId: null,
      };
      this.$store.dispatch('project/deleteProject', dataDel);
    },

    // Clear all input of Form
    pjClear(){
      this.projectData = {
        projectCode: '',
        active: 0,
        projectName: '',
        aliasName: '',
        defaultProject: 0,
        pjFile: [],
      };
      this.projectTypeId = 0;
    },
    

    //Export Excel
    exportExcel(){
      const { projectCode, projectName, aliasName, active, defaultProject } = this.projectData;
      const dataSecretKey = {
        projectCode: projectCode ? projectCode : '',
        projectName: projectName ? projectName : '',
        projectTypeId: this.projectTypeId === 0 ? null : this.projectTypeId,
        aliasName: aliasName ? aliasName : '',
        active: active === 0 ? null : active,
        defaultProject: defaultProject === 0 ? null : defaultProject,
        sortBy: 'projectCode-ASC',
        secretKey: '',
      };
      this.$store.dispatch('project/getSecretKey', dataSecretKey);
      setTimeout(() => {
        const dataExport = {
          projectCode: projectCode ? projectCode : '',
          projectName: projectName ? projectName : '',
          projectTypeId: this.projectTypeId === 0 ? null : this.projectTypeId,
          aliasName: aliasName ? aliasName : '',
          active: active === 0 ? null : active,
          defaultProject: defaultProject === 0 ? null : defaultProject,
          sortBy: 'projectCode-ASC',
          secretKey: this.secretKey,
        };
        this.$store.dispatch('project/exportExcel', dataExport);
        window.open(this.linkExportExcel, '_blank');
      }, 350);
    },
  },

  watch: {
    listProjects(val){
      this.dataExport = val;
    },

    listProjectType(val){
      this.listPjType = val;
    },

    valueSelected(val){
      if (val.length > 0) {
        this.projectData.id = val[0].id;
        this.projectData.projectCode = val[0].projectCode;
        this.projectData.projectName = val[0].projectName;
        this.projectTypeId = val[0].projectTypeId;
        this.projectData.aliasName = val[0].aliasName;
        this.projectData.active = val[0].active;
        this.projectData.defaultProject = val[0].defaultProject;
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
          isSearch: 1,
          projectCode: '',
          projectName: '',
          projectTypeId: this.getParamsProjects.projectTypeId,
          aliasName: '',
          currentPage: this.getParamsProjects.currentPage,
          active: null,
          defaultProject: null,
          pageRecord: 20,
          sortBy: 'projectCode-ASC',
        };
        const { projectCode, projectName, aliasName, active, defaultProject } = this.projectData;
        this.$store.dispatch('project/getListProject', tmpParam);
        this.projectData = {
          id: 0,
          projectCode: '',
          active: 0,
          projectName: '',
          aliasName: '',
          defaultProject: 0,
          pjFile: [],
        };
      }
    },
  },
};
</script>
