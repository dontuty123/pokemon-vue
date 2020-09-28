<template>
  <div>
    <Breadcrumb :breadcrumb="breadcrumb" />
    <InquiryData />
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import InquiryData from '@/components/InquiryData';
  export default {
    name: 'inquiryData',
    components: {
      Breadcrumb,
      InquiryData
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
      }
    }
  }
</script>
 
<style lang='scss'>
  @import 'style.scss';
</style>
