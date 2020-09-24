<template>
  <div class="er-department">
    <div class="list-button mt-4">
      <b-button class="btn-type btn-type-1" @click="searchData">
        <b-icon icon="search"></b-icon>{{ $t('button["search"]') }}
      </b-button>
      <b-button class="btn-type btn-type-1" @click="addData">
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["add"]') }}
      </b-button>
      <b-button 
        :disabled="disabled" 
        class="btn-type btn-type-1"
        @click="updateData"
        >
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["update"]') }}
      </b-button>
      <b-button 
        :disabled="disabled" 
        class="btn-type btn-type-1"
        @click="deleteData"
        >
        <b-icon icon="trash"></b-icon>{{ $t('button["delete"]') }}
      </b-button>
      <b-button class="btn-type btn-type-2" @click="exportFile">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{ $t('button["export"]') }}
      </b-button>
      <b-button class="btn-type btn-type-2" @click="clearAll">
        <b-icon icon="arrow-repeat"></b-icon>{{ $t('button["clear"]') }}
      </b-button>
    </div>
      <div class="form-input mt-4">
      <b-form class="form-edit w-75 mb-1">
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">{{ $t('department["code"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-7">
              <b-form-input 
                type="text" 
                v-model="dataInfo.departmentCode"
              ></b-form-input>
            </div>
          </div>
          <p v-if="!messCode" class="text-danger">{{ $t('messages["028"]') }}</p>
        </b-form-group>
         
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('department["description"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-7">
              <b-form-input 
                type="text" 
                v-model="dataInfo.departmentName"              
              ></b-form-input>
            </div>
          </div>
          <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p>
        </b-form-group>
        
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'departmentForm',
  data() {
    return {
      messName: true,
      messCode: true
    }
  },
  props: ['dataInfo', 'disabled'],
  watch: {
    'dataInfo.departmentName'(val){
      this.messName = true
    },
    'dataInfo.departmentCode'(val){
      this.messCode = true
    },
  },
  methods: {
    searchData() {
      this.messName = true
      this.messCode = true
      this.$emit('searchList', this.dataInfo)
    },
    addData() {
      this.messCode = this.dataInfo.departmentCode === '' ? false : true
      this.messName = this.dataInfo.departmentName === '' ? false : true
      const validate = this.messCode && this.messName ? true : false
      this.$emit('addList', this.dataInfo,validate)
    },
    updateData() {
      this.messCode = this.dataInfo.departmentCode === '' ? false : true
      this.messName = this.dataInfo.departmentName === '' ? false : true
      const validate = this.messCode && this.messName ? true : false
      this.$emit('updateList', this.dataInfo, validate)
    },
    deleteData() {
      this.$emit('deleteList', this.dataInfo)
    },
    exportFile() {
      this.$emit('exportList', this.dataInfo)
    },
    clearAll() {
      this.messName = true
      this.messCode = true
      this.$emit('clearList', this.dataInfo)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>
