<template>
  <div class="er-department">
    <div class="list-button mt-5">
      <b-button class="btn-type btn-type-1" @click="searchData">
        <b-icon icon="search"></b-icon>{{$t('button["search"]')}}
      </b-button>
      <b-button class="btn-type btn-type-1">
        <b-icon icon="plus-circle-fill"></b-icon>{{$t('button["add"]')}}
      </b-button>
      <b-button class="btn-type btn-type-1">
        <b-icon icon="plus-circle-fill"></b-icon>{{$t('button["update"]')}}
      </b-button>
      <b-button class="btn-type btn-type-1">
        <b-icon icon="trash"></b-icon>{{$t('button["delete"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{$t('button["export"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="arrow-repeat"></b-icon>{{$t('button["clear"]')}}
      </b-button>
    </div>
      <div class="form-input mt-5">
      <b-form class="form-edit w-75 mb-1">
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">{{$t('department["code"]')}}</span>
          </template>
          <div class="row w-input">
            <div class="col-7">
              <b-form-input 
                type="text" 
                v-model="dataInfo.departmentCode"
              ></b-form-input>
            </div>
          </div>
        </b-form-group>
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">{{$t('department["description"]')}}</span>
          </template>
          <div class="row w-input">
            <div class="col-7">
              <b-form-input 
                type="text" 
                v-model="dataInfo.departmentName"              
              ></b-form-input>
            </div>
          </div>
        </b-form-group>
        
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'departmentForm',
  props: ['dataInfo'],
  methods: {
    searchData(val) {
      this.$emit('SearchList', this.dataInfo)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>