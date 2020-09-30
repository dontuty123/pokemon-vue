<template>
  <div>
    <Breadcrumb :breadcrumb="breadcrumb" />
    <InquiryData 
      :listProject="listProject" 
      :paramsGetWorkLog="paramsGetWorkLog"
      @dataSearch="dataSearch"
    />
    <p class="mt-2 mb-2 text-danger" >{{ noDataMess }}</p>
    <TableLogwork :fields="fields" :items="listWorkLog" />
    <TableLogwork :fields="Item" />
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import TableLogwork from '@/components/TableLogwork';
  import InquiryData from '@/components/InquiryData';
  import { mapState } from 'vuex';

  export default {
    name: 'inquiryData',
    components: {
      Breadcrumb,
      InquiryData,
      TableLogwork
    },
    data() {
      return {
        breadcrumb: [
          {
            id:1,
            label: 'breadcrumb["engineerHourRecord"]',
            url: '/',
          },
          {
            id:2,
            label: 'breadcrumb["updateWorkingHour"]',
            url: '/update-working-hour',
          },
          {
            id:3,
            label: 'breadcrumb["inquiryData"]',
            url: '/inquiry-data',
          },
        ],
        paramsInquiry: {
          employeeId: null,
          projectSort: 'projectCode-ASC',
          employeeSort: 'employeeCode-ASC',
          approverSort: 'lastName-ASC'
        },
        paramsGetWorkLog: {
          isSearch: 0,
          employeeId: '246',
          month: '09',
          year: '2020',
          projectId: null,
          sortBy: 'createdDate-desc',
          projectBy: 'projectName-asc',
          projectNewId: null
        },
        fields:[
          {
            key: 'projectName',
            label: 'table["projectName"]',
            class: 'sticky-col first-col'
          },
          {
            key: 'projectCode',
            label: 'table["projectCode"]',
            class: 'sticky-col second-col'
          },
          {
            key: 'totalHours',
            label: 'Total Hours',
            class: 'third-col'
          }
        ],
        Item: [
          {
            key: 'Item',
            label: 'table["item"]',
            class: 'sticky-col first-col'
          },
        ],
        noDataMess:'',
      }
    },

    methods: {
      getDayinMonth() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()     
        let arrayDate = []
        const totalDay = new Date(currentYear, currentDate.getMonth(), 0).getDate()
        for (let i = 1; i <= totalDay; i++) {
          const tmp = {}
          let date = new Date(currentYear, currentMonth , i).getDay() + 1
          date === 1 ? date = "Sun" 
          : date === 2 ? date = "Mon" 
          : date === 3 ? date = "Tue" 
          : date === 4 ? date = "Wed" 
          : date === 5 ? date = "Thu" 
          : date === 6 ? date = "Fri" 
          : date = "Sat"
          let formatDate = date + '_' + i
          tmp.label = formatDate
          tmp.key = 'workLogDate'
         
          this.fields.push(tmp)
          this.Item.push(tmp)
        }
      },

      async getDataInquiry(val){
          await this.$store.dispatch('inquiryData/getDataInquiry', val);
      },

      async getWorkLog(val){
        await this.$store.dispatch('inquiryData/getWorkLog', val);
      },

       //Get params search
      async dataSearch(val) {
        await this.$store.dispatch('inquiryData/searchWorkLog', val);
        if (this.status.error_code === '018') {
          this.noDataMess = this.$t('messages[' + this.status.error_code + ']')
        } 
        setTimeout(() => {
          this.noDataMess = ''
        }, 3000); 
      }
    },

    mounted() {
      this.getDayinMonth()
      this.getDataInquiry(this.paramsInquiry)
      this.getWorkLog(this.paramsGetWorkLog)
      
    },

    computed: { 
      ...mapState('inquiryData', {
        listProject: (state) => state.listProject,
        listWorkLog: (state) => state.listWorkLog,
        status : state => state.status
      })
    }
  }
</script>
 
<style lang='scss'>
  @import 'style.scss';
</style>
