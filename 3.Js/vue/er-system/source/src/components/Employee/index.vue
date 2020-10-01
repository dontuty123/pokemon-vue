<template>
  <div class="er-employee">
    <div class="list-button mt-4">
      <b-button class="btn-type btn-type-1" @click="searchData">
        <b-icon icon="search"></b-icon>{{ $t('button["search"]') }}
      </b-button>
      <b-button :disabled="disabled" class="btn-type btn-type-1">
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["add"]') }}
      </b-button>
      <b-button class="btn-type btn-type-1" :disabled="disabled">
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
                type="text" v-model="dataForm.employeeCode"
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
                type="text" v-model="dataForm.nickName"            
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
                type="text" v-model="dataForm.firstName"            
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
                type="text" v-model="dataForm.lastName"              
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
                type="text" v-model="dataForm.email"             
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
              <b-form-select v-model="dataForm.role" :options="listRole"            
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
              <b-form-select v-model="dataForm.billable" :options="listBillable"           
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
              <b-form-select v-model="dataForm.level" :options="listLevel"            
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
                v-model="dataForm.status"
                name="some-radios" 
                value="0"
                class="mr-4"
                >
                {{ $t('employee["working"]') }}
              </b-form-radio>
              <b-form-radio 
                v-model="dataForm.status" 
                name="some-radios" 
                value="1">
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
          <span class="mr-3 pl-4">{{ $t('employee["position"]') }}</span>
          <router-link to='/'>{{ $t('employee["new"]') }}</router-link>
        </p>
        <p class="font-weight-bold w-50">
          <span class="mr-3">{{ $t('employee["department"]') }}</span>
          <router-link to='/'>{{ $t('employee["new"]') }}</router-link>
        </p>
      </div>
      <div v-if="isLoad">
        <div class="w-100 d-flex mt-2" v-for="(item, index) in dataForm.employeePosition" :key="index">
        <div class="w-50" v-if="index===0 ? true : isSub">
          <div class="d-flex align-item-center ">
            <b-form-radio 
              class="d-inline mt-1"
              v-model="item.isMain" value="1" 
              name='selectData'
              v-if='isSub'
              @change="changeRadio(index)"
              >
              </b-form-radio>
            <model-list-select
              :list="positionList" 
              class="input-select"
              size="sm"
              v-model="item.positionName"
              option-value="positionName"
              :custom-text="customTextPosition"
              placeholder="All"
            >
            </model-list-select> 
          </div>
         </div>
         <div class="w-50" v-if="index===0 ? true : isSub">
          <div class="d-flex align-item-center ">
            <model-list-select 
              :list="departmentList"
              class="input-select"
              size="sm"
              v-model="item.departmentName"
              option-value="departmentName"
              :custom-text="customTextDepartment"
              placeholder="All"
            ></model-list-select>
            <b-button v-if="index !== 0 ? true : false" class="ml-2" @click="subSelect(item,index)">
              <b-icon icon="dash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button v-if="index === 0 ? true : false" class="ml-2" @click="addSelect(item,index)">
              <b-icon icon="plus" aria-hidden="true"></b-icon>
            </b-button>
          </div>
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
      positionSelected: {
        positionCode: '',
        positionName: 'All',
        id: 0
      },
      departmentSelected: {
        departmentCode: '',
        departmentName: 'All',
        id: 0
      },
      item1: false,
      items: [
        {
          positionSelected: '',
          departmentSelected: ''
        }
      ],
      showSelect: true,
      isSub:  true,
      listBillable: [
        {
          value: '',
          text: 'All'
        },
        {
          value: 0,
          text: 'Yes'
        },
        {
          value: 1,
          text: 'No'
        }
      ],
      listLevel: [
        {
          value: '',
          text: 'All'
        },
        {
          value: 0,
          text: 'Staff'
        },
        {
          value: 1,
          text: 'Manager'
        },
         {
          value: 2,
          text: 'Director'
        },
        {
          value: 3,
          text: 'Supervisor'
        },
        {
          value: 4,
          text: 'Team Leader'
        }
      ],
      listRole: [
        {
          value: '',
          text: 'All'
        },
        {
          value: 0,
          text: 'Staff'
        },
        {
          value: 1,
          text: 'HR'
        },
         {
          value: 2,
          text: 'Admin'
        },
        {
          value: 3,
          text: 'Director'
        }
      ]
    }
  },
  props: ['positionList', 'departmentList', 'dataForm', 'isLoad', 'disabled'],
  methods: {
    customTextPosition(item) {
       return item.positionCode !== '' ? `${item.positionName}` : `All`
    },
    customTextDepartment(item) {
      return item.departmentCode !== '' ? `${item.departmentName}` : `All`
    },
    addSelect(item) {
      this.isSub = true
      const newLenght = this.dataForm.employeePosition.length
      if (newLenght < 5) {
        // this.showSelect = true
        const newItem = {
          departmentCode: '',
          departmentId: '',
          departmentName: '',
          isMain: '',
          positionCode: '',
          positionId: '',
          positionName: '',
        }
        this.dataForm.employeePosition = [...this.dataForm.employeePosition, newItem]
      }
    },
    subSelect(item,index) {
      this.isSub = false
      const {employeePosition} = this.dataForm
      if (employeePosition[index].isMain === '1') {
        employeePosition[0].isMain = '1'
      }
      employeePosition.splice(index,1)      
      setTimeout(() => {
         this.isSub = true
      }, 10);
    },
    changeRadio(index) {
      const {employeePosition} = this.dataForm
      const positionlenght = employeePosition.length
      for (let i = 0; i < employeePosition.length; i++ ){
        employeePosition[i].isMain = '0'
      }
      employeePosition[index].isMain = '1'
    },
    searchData() {
      this.$emit('searchList', this.dataForm)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>