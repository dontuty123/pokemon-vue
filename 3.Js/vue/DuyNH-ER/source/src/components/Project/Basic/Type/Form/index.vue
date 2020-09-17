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

        <b-button class="btn-type btn-type-1" @click="pjUpdate()" :disabled="loadingBtn.update">
          <b-icon icon="plus-circle-fill"></b-icon>Update
        </b-button>

        <b-button class="btn-type btn-type-1" @click="pjDelete()" :disabled="loadingBtn.delete">
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
        sortBy: this.sortCommon,
      },
      loadingBtn: {
        search: false,
        add: false,
        update: true,
        delete: true,
      },
      isAdd: false,
      isClear: false
    };
  },
  props: {
    numberPage: {
      type: Number,
      required: false,
    },
    projectTypeSelect: {
      type: Object,
      required: false
    },
    sortCommon: {
      type: String,
      required: false
    },
  },
  methods: {
    // Search project Type
    pjSearch(){
      this.isAdd = false
      const { isSearch, projectTypeCode, projectTypeName, currentPage, pageRecord } = this.pjTypeData;
      const dataSearch = {
        isSearch: 1,
        projectTypeCode: projectTypeCode ? projectTypeCode : '',
        projectTypeName: projectTypeName ? projectTypeName : '',
        currentPage: 1,
        pageRecord: 20,
        sortBy: this.sortCommon,
      };
      this.$store.commit('project/GET_PARAMS_TYPE_PROJECT', dataSearch);
      this.$store.dispatch('project/searchProjectType');
      this.loadingBtn.update = true;
      this.loadingBtn.delete = true;
    },

    // Add Project Type
    pjAdd(){
      this.isAdd = true
      this.isClear = true
      const { projectTypeCode, projectTypeName } = this.pjTypeData;
      if (projectTypeCode === '' || projectTypeName === '') {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataAdd = this.pjTypeData;
        delete dataAdd['id'];
        this.$store.dispatch('project/addProjectType', dataAdd);
      }
    },

    // Update Project Type
    pjUpdate(){
      this.isAdd = false
      this.isClear = true
      const { id, projectTypeCode, projectTypeName } = this.pjTypeData;
      if (projectTypeCode === '' || projectTypeName === '') {
        this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataUpdate = {
          isSearch: 1,
          id: id,
          projectTypeCode: projectTypeCode,
          projectTypeName: projectTypeName
        }
        this.$store.dispatch('project/updateProjectType', dataUpdate);
      }
    },

    //Delete Project type
    pjDelete(){
      this.isAdd = false
      this.isClear = true
      const dataDel = {
        id: this.pjTypeData.id,
      };
      this.$store.dispatch('project/deleteProjectType', dataDel);
    },

    // Clear all input of Form
    pjClear(){
      this.isAdd = false
      this.pjTypeData = {
        id: null,
        projectTypeCode: '',
        projectTypeName: '',
        currentPage: 1,
        pageRecord: 20,
      };
    },

    //Export Excel
    exportExcel(){
      this.isAdd = false
      const { projectTypeCode, projectTypeName } = this.pjTypeData;
      const dataSecretKey = {
        projectTypeCode: projectTypeCode ? projectTypeCode : '',
        projectTypeName: projectTypeName ? projectTypeName : '',
        sortBy: this.sortCommon,
        secretKey: '',
      };
      this.$store.dispatch('project/getSecretKeyPjType', dataSecretKey);
      setTimeout(() => {
        const dataExport = {
          projectTypeCode: projectTypeCode ? projectTypeCode : '',
          projectTypeName: projectTypeName ? projectTypeName : '',
          sortBy: this.sortCommon,
          secretKey: this.secretKeylPjType,
        };
        this.$store.dispatch('project/exportExcelPjType', dataExport);
        window.open(this.linkExportExcelPjType, '_blank');
      }, 350);
    },
  },

  computed: {
    ...mapState('project', {
      listProjectType: (state) => state.listProjectType,
      isLoading: (state) => state.isLoading,
      secretKeylPjType: (state) => state.secretKeylPjType,
      linkExportExcelPjType: (state) => state.linkExportExcelPjType,
    }),
    ...mapGetters('project', {
      getParamsTypeProjects: 'getParamsTypeProjects',
    }),
  },

  watch: {
    projectTypeSelect(val) {
      if (val.projectTypeCode) {
        this.pjTypeData.id = val.id;
        this.pjTypeData.projectTypeCode = val.projectTypeCode;
        this.pjTypeData.projectTypeName = val.projectTypeName;
        this.loadingBtn.update = false;
        this.loadingBtn.delete = false;
      } else {
        this.loadingBtn.update = true;
        this.loadingBtn.delete = true;
      }
    },
    
    isLoading(val){
      if (val === true) {
        let tmpParam = {
          isSearch: 1,
          projectTypeCode: this.getParamsTypeProjects.projectTypeCode ? this.getParamsTypeProjects.projectTypeCode : '',
          projectTypeName: this.getParamsTypeProjects.projectTypeName ? this.getParamsTypeProjects.projectTypeName :'',
          currentPage: this.getParamsTypeProjects.projectTypeCode ?  1 : this.numberPage,
          pageRecord: 20,
          sortBy: this.sortCommon,
        };
        if (this.isAdd === true) {
          this.$emit('resetPage', 1)
          tmpParam = {
            id: '',
            isSearch: 0,
            projectTypeCode: '',
            projectTypeName: '',
            currentPage: null,
            pageRecord: 20,
            sortBy: this.sortCommon,
          };
        }
        this.$store.dispatch('project/listProjectType', tmpParam);
        if (this.isClear === true) {
          this.pjTypeData = {
            projectTypeCode: '',
            projectTypeName: '',
          };
        }
      }
    },
  },
};
</script>
