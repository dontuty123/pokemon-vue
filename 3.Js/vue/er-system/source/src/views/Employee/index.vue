<template>
  <div>
    <Breadcrumb :breadcrumb="breadcrumb" />
    <Employee 
      :positionList="selectPositon"
      :departmentList="selectDepartment"
      :dataForm="dataForm"
      :isLoad="isLoad"
      :disabled="disabled"
      @searchList="searchList"
    >
    </Employee>
    <TableCommon 
      :fields="fields"
      :items="dataList"
      @valueRowSelect="valueRowSelect"
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
            label: 'breadcrumb["engineerHourRecord"]',
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
        selectDepartment: [],
        dataForm: {
          billable: '',
          email: '',
          employeeCode: '',
          employeePosition: [
            {
              departmentCode: '',
              departmentId: '',
              departmentName: '',
              isMain: '1',
              positionCode: '',
              positionId: '',
              positionName: '',
            }
          ],
          firstName: '',
          id: '',
          lastName: '',
          level: '',
          nickName: '',
          role: '',
          status: 0,
        },
        isLoad: true,
        disabled: true 
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
    methods: {
      valueRowSelect(val) {
        this.dataForm = val
        this.isLoad = false 
        setTimeout(() => {
          this.isLoad = true
        }, 10);
      },
      formatDataSearch(array) {
        const arrLenght = array.length
        let data = []
        let tmpdata = ''
        for (let i = 0; i < arrLenght; i++) {
          if (array[i].positionId === '' && array[i].departmentId === '') {
            tmpdata = ''
            data = [...data, tmpdata]
          }
          if (array[i].positionId !== '' && array[i].departmentId !== '') {
            tmpdata = array[i].positionId + '-' + array[i].departmentId
            data = [...data, tmpdata]
          }
          if (array[i].positionId !== '' && array[i].departmentId === '') {
            tmpdata = array[i].positionId 
            data = [...data, tmpdata]
          }
          if (array[i].positionId === '' && array[i].departmentId !== '') {
            tmpdata = '-' + array[i].departmentId 
            data = [...data, tmpdata]
          }
        }
        return data.toString()
      },
      searchList(val) {
        const arrSearch = this.formatDataSearch(val.employeePosition)
        const dataSearch = {
          isSearch: 1,
          employeeCode: val.employeeCode,
          nickName: val.nickName,
          firstName: val.firstName,
          lastName: val.lastName,
          email: val.email,
          role: val.role,
          billable: val.billable,
          status: val.status,
          'employeePosition[]' : arrSearch,
          currentPage: 1,
          pageRecord: CONTANT.pageRecord,
          sortBy: 'employeeCode-ASC',
          level: val.level,
        }
      }
    }
  }
</script>

<style lang='scss'>
  @import 'style.scss';
</style>
