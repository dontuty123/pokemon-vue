<template>
  <div>
    <div class="d-flex">

      <b-overlay :show="isLoading" rounded="sm">
        <b-button size="md" class="mr-3 font-weight-bold" variant="primary"  @click="searchProject"> 
          <b-icon icon="search" aria-hidden="true" class="mr-2"></b-icon>Search
        </b-button>
      </b-overlay>
      <b-overlay :show="isLoading" rounded="sm">
        <b-button size="md" class="mr-3 font-weight-bold" variant="primary" @click="addProject">
          <b-icon icon="plus-circle-fill" aria-hidden="true" class="mr-2"></b-icon>Add
        </b-button>
      </b-overlay>
      <b-overlay :show="isLoading" rounded="sm">
        <b-button 
          :disabled="disabled"
          size="md" 
          class="mr-3 font-weight-bold" 
          variant="primary"
          @click="updateProject"
          >
          <b-icon icon="journal-plus" aria-hidden="true" class="mr-2"></b-icon>Update
        </b-button>
      </b-overlay>
      <b-overlay :show="isLoading" rounded="sm">
        <b-button :disabled="disabled" 
          size="md" 
          class="mr-3 font-weight-bold" 
          variant="primary" 
          @click="deleteProject"> 
          <b-icon icon="trash" aria-hidden="true" class="mr-2"></b-icon>Delete
        </b-button>
      </b-overlay>
      <b-overlay :show="isLoading" rounded="sm">
        <b-button size="md" class="mr-3 font-weight-bold">
          <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Import
        </b-button>
      </b-overlay>
      <b-overlay :show="isLoading" rounded="sm">
        <b-button size="md" class="mr-3 font-weight-bold" @click="exportFile">
          <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Export
        </b-button>
      </b-overlay>
      <b-button size="md" class="font-weight-bold" @click="clearAll">
        <b-icon icon="arrow-clockwise" aria-hidden="true" class="mr-2"></b-icon>Clear All
      </b-button>
    </div>
    <div class="px-5 pt-5 pb-3 border mt-5">
      <div class="d-flex align-items-center mb-2 flex-wrap">
        <label class="mb-0 mr-5 label-form">Project Code <code>*</code></label>
        <b-form-input 
          v-model="dataForm.projectCode" 
          class="input-form mr-3" 
          maxlength="12" 
          type="text"></b-form-input>
        <b-form-checkbox
          id="checkbox-2"
          name="checkbox-2"
          v-model="dataForm.active"
          :value="1"
          :unchecked-value="0"
          class="text-primary font-weight-bold"
        >
          Active Project
        </b-form-checkbox>
      </div>
      <div class="d-flex align-items-center mb-2 flex-wrap">
        <span class="mb-0 mr-5 label-form"></span>
        <p class="text-danger mb-0">{{dataMess.code}}</p>
      </div>
      <div class="d-flex align-items-center mb-2">
        <label class="mb-0 mr-5 label-form">Project Name <code>*</code></label>
        <b-form-input 
        v-model="dataForm.projectName" 
        class="input-form" 
        maxlength="100" 
        type="text"></b-form-input>
      </div>
      <div class="d-flex align-items-center mb-2 flex-wrap">
        <span class="mb-0 mr-5 label-form"></span>
        <p class="text-danger mb-0">{{dataMess.name}}</p>
      </div>
      <div class="d-flex align-items-center mb-3">
        <label class="mb-0 mr-5 label-form">Alias Name</label>
        <b-form-input 
          v-model="dataForm.aliasName"
          class="input-form" 
          maxlength="50" 
          type="text"></b-form-input>
      </div>
      <div class="d-flex align-items-center mb-2">
        <label class="mb-0 mr-5 label-form">Project Type<code>*</code></label>
        <b-form-select v-model="dataForm.projectTypeId" 
          :options="options" 
          class="input-form mr-3" 
          value-field="id"
          text-field="projectTypeName"
         ></b-form-select>
        <router-link :to='"/"' class="d-block font-weight-bold">New</router-link>
      </div>
      <div class="d-flex align-items-center mb-2 flex-wrap">
        <span class="mb-0 mr-5 label-form"></span>
        <p class="text-danger mb-0">{{dataMess.type}}</p>
      </div>
      <div class="d-flex align-items-center mb-2">
        <label class="mb-0 mr-5 label-form">Upload File</label>
        <b-form-file
          class="input-form input-file mr-3"
          browse-text="***"
          placeholder="Choose File"
        ></b-form-file>
        <router-link :to='"/"' class="d-block font-weight-bold">Get Standard File</router-link>
      </div>
      <div class="d-flex align-items-center mb-2">
        <label class="mb-0 mr-5 label-form">Default Project</label>
        <b-form-checkbox
          id="checkbox-1"
          name="checkbox-1"
          :value="1"
          :unchecked-value="0"
          v-model="dataForm.defaultProject"
        >
        </b-form-checkbox>
      </div>
       <div class="d-flex align-items-center flex-wrap">
        <span class="mb-0 mr-5 label-form"></span>
        <p class="text-danger"></p>
      </div>
    </div>
  </div>
</template>

<script>
import operater from '@/core/util/operater.action'
export default {
  data() {
    return {
    }
  },
  watch: {
    'dataForm.projectCode'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.dataMess.code = ''
      }
    },
    'dataForm.projectName'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.dataMess.name = ''
      }
    },
    'dataForm.projectTypeCode'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.dataMess.type = ''
      }
    },
  },
  props: ['projectType', 'dataForm', 'disabled', 'options', 'dataMess', 'isLoading'],
  methods: {
    addProject() {
      this.$emit('addProjectData', this.dataForm)
    },

    searchProject() {
      this.$emit('searchProjectData', this.dataForm)
      const dataClear = []
      this.dataMess = operater.clear(this.dataMess, dataClear)
    },

    updateProject() {
      this.$emit('updateProjectData', this.dataForm)
    },

    deleteProject() {
       this.$emit('deleteProjectData', this.dataForm)
    },

    exportFile() {
      this.$emit('exportData', this.dataForm)
    },

    clearAll() {
      this.$emit('clearData')
    }
    
  }
}
</script>

<style>

</style>