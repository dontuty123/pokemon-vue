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
              <b-form-select
                size="sm"
                value-field="id"
                text-field="projectName"
              >
                <option :value="0">All</option>
              </b-form-select>
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
              <b-form-select
                size="sm"
                value-field="id"
                text-field="projectName"
              >
                <option :value="0">All</option>
              </b-form-select>
            </div>
          </div>
        </b-form-group>
        
      </b-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OMProject',

  data() {
    return {};
  },

  methods: {},

  mounted() {},

  computed: {},
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
