<template>
  <div class="er-employee">
    <div class="list-button mt-4">
      <b-button class="btn-type btn-type-1" @click="searchData">
        <b-icon icon="search"></b-icon>{{ $t('button["search"]') }}
      </b-button>
      <b-button class="btn-type btn-type-1" @click="addData">
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["add"]') }}
      </b-button>
      <b-button class="btn-type btn-type-1" :disabled="disabled" @click="updateData">
        <b-icon icon="plus-circle-fill"></b-icon>{{ $t('button["update"]') }}
      </b-button>
      <b-button class="btn-type btn-type-1" :disabled="disabled" @click="deleteData">
        <b-icon icon="trash"></b-icon>{{ $t('button["delete"]') }}
      </b-button>
      <b-button class="btn-type btn-type-2" @click="exportFile">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{ $t('button["export"]') }}
      </b-button>
      <b-button class="btn-type btn-type-2" @click="clearAll">
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
                maxlength="12"
              ></b-form-input>
            </div>
          </div>
          <span 
            v-if="$i18n.locale === 'vn' && messCode"
            class="text-danger"
          >
          {{ $t('messages["029"]') }} {{ $t('employee["code"]') }}
          </span>
          <span 
            v-if="$i18n.locale === 'en' && messCode"
            class="text-danger"
          >
          {{ $t('employee["code"]') }} {{ $t('messages["029"]') }}
          </span>
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
                maxlength="50"            
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
            <span class="label">{{ $t('employee["firstName"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-input 
                type="text" v-model="dataForm.firstName"  
                maxlength="50"          
              ></b-form-input>
            </div>
          </div>
          <span 
            v-if="$i18n.locale === 'vn' && messName" 
            class="text-danger"
          >
          {{ $t('messages["029"]') }} {{ $t('employee["firstName"]') }}
          </span>
          <span 
            v-if="$i18n.locale === 'en' && messName"
            class="text-danger"
          >
          {{ $t('employee["firstName"]') }} {{ $t('messages["029"]') }}
          </span>
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
                maxlength="50"             
              ></b-form-input>
            </div>
          </div>
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
                maxlength="255"           
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
            <span class="label">{{ $t('employee["role"]') }}</span>
          </template>
          <div class="row w-input">
            <div class="col-8">
              <b-form-select v-model="dataForm.role" :options="listRole"            
              ></b-form-select>
            </div>
          </div>
          <span 
            v-if="$i18n.locale === 'vn' && messRole"
            class="text-danger"
          >
          {{ $t('messages["029"]') }} {{ $t('employee["role"]') }}
          </span>
          <span 
            v-if="$i18n.locale === 'en' && messRole" 
            class="text-danger"
          >
          {{ $t('employee["role"]') }} {{ $t('messages["029"]') }}
          </span>
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
          <span 
            v-if="$i18n.locale === 'vn' && messBillable" 
            class="text-danger"
          >
          {{ $t('messages["029"]') }} {{ $t('employee["billable"]') }}
          </span>
          <span 
            v-if="$i18n.locale === 'en' && messBillable" 
            class="text-danger"
          >
          {{ $t('employee["billable"]') }} {{ $t('messages["029"]') }}
          </span>
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
          <span 
            v-if="$i18n.locale === 'vn' && messLevel" 
            class="text-danger"
          >
          {{ $t('messages["029"]') }} {{ $t('employee["level"]') }}
          </span>
          <span 
            v-if="$i18n.locale === 'en' && messLevel" 
            class="text-danger"
          >
          {{ $t('employee["level"]') }} {{ $t('messages["029"]') }}
          </span>
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
        </b-form-group>
      </b-form>
      <div class="w-50">
        <div class="form-edit w-100 mb-1 d-flex">
        <p class="font-weight-bold w-50">
          <span class="mr-3 pl-4">{{ $t('employee["position"]') }}</span>
          <router-link to='/position'>{{ $t('employee["new"]') }}</router-link>
        </p>
        <p class="font-weight-bold w-50">
          <span class="mr-3">{{ $t('employee["department"]') }}</span>
          <router-link to='/department'>{{ $t('employee["new"]') }}</router-link>
        </p>
      </div>
      <div v-if="isLoad">
        <div class="w-100 d-flex mt-2" v-for="(item, index) in dataForm.employeePosition" :key="index">
        <div class="w-50" v-if="index===0 ? true : isSub">
          <div class="d-flex align-item-center flex-wrap">
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
              v-model="item.position"
              option-value="positionName"
              :custom-text="customTextPosition"
              placeholder="All"
            >
            </model-list-select> 
            <span class="text-danger w-100 pl-4" 
              v-if="$i18n.locale === 'vn' && item.position.status">
              {{ $t('messages["029"]') }} {{ $t('employee["positionName"]') }}
            </span>
            <span class="text-danger w-100 pl-4" 
              v-if="$i18n.locale === 'en' && item.position.status">
              {{ $t('employee["departmentName"]') }} {{ $t('messages["029"]') }} 
            </span>
          </div>
         </div>
         <div class="w-50" v-if="index===0 ? true : isSub">
          <div class="d-flex align-item-center flex-wrap">
            <div class="w-100 d-flex">
              <model-list-select 
                :list="departmentList"
                class="input-select"
                size="sm"
                v-model="item.department"
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
             <span class="text-danger w-100" 
              v-if="$i18n.locale === 'vn' && item.department.status">
              {{ $t('messages["029"]') }} {{ $t('employee["department"]') }}
            </span>
            <span class="text-danger w-100" 
              v-if="$i18n.locale === 'en' && item.department.status">
              {{ $t('employee["department"]') }} {{ $t('messages["029"]') }} 
            </span>
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
import resetValueObj from '@/core/util/resetValueObj'
export default {
  components: {
    ModelListSelect
  },
  data() {
    return {
      showSelect: true,
      isSub: true,
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
      ],
      messCode: '',
      messName: '',
      messMail: '',
      messRole: '',
      messLevel: '',
      messBillable: '',
      statusAdd: false
    }
  },
  props: ['positionList', 'departmentList', 'dataForm', 'isLoad', 'disabled'],
  watch: {
    'dataForm.employeeCode'(val) {
      this.messCode = false 
    },
    'dataForm.firstName'(val) {
      this.messName = false 
    },
    'dataForm.email'(val) {
      this.messMail = false 
    },
    'dataForm.role'(val) {
      this.messRole = false 
    },
    'dataForm.level'(val) {
      this.messLevel = false 
    },
    'dataForm.billable'(val) {
      this.messBillable = false 
    }
  },
  methods: {
    //custom text in select search position
    customTextPosition(item) {
      return item.positionCode !== '' ? `${item.positionName}` : `All`
    },

    //custom text in select search departmen
    customTextDepartment(item) {
      return item.departmentCode !== '' ? `${item.departmentName}` : `All`
    },

    // add new select group search
    addSelect(item) {
      this.isSub = true
      this.statusAdd = true
      const newLength = this.dataForm.employeePosition.length
      if (newLength < 5) {
        const newItem = {
          position: {
            positionCode: '',
            id: '',
            positionName: '',
            status: false
          },
          department: {
            departmentCode: '',
            id: '',
            departmentName: '',
            status: false
          },              
          isMain: '0', 
        }
        this.dataForm.employeePosition = [...this.dataForm.employeePosition, newItem]
      }
      this.statusAdd = false
    },

    //Remove group select search in list 
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

    //Change data in list when change value radio group select
    changeRadio(index) {
      const {employeePosition} = this.dataForm
      const positionlength = employeePosition.length
      for (let i = 0; i < positionlength; i++ ){
        employeePosition[i].isMain = '0'
      }
      employeePosition[index].isMain = '1'
    },

    //Click button search emit data to parent
    searchData() {
      this.$emit('searchList', this.dataForm)
    },

    //Validate from data, show error message 
    validateForm(val) {
      this.messCode = val.employeeCode === '' ? true : false
      this.messName = val.firstName === '' ? true : false
      this.messRole = val.role === '' ? true : false
      this.messLevel = val.level === '' ? true : false
      this.messBillable = val.billable === '' ? true : false
      return !this.messCode && !this.messName && !this.messRole && !this.messLevel && !this.messBillable ? true : false
    },

    // Validate list empoyeePositionList ,if data in group select search empty || === '' show error message
    vaildatePosition(val) {
      const arrLength = val.length
      let statusPosition = []
      let statusDepartment = []
      for (let i = 0; i < arrLength; i++ ) {
        val[i].position.status = val[i].position.positionCode === '' ? true : false
        val[i].department.status = val[i].department.departmentCode === '' ? true : false
        statusPosition = [...statusPosition,val[i].position.status]
        statusDepartment = [...statusDepartment,val[i].department.status]
      }
      const position = statusPosition.indexOf(true)
      const deppartment = statusDepartment.indexOf(true)
      return position === -1 && deppartment === -1 ? true : false
    },

    //Validate data and emit data to parent when click button add
    addData() {
      const valiForm = this.validateForm(this.dataForm)
      const valiList = this.vaildatePosition(this.dataForm.employeePosition)
      if (valiForm && valiForm) {
        this.$emit('addList', this.dataForm)
      }
    },

    //Validate data and emit data to parent when click button update
    updateData() {
      const valiForm = this.validateForm(this.dataForm)
      const valiList = this.vaildatePosition(this.dataForm.employeePosition)
      if (valiForm && valiForm) {
        this.$emit('updateList', this.dataForm)
      }
    },

    //Click button delete emit data to parent
    deleteData() {
      this.$emit('deleteList', this.dataForm)
    },

    //Click button export emit data to parent
    exportFile() {
      this.$emit('exportList', this.dataForm)
    },

    //Click button clearAll emit data to parent
    clearAll() {
      this.$emit('clearAll', this.dataForm)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>
