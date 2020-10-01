<template>
<div>
  <div class="er-inquirydata">
    <div class="list-button mb-3">
      <b-button class="btn-type btn-type-1" @click="btnSearch()">
        <b-icon icon="search"></b-icon>{{$t('button["search"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{$t('button["export"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{$t('button["getApproval"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{$t('button["oTLeave"]')}}
      </b-button>
    </div>
    <div class="form-input">
      <b-form class="form-edit  mb-1">
        <div class="row">
          <div class="col-md-5 col-12">
            <div class="row">
              <div class="col-md-5 col-12">
                <b-form-group label-cols="6" label-cols-lg="4" label-size="sm" label-for="input-sm">
                  <template v-slot:label>
                    <span class="label">Year</span>
                  </template>
                  <b-form-select v-model="year" :options="years" size="sm"></b-form-select>
                </b-form-group>
              </div>
              <div class="col-md-5 col-12">
                <b-form-group label-cols="6" label-cols-lg="4" label-size="sm" label-for="input-sm">
                  <template v-slot:label>
                    <span class="label">Month</span>
                  </template>
                  <b-form-select v-model="month" :options="months" size="sm"></b-form-select>
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="col-md-7 col-12">
            <div class="row">
              <div class="col-md-6 col-12">
                <b-form-group class="text-right" label-cols="5" label-cols-lg="3" label-size="sm" label-for="input-sm">
                  <template v-slot:label>
                    <span class="label">From</span>
                  </template>
                  <Datepicker @dateSeleted="fromDate" />
                </b-form-group>
              </div>
              <div class="col-md-6 col-12">
                <b-form-group class="text-right" label-cols="5" label-cols-lg="3" label-size="sm" label-for="input-sm">
                  <template v-slot:label>
                    <span class="label">To</span>
                  </template>
                  <Datepicker @dateSeleted="toDate" />
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-12 pr-0 mb-3">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-for="input-sm" class="mb-0">
              <template v-slot:label>
                <span class="label">Project</span>
              </template>

              <model-list-select 
                  :list="listProject"
                  class="input-select"
                  v-model="projectSelected"
                  size="xs"
                  option-value="projectCode"
                  :custom-text="customTextProject"
                >  
                </model-list-select>
            </b-form-group>
          </div>
          <div class="col-1 pt-1">
             <b-link :disabled="disableAdd">Add</b-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12 pr-0">
            <b-form-group label-cols="6" label-cols-lg="3" label-size="sm" label-for="input-sm" class="mb-0">
              <template v-slot:label>
                <span class="label">Total OT of month: </span>
              </template>
              <div class="col-1 pt-1 pl-0">
                <p>0</p>
              </div>
            </b-form-group>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select'
import { mapState } from 'vuex';
import Datepicker from '@/components/DatePicker';
import funcMemory from '@/core/service/memory.service.js'

export default {
  name: 'InquiryData',
  components: {
    ModelListSelect,
    Datepicker
  },
  
  data() {
    return {
      month:new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      valFromDate: null,
      valToDate: null,
      projectSelected: {
        defaultProject:false,
        id:0,
        projectCode: '',
        projectName: 'All'
      },
      requiredMsg: false,
      disableAdd: true,
    };
  },

  props:['listProject', 'paramsGetWorkLog'],

  methods: {
    fromDate(val) {
      this.valFromDate = val
    },

    toDate(val) {
      this.valToDate = val
    },

    // Format text  at combobox
    customTextProject (item) {
      return item.projectCode !== '' ? `${item.projectCode} - ${item.projectName}` : `${item.projectName}`
    },

    //Search
    btnSearch() {
      const { isSearch, employeeId, month, year, projectId } = this.paramsGetWorkLog
      const dataSearch = this.paramsGetWorkLog
      dataSearch.isSearch = 1
      dataSearch.employeeId = funcMemory.getCookie('employeeId')
      dataSearch.month = this.month
      dataSearch.year = this.year
      dataSearch.projectId = this.projectSelected.id
      this.$emit('dataSearch', dataSearch)
    }
  },
  mounted() {
    
  },

  computed: {
    months() {
      return Array.from({length: 12}, (value, index) => index+1)
    },
    
    years() {
      const year = new Date().getFullYear()
      return Array.from({length: year - (year-10)}, (value, index) => (year-9) + index)
    }
  },

  watch: {
    projectSelected(val) {
      if (val.id !== 0) {
        this.disableAdd = false
      } else {
        this.disableAdd = true
      }
    }
  }
};
</script>

<style scoped lang='scss'>
  @import 'style.scss';
</style>
