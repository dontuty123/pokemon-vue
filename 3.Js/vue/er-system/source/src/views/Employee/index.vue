<template>
  <div>
    <Breadcrumb :breadcrumb="breadcrumb" />
    <Employee 
      :positionList="selectPositon"
      :departmentList="selectDepartment"
    >
    </Employee>
    <TableCommon 
      :fields="fields"
      :items="dataList"
    ></TableCommon>
    <Pagination
      :lengthOfList="lengthOfList"
    ></Pagination>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Employee from '@/components/Employee'
import TableCommon from '@/components/TableCommon'
import CONTANT from '@/core/contant'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
  export default {
    components: {
      Breadcrumb,
      Employee,
      TableCommon,
      Pagination
    },
    data() {
      return {
        breadcrumb: [
          {
            id:1,
            label: 'breadcrumb["engineerHour"]',
            url: '/',
          },
          {
            id:2,
            label: 'breadcrumb["totalRecord"]',
            url: '/',
          },
        ],
        fields: [
          {
            key: 'id',
            label: 'table["no"]',
            class: 'width-1  text-center',
            sort: false,
            type: 'text'
          },
          {
            key: 'employeeCode',
            label: 'table["employeeCode"]',
            class: '',
            sort: true,
            valueSort: 1,
            type: 'text'
          },
          {
            key: 'nickName',
            label: 'table["nickName"]',
            class: 'width-10',
            sort: false,
            type: 'text',
          },
          {
            key: 'firstName',
            label: 'table["firstName"]',
            class: 'width-10',
            sort: false,
            type: 'text'
          },
          {
            key: 'lastName',
            label: 'table["lastName"]',
            class: 'width-10',
            sort: false,
            type: 'text'
          },
          {
            key: 'employeePosition',
            data: 'positionName',
            label: 'table["position"]',
            class: 'width-15',
            sort: true,
            valueSort: 2,
            type: 'array'
          },
          {
            key: 'employeePosition',
            data: 'departmentName',
            label: 'table["department"]',
            class: 'width-15',
            sort: true,
            valueSort: 3,
            type: 'array'
          },
          {
            key: 'billable',
            label: 'table["billable"]',
            class: 'width-10',
            sort: false,
            type: 'checkbox'
          },
          {
            key: 'status',
            label: 'table["status"]',
            class: 'width-10',
            sort: false,
            type: 'text'
          }
        ],
        employeeList: {
          isSearch: 1,
          employeeCode: '',
          nickName: '',
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          billable: '',
          level: '',
          status: 0,
          'employeePosition[]': '',
          currentPage: 1,
          pageRecord: CONTANT.pageRecord,
          sortBy: 'employeeCode-ASC'
        },
        loadPosition: {
          isSearch: 0,
          positionCode: '',
          positionName: '',
          currentPage: 0,
          pageRecord: CONTANT.pageRecord,
          sortBy: 'positionCode-ASC'
        },
        loadDepartment: {
          isSearch: 0,
          departmentCode: '',
          departmentName: '',
          currentPage: 0,
          pageRecord: CONTANT.pageRecord,
          sortBy: 'departmentCode-ASC'
        },
        lengthOfList: this.totalRecord,
        defaultPosition: {
          id: '',
          positionCode : '',
          positionName : 'All'
        },
        defaultDepartment: {
          id: '',
          departmentCode : '',
          departmentName : 'All'
        },
        selectPositon: [],
        selectDepartment: []
      }
    },
    async created() {
      await this.$store.dispatch('employee/employeeList', this.employeeList)
      await this.$store.dispatch('employee/positionList', this.loadPosition)
      await this.$store.dispatch('employee/departmentList', this.loadDepartment)
      this.selectPositon = [this.defaultPosition,...this.positionList]
      this.selectDepartment = [this.defaultDepartment,...this.departmentList]
    },
    watch: {
      totalRecord(val) {
        this.lengthOfList = val
      }
    },
    computed: {
    ...mapState('employee', {
      dataList : state => state.dataList,
      totalRecord : state => state.totalRecord,
      positionList : state => state.positionList,
      departmentList : state => state.departmentList
    })
  },
  }
</script>

<style lang='scss'>
  @import 'style.scss';
</style>
