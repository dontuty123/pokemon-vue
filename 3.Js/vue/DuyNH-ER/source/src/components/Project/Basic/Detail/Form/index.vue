<template>
  <div>
    <div class="project-list-button mb-3">
      <b-button class="btn-type btn-type-1" @click="pjSearch()" :disabled="loadingBtn.search">
        <b-icon icon="search"></b-icon>Search
      </b-button>

      <b-button class="btn-type btn-type-1" @click="pjAdd()" :disabled="loadingBtn.add">
        <b-icon icon="plus-circle-fill"></b-icon>Add
      </b-button>

      <b-button class="btn-type btn-type-1" @click="pjUpdate()" :disabled="loadingBtn.update">
        <b-icon icon="plus-circle-fill"></b-icon>Update
      </b-button>

      <b-button class="btn-type btn-type-1" @click="pjDelete()" :disabled="loadingBtn.delete">
        <b-icon icon="trash"></b-icon>Delete
      </b-button>

      <b-button class="btn-type btn-type-2"  @click="importExcel()" :disabled="loadingBtn.import">
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
              <b-form-input size="sm" type="text" v-model="projectData.projectCode" maxlength="12"></b-form-input>
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
            v-if="projectData.projectCode === '' && requiredMsg !== ''">Project Code {{ requiredMsg }}</p>
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
              <b-form-input size="sm" type="text" v-model="projectData.projectName" maxlength="100"></b-form-input>
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
              <b-form-input size="sm" type="text" v-model="projectData.aliasName" maxlength="50"></b-form-input>
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
               <button type="button" class="ui small icon right labeled button btn-upload" @click="uploadFile">
                <i aria-hidden="true" class="h icon"></i>{{ fileName !== '' ? fileName : 'Choose File' }} 
              </button>
              <input
                type="file"
                ref="fileInput"
                accept=".xlsx, .xls, .xlsm"
                @change="previewFiles"
                class="ui small icon right labeled button btn-upload d-none"
              >
            </div>
            <div class="col-3">
              <b-link>
                <b>Get Standard File</b>
              </b-link>
            </div>
          </div>
            <p class="required-msg">{{ fileMsg }}</p>
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
      fileMsg: '',
      validateFile: false,
      projectData: {
        id: 0,
        projectCode: '',
        active: 0,
        projectName: '',
        aliasName: '',
        defaultProject: 0,
        pjFile: [],
      },
      fileName:'',
      paramsProjectType: {
        isSearch: 0,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 0,
        pageRecord: 20,
        sortBy: this.sortCommon,
      },
      projectTypeId: 0,
      listPjType: [],
      resultArray: [],
      loadingBtn: {
        search: false,
        add: false,
        update: true,
        delete: true,
        import: true
      },
      isClear: false,
      isAdd: false,
      sortText:'projectCode-ASC'
    };
  },
  props: {
    numberPage: {
      type: Number,
      required: false,
    },
    projectDataSelect: {
      type: Object,
      required: false
    },
    sortCommon: {
      type: String,
      required: false
    },
  },
  mounted() {
    this.litProjectType();
  },

  computed: {
    ...mapState('project', {
      listProjects: (state) => state.listProjects,
      listProjectType: (state) => state.listProjectType,
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
      this.isAdd = false
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
        sortBy: this.sortCommon,
      };  
      this.$store.commit('project/GET_PARAMS_LIST_PROJECT', dataSearch);
      this.$store.dispatch('project/searchProject');
      this.loadingBtn.update = true;
      this.loadingBtn.delete = true;
    },

    // Add Project
    pjAdd(){
      this.isAdd = true
      this.isClear = true
      const { projectCode, projectName, aliasName, active, defaultProject, projectTypeId } = this.projectData;
      if (projectCode === '' || projectName === '' || this.projectTypeId === 0) {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataAdd = this.projectData;
        delete dataAdd['id'];
        dataAdd.projectTypeId = this.projectTypeId;
        delete dataAdd['currentPage'];
        delete dataAdd['isSearch'];
        this.$store.dispatch('project/addProject', dataAdd);
      }
    },

    //Update Project
    pjUpdate(){
      this.isAdd = false
      this.isClear = true
      
      const { id, projectCode, projectName, aliasName, active, defaultProject, projectTypeId } = this.projectData;
      if (projectCode === '' || projectName === '' || this.projectTypeId === 0) {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const  dataUpdate = {
          id: id,
          projectCode: projectCode,
          projectName: projectName,
          aliasName: aliasName,
          projectTypeId: this.projectTypeId,
          active: active,
          defaultProject: defaultProject,
        }
        this.$store.dispatch('project/updateProject', dataUpdate);
      }
    },

    //Delete Project
    pjDelete(){
      this.isAdd = false
      this.isClear = true
      const dataDel = {
        id: this.projectData.id,
        projectTypeId: null,
      };
      this.$store.dispatch('project/deleteProject', dataDel);
      this.loadingBtn.update = true;
      this.loadingBtn.delete = true;
    },

    // Clear all input of Form
    pjClear(){
      this.isAdd = false
      this.projectData = {
        projectCode: '',
        active: 0,
        projectName: '',
        aliasName: '',
        defaultProject: 0,
        pjFile: [],
      };
      this.projectTypeId = 0;
      this.loadingBtn.import = true
    },

    //Upload File Excel
    uploadFile(){
      this.$refs.fileInput.click()
    },
  
    //check File import
    previewFiles(event){
      const validExts = new Array(".xlsx", ".xls", ".csv");
      if (event.target.files[0]) {
        let fileExt = event.target.files[0].name;
        let fileSize = event.target.files[0].size
        let fullname = event.target.files[0].name
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt) < 0 || fileSize > 15000) {
          this.fileName =''
          this.validateFile = false
          this.fileMsg = 'Request failed.'
          this.projectData.pjFile = []
          // this.$refs.fileInput.reset()
          this.loadingBtn.import = true
          return
        } else {
          this.fileName = fullname
          this.validateFile = true
          this.fileMsg = ''
          this.projectData.pjFile = event.target.files[0]
          this.loadingBtn.import = false
        }
      } 
    },
    
    //Import Excel
    importExcel(){
      this.isAdd = false
      if (this.validateFile) {
        this.$store.dispatch('project/getSecretKey');
        const formData = new FormData();
        setTimeout(() => {
          formData.append("file", this.projectData.pjFile)
          formData.append("secretKey", this.secretKey)
          this.$store.dispatch('project/importExcel', formData);
        }, 350);
      }
    },

    //Export Excel
    exportExcel(){
      this.isAdd = false
      const { projectCode, projectName, aliasName, active, defaultProject } = this.projectData;
      const dataSecretKey = {
        projectCode: projectCode ? projectCode : '',
        projectName: projectName ? projectName : '',
        projectTypeId: this.projectTypeId === 0 ? null : this.projectTypeId,
        aliasName: aliasName ? aliasName : '',
        active: active === 0 ? null : active,
        defaultProject: defaultProject === 0 ? null : defaultProject,
        sortBy: this.sortCommon,
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
          sortBy: this.sortCommon,
          secretKey: this.secretKey,
        };
        this.$store.dispatch('project/exportExcel', dataExport);
        window.open(this.linkExportExcel, '_blank');
      }, 350);
    },
  },

  watch: {
    projectDataSelect(val){
      console.log(val);
      if (val.projectCode) {
        this.projectData = val
        if (this.projectData.projectTypeId !==  null) {
          this.projectTypeId = this.projectData.projectTypeId
        } else {
          this.projectTypeId = 0
        }
        this.loadingBtn.update = false;
        this.loadingBtn.delete = false;
      } else {
        this.loadingBtn.update = true;
        this.loadingBtn.delete = true;
      }
    },

    listProjects(val){
      this.dataExport = val;
    },

    listProjectType(val){
      this.listPjType = val;
    },

    isLoading(val){     
      if (val === true) {
        let tmpParam = {
          isSearch: 0,
          projectCode: this.getParamsProjects.projectCode ? this.getParamsProjects.projectCode : '',
          projectName: this.getParamsProjects.projectName ? this.getParamsProjects.projectName :'',
          projectTypeId: this.getParamsProjects.projectTypeId,
          aliasName:  this.getParamsProjects.aliasName ? this.getParamsProjects.aliasName : '',
          currentPage: this.getParamsProjects.projectCode ?  1 : this.numberPage,
          active: null,
          defaultProject: null,
          pageRecord: 20,
          sortBy: this.sortCommon,
        };
        if (this.isAdd === true) {
           this.$emit('resetPage', 1)
            tmpParam = {
              isSearch: 0,
              projectCode: null,
              projectName: null,
              projectTypeId: null,
              aliasName:  null,
              currentPage: null,
              active: null,
              defaultProject: null,
              pageRecord: 20,
              sortBy: this.sortCommon,
            };
        }
        const { projectCode, projectName, aliasName, active, defaultProject } = this.projectData;
        this.$store.dispatch('project/getListProject', tmpParam);
        if (this.isClear === true) {
          this.projectData = {
            id: 0,
            projectCode: '',
            active: 0,
            projectName: '',
            aliasName: '',
            defaultProject: 0,
            pjFile: [],
          };
          this.projectTypeId = 0
        }   
      }
    },
  },
};
</script>
