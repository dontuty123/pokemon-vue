<template>
  <div class="er-employee">
    <div class="list-button mt-4">
      <b-button class="btn-type btn-type-1">
        <b-icon icon="search"></b-icon>{{ $t('button["search"]') }}
      </b-button>
      <b-button class="btn-type btn-type-1">
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["add"]') }}
      </b-button>
      <b-button 
        class="btn-type btn-type-1"
        >
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["update"]') }}
      </b-button>
      <b-button 
        class="btn-type btn-type-1"
        >
        <b-icon icon="trash"></b-icon>{{ $t('button["delete"]') }}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{ $t('button["export"]') }}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="arrow-repeat"></b-icon>{{ $t('button["clear"]') }}
      </b-button>
    </div>
    <div class="form-input mt-4 flex-wrap">
      <b-form class="form-edit w-50 mb-1">
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">{{ $t('employee["code"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-input 
                type="text" 
              ></b-form-input>
            </div>
          </div>
          <!-- <p v-if="!messCode" class="text-danger">{{ $t('messages["028"]') }}</p> -->
        </b-form-group>
         
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="font-weight-bold"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["nickName"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-input 
                type="text"              
              ></b-form-input>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>
        
        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["firstName"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-input 
                type="text"              
              ></b-form-input>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="font-weight-bold"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["lastName"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-input 
                type="text"              
              ></b-form-input>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="font-weight-bold"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["email"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-input 
                type="text"              
              ></b-form-input>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["role"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-select              
              ></b-form-select>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["billable"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-select              
              ></b-form-select>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["level"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-select              
              ></b-form-select>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>

        <b-form-group
          label-cols="12"
          label-cols-md="3"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        > 
          <template v-slot:label>
            <span class="label">{{ $t('employee["status"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8 d-flex">
              <b-form-radio 
                v-model="selected"
                name="some-radios" 
                value="A"
                class="mr-4"
                >
                {{ $t('employee["working"]') }}
              </b-form-radio>
              <b-form-radio 
                v-model="selected" 
                name="some-radios" 
                value="B">
                {{ $t('employee["nonWorking"]') }}
              </b-form-radio>
            </div>
          </div>
          <!-- <p v-if="!messName" class="text-danger">{{ $t('messages["014"]') }}</p> -->
        </b-form-group>
      </b-form>
      <div class="w-50">
        <div class="form-edit w-100 mb-1 d-flex">
        <p class="font-weight-bold w-50">
          <span class="mr-3 pl-5">{{ $t('employee["position"]') }}</span>
          <router-link to='/'>{{ $t('employee["new"]') }}</router-link>
        </p>
        <p class="font-weight-bold w-50">
          <span class="mr-3">{{ $t('employee["department"]') }}</span>
          <router-link to='/'>{{ $t('employee["new"]') }}</router-link>
        </p>
      </div>
      <div class="w-100 d-flex">
        <div class="w-50">
          <div class="d-flex align-item-center">
            <b-form-radio class="d-inline mt-1"></b-form-radio>
            <model-list-select
              :list="positionList" 
              class="input-select"
              size="sm"
              v-model="positionSelected"
              option-value="positionCode"
            >
            </model-list-select> 
          </div>
         </div>
         <div class="w-50">
          <div class="d-flex align-item-center">
            <!-- <model-list-select 
              class="input-select"
              size="sm"
            ></model-list-select> -->
            <b-button>
              <b-icon icon="plus" aria-hidden="true"></b-icon>
            </b-button>
          </div>
         </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select'
export default {
  components: {
    ModelListSelect
  },
  data() {
    return {
      selected: 'A',
      positionSelected: {
        positionCode: '',
        positionName: 'All',
        id: 0
      }
    }
  },
  props: {
   positionList:{
     type: Array,
      required: false,
   }
    
  },
  methods: {

  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>