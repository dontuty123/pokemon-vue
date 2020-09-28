<template>
<div>
  <div class="er-inquirydata">
    <div class="list-button mb-3">
      <b-button class="btn-type btn-type-1">
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
              <b-form-select v-model="projectSelected" :options="project" size="sm"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-1 pt-1">
             <b-link disabled>Add</b-link>
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
import { mapState } from 'vuex';
import Datepicker from '@/components/DatePicker';
export default {
  name: 'InquiryData',
  components: {
    Datepicker
  },
  
  data() {
    return {
      month:new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      valFromDate: null,
      valToDate: null,
      projectSelected: null,
      project:[
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    };
  },

  methods: {
    fromDate(val) {
      this.valFromDate = val
    },
    toDate(val) {
      this.valToDate = val
    },
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
    
  }
};
</script>

<style scoped lang='scss'>
  @import 'style.scss';
</style>
