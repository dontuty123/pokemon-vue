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
      @addList="addList"
      @updateList="updateList"
      @deleteList="deleteList"
      @exportList="exportList"
      @clearAll="clearAll"
    >
    </Employee>
    <p class="text-success" v-if="successMess.status">{{messSucc}}</p>
    <p class="text-danger" v-if="resultMess.status">{{messErr}}</p>
    <TableCommon 
      :fields="fields"
      :items="dataList"
      @valueRowSelect="valueRowSelect"
      @sortData="sortData"
    ></TableCommon>
    <Pagination
      :lengthOfList="lengthOfList"
      @currentPage="changePaging"
      v-if="reset"
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
import resetValueObj from '@/core/util/resetValueObj'
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
              isMain: '1',
              
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
        disabled: true,
        messErr: '',
        keySort: '',
        currentPage: 0, 
        reset: true,
        messSucc: '',
        searchData: [],
        statusSearch: 0
      }
    },

    //When load page ,call API employeeList,positionList,departmentList
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
        departmentList : state => state.departmentList,
        resultMess : state => state.resultMess,
        error_code : state => state.error_code,
        http_code : state => state.http_code,
        successMess : state => state.successMess,
        secretKey : state => state.secretKey,
        linkExport : state => state.linkExport,
      })
    },
    methods: {
      //Format data when click row table
      formatDataTable(val) {
        let data = []
        const dataLenght = val.length
        for (let i = 0; i < dataLenght; i++) {
          data[i] = {
            position: {
                positionCode: val[i].positionCode,
                id: val[i].positionId,
                positionName: val[i].positionName,
              },
              department: {
                departmentCode: val[i].departmentCode,
                id: val[i].departmentId,
                departmentName: val[i].departmentName,
              },              
              isMain: val[i].isMain,
          }
        }
        return data
      },
      //Reset data default 
      resetData() {
        const data= {
          billable: '',
          email: '',
          employeeCode: '',
          employeePosition: [
            {
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
              isMain: '1',
              
            }
          ],
          firstName: '',
          id: '',
          lastName: '',
          level: '',
          nickName: '',
          role: '',
          status: 0,
        }
        return data
      },

      // Get data in table when click row
      valueRowSelect(val) {
        const data = this.formatDataTable(val.employeePosition)
        this.dataForm = {
          billable: val.billable,
          email: val.email,
          employeeCode: val.employeeCode,
          employeePosition: data,
          firstName: val.firstName,
          id: val.id,
          lastName: val.lastName,
          level: val.level,
          nickName: val.nickName,
          role: val.role,
          status: val.status,
        },
        this.isLoad = false 
        this.disabled = false
        setTimeout(() => {
          this.isLoad = true
        }, 10);
      },

      //Format data to call API
      formatDataSearch(array, type) {
        const arrLenght = array.length
        let data = []
        let tmpdata = ''
        if (array === '') {
          return
        }
        for (let i = 0; i < arrLenght; i++) {
          if (array[i].position.id === '' && array[i].department.id === '') {
            tmpdata = ''
            data = [...data, tmpdata]
          }
          if (array[i].position.id !== '' && array[i].department.id !== '') {
            if (type === 'search') {
              tmpdata = array[i].position.id + '-' + array[i].department.id
            } else {
              tmpdata = array[i].position.id + '-' + array[i].department.id + '-' + array[i].isMain
            }
            
            data = [...data, tmpdata]
          }
          if (array[i].position.id !== '' && array[i].department.id === '') {
            if (type === 'search') {
              tmpdata = array[i].position.id 
            } else {
               return
            }
            data = [...data, tmpdata]
          }
          if (array[i].position.id === '' && array[i].department.id !== '') {
            if (type === 'search') {
              tmpdata = '-' + array[i].department.id 
            } else {
              return
            }            
            data = [...data, tmpdata]
          }
        }
        return data.toString()
      },

      //Set data to call Api
      getDataForm(val) {
        const arrSearch = this.formatDataSearch(val.employeePosition)
        const dataReturn = {
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
        return dataReturn
      },

      // Call API Search and reload table when click button search
      async searchList(val) {
        this.statusSearch = 1
        const dataSearch = this.getDataForm(val,'search')
        this.searchData = dataSearch
        await this.$store.dispatch('employee/searchList', dataSearch)
        if (this.error_code !== '') {
          this.messErr = this.$t('messages[' + this.resultMess.content + ']')
        }
        this.$store.dispatch('employee/resetMess', '')
        this.disabled = true
      },

      // Call API create data and reload table when click button add
      async addList(val){
        let dataAdd = this.getDataForm(val,'add') 
        const dataClear = ['isSearch', 'currentPage', 'pageRecord', 'sortBy']
        dataAdd = resetValueObj.delete(dataAdd, dataClear)
        dataAdd.password = ''
        await this.$store.dispatch('employee/addList', dataAdd)
        if (this.http_code === 200) {
          this.reset = false
          this.messSucc = this.$t('messages[' + this.successMess.content + ']')
          await this.$store.dispatch('employee/employeeList', this.employeeList)
          this.reset = true
          this.dataForm = this.resetData()
        } else {
          this.messErr = this.$t('messages[' + this.resultMess.content + ']')
        }
         this.$store.dispatch('employee/resetMess', '')
      },

      // Call API update data and reload table when click button update
      async updateList(val) {
        let dataUpdate = this.getDataForm(val,'update') 
        const dataClear = ['isSearch', 'currentPage', 'pageRecord', 'sortBy']
        dataUpdate = resetValueObj.delete(dataUpdate, dataClear)
        const id = val.id
        dataUpdate = {id,...dataUpdate}
        dataUpdate.sortBy = this.keySort
        await this.$store.dispatch('employee/updateList', dataUpdate)
        if (this.http_code === 201) {
          let datatemp = this.getDataForm(val,'update')
          this.messSucc = this.$t('messages[' + this.successMess.content + ']')
          datatemp = this.statusSearch === 0 ? this.employeeList : datatemp
          datatemp.sortBy = this.keySort
          await this.$store.dispatch('employee/employeeList', datatemp)
          this.dataForm = this.resetData()
        } else {
          this.messErr = this.$t('messages[' + this.resultMess.content + ']')
        }
         this.$store.dispatch('employee/resetMess', '')
      },
      // Call API deleteList data and reload table when click button delete
      async deleteList(val) {
        const dataDelete = {
         id: val.id
        }
        await this.$store.dispatch('employee/deleteList', dataDelete)
        if (this.http_code === 200) {
          let datatemp = this.getDataForm(val,'delete')
          datatemp = this.statusSearch === 0 ? this.employeeList : datatemp
          datatemp.sortBy = this.keySort
          this.messSucc = this.$t('messages[' + this.successMess.content + ']')
          await this.$store.dispatch('employee/employeeList', datatemp)
          this.messErr = this.$t('messages[' + this.resultMess.content + ']')
        } else {
          this.messErr = this.$t('messages[' + this.resultMess.content + ']')
        }
        this.$store.dispatch('employee/resetMess', '')
      },

      //Export file excel
      async exportList(val){
        await this.$store.dispatch('employee/secretKey', '')
        if (this.http_code === 200) {
           let dataExport = this.getDataForm(val,'export')
           dataExport.sortBy = this.keySort === '' ? 'employeeCode-ASC' : this.keySort
           const datatemp = this.statusSearch === 0 ? this.employeeList : dataExport
           datatemp.secretKey = this.secretKey
           await this.$store.dispatch('employee/exportFile', datatemp)
           window.open(this.linkExport, '_blank')
         }
      },

      //Sort data in table
      sortData(sort, val, key, name = '') {
        const status = sort ? 'ASC' : 'DESC' 
        this.keySort = !name ? key + '-' +  status : name + '-' + status
        const data = this.employeeList
        data.sortBy = this.keySort
        // Reload data to sort 
        this.$store.dispatch('employee/employeeList', data)
      },

      //click page in paging and reload data in table
      changePaging(val) {
        this.currentPage = val
        const data = this.employeeList
        data.sortBy = this.keySort === '' ? 'employeeCode-ASC' : this.keySort
        data.currentPage = val,
        this.$store.dispatch('employee/employeeList', data)
      },
      clearAll() {
        this.dataForm = this.resetData()
      }
    }
  }
</script>

<style lang='scss'>
  @import 'style.scss';
</style>
