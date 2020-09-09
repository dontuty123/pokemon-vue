<template>
  <div>
    <b-button size="md" class="mr-3 font-weight-bold" variant="primary" @click="searchPosition">
      <b-icon icon="search" aria-hidden="true" class="mr-2"></b-icon>Search
    </b-button>
    <b-button size="md" class="mr-3 font-weight-bold" variant="primary" @click="addPosition">
      <b-icon icon="plus-circle-fill" aria-hidden="true" class="mr-2"></b-icon>Add
    </b-button>
    <b-button size="md" 
      :disabled="disabled" 
      class="mr-3 font-weight-bold" 
      variant="primary"
      @click="updatePosition"
    >
      <b-icon icon="journal-plus" aria-hidden="true" class="mr-2"></b-icon>Update
    </b-button>
    <b-button size="md" 
      :disabled="disabled" 
      class="mr-3 font-weight-bold" 
      variant="primary"
       @click="deletePosition"
      > 
      <b-icon icon="trash" aria-hidden="true" class="mr-2"></b-icon>Delete
    </b-button>
    <b-button size="md" class="mr-3 font-weight-bold">
      <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Export
    </b-button>
    <b-button size="md" class="font-weight-bold" @click="clearData">
      <b-icon icon="arrow-clockwise" aria-hidden="true" class="mr-2"></b-icon>Clear All
    </b-button>

    <div class="px-5 pt-5 pb-3 border mt-5">
      <div class="d-flex align-items-center mb-2 flex-wrap">
        <label class="mb-0 mr-5 label-form">Position Code <code>*</code></label>
        <b-form-input class="input-form" maxlength="12" v-model="dataTable.positionCode" type="text"></b-form-input>
      </div>
      <div class="d-flex align-items-center mb-2 flex-wrap">
        <span class="mb-0 mr-5 label-form"></span>
        <p class="text-danger">{{dataMess.code}}</p>
      </div>
      
      <div class="d-flex align-items-center mb-2">
        <label class="mb-0 mr-5 label-form">Description <code>*</code></label>
        <b-form-input class="input-form" maxlength="50" v-model="dataTable.positionName" type="text"></b-form-input>
      </div>
       <div class="d-flex align-items-center flex-wrap">
        <span class="mb-0 mr-5 label-form"></span>
        <p class="text-danger">{{dataMess.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
   computed: {
    ...mapState('position', {
      record: state => state.record,
      messError: state => state.messError
    }),
 
  },
  watch: {
    'dataTable.positionCode'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.dataMess.code = ''
      }
    },
    'dataTable.positionName'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.dataMess.name = ''
      }
    },
  },
  methods: {
    addPosition() {
      const data = {
        positionCode: this.dataTable.positionCode,
        positionName: this.dataTable.positionName
      }
      this.$emit('addData', data)
    },

    updatePosition() {
      this.$emit('updateData', this.dataTable)
    },

    deletePosition() {
      this.$emit('deleteData', this.dataTable)
    },

    searchPosition() {
      this.$emit('searchData', this.dataTable)
    },

    clearData(){
      this.$emit('clearAll', '')
    }
  },
  props: ['dataTable', 'disabled', 'dataMess'],
}
</script>

<style>

</style>
