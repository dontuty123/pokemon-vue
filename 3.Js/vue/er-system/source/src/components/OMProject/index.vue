<template>
<div>
  <div class="er-omproject">
    <div class="list-button mb-3">
      <b-button class="btn-type btn-type-1" @click="btnSearch()" :disabled="loadingBtn.search">
        <b-icon icon="search"></b-icon>{{$t('button["search"]')}}
      </b-button>
      <b-button class="btn-type btn-type-1" @click="btnAdd()" :disabled="loadingBtn.add">
        <b-icon icon="plus-circle-fill"></b-icon>{{$t('button["add"]')}}
      </b-button>
      <b-button class="btn-type btn-type-1" @click="btnUpdate()" :disabled="loadingBtn.update">
        <b-icon icon="plus-circle-fill"></b-icon>{{$t('button["update"]')}}
      </b-button>
      <b-button class="btn-type btn-type-1"  @click="btnDelete()" :disabled="loadingBtn.delete">
        <b-icon icon="trash"></b-icon>{{$t('button["delete"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2" @click="exportExcel()">
        <b-icon icon="file-earmark-medical-fill"></b-icon>{{$t('button["export"]')}}
      </b-button>
      <b-button class="btn-type btn-type-2" @click="clearAll()">
        <b-icon icon="arrow-repeat"></b-icon>{{$t('button["clear"]')}}
      </b-button>
    </div>
    <div class="form-input">
      <b-form class="form-edit w-75 mb-1">
        <b-form-group
          label-cols="12"
          label-cols-md="2"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">{{$t('omProject["Project"]')}}</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
               <model-list-select 
                  :list="listOmproject"
                  class="input-select"
                  v-model="projectSelected"
                  size="sm"
                  option-value="projectCode"
                  :custom-text="customText"
                  placeholder="All"
                >  
                </model-list-select>
                <p class="required-msg" v-if="!projectSelected.id && requiredMsg !== ''">Project {{ requiredMsg }}</p>
            </div>
          </div>
        </b-form-group>
        <b-form-group
          label-cols="12"
          label-cols-md="2"
          label-size="sm"
          label-for="input-sm"
          class="form-required"
        >
          <template v-slot:label>
            <span class="label">{{$t('omProject["Employee"]')}}</span>
          </template>
          <div class="row w-input">
            <div class="col-6">
              <model-list-select 
                :list="listOmEmployee"
                class="input-select"
                v-model="employeeSelected"
                size="sm"
                option-value="employeeCode"
                option-text="employeeName"
                placeholder="All">
              </model-list-select>
                 <p class="required-msg" v-if="!employeeSelected.id && requiredMsg !== ''" >Project {{ requiredMsg }}</p>
            </div>
          </div>
        </b-form-group>
        
      </b-form>
    </div>
  </div>
</div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select'
import { mapState } from 'vuex';
export default {
  name: 'OMProject',
  components: {
    ModelListSelect,
  },
  props: ['listOmproject', 'listOmEmployee', 'paramsOmProject', 'dataSelected', 'sortTable', 'isDone'],
  data() {
    return {
      requiredMsg: '',
      projectSelected: {},
      employeeSelected: {},
      valueSelected: {},
      idUpdate: 0,
      loadingBtn: {
        search: false,
        add: false,
        update: true,
        delete: true,
      },
      isAdd: false,
    };
  },

  methods: {
    // Format text  at combobox
    customText (item) {
      return `${item.id} - ${item.projectCode} - ${item.projectName}`
    },

    //Disable/ Enable button
    stateButton(search, add, update, remove) {
      this.loadingBtn.search = search ? search : false;
      this.loadingBtn.add = add ? add : false;
      this.loadingBtn.update = update ? update : false;
      this.loadingBtn.delete = remove ? remove : false;
    },

    //Search
    btnSearch() {
      this.isAdd = false
      this.$emit('isAdd', this.isAdd)
      this.stateButton(true, true, true, true)
      const { isSearch, projectId, employeeId, currentPage, pageRecord, sortBy, employeeBy, projectBy } = this.paramsOmProject;
      const dataSearch = this.paramsOmProject
      dataSearch.isSearch = 1
      dataSearch.currentPage = 1
      dataSearch.projectId = this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id ? this.projectSelected.id : null
      dataSearch.employeeId = this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id ? this.employeeSelected.id : null
      dataSearch.sortBy = this.sortTable
      this.$emit('dataSearch', dataSearch)
      this.stateButton(false, false, true, true)
    },

    //Add
    btnAdd() {
      this.isAdd = true
      this.$emit('isAdd', this.isAdd)
      this.stateButton(true, true, false, false)
      if (!this.projectSelected.id || !this.employeeSelected.id) {
         this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const { projectId, employeeId } = this.paramsOmProject;
        const dataAdd = {
          projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id,
          employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id
        }
        this.$emit('dataAdd', dataAdd)
        this.stateButton(false, false, false, false)
      }
    },
    
    //Update
    btnUpdate() {
      this.isAdd = false
      this.$emit('isAdd', this.isAdd)
      this.stateButton(false, false, true, true)
       if (!this.projectSelected.id || !this.employeeSelected.id) {
         this.requiredMsg = ' is required';
      } else {
        this.requiredMsg = '';
        const dataUpdate = {
          id: this.idUpdate,
          projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id,
          employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id 
        }
        this.$emit('dataUpdate', dataUpdate)
      }
    },

    // Delete Item
    btnDelete() {
      this.isAdd = false
      this.$emit('isAdd', this.isAdd)
      this.stateButton(false, false, true, true)
      const idDelete = {
        id: this.idUpdate
      }
      this.$emit('dataDelete', idDelete)
    },

    //Export Excel
    exportExcel(){
      this.isAdd = false
      this.$emit('isAdd', this.isAdd)
      const { projectId, employeeId } = this.paramsOmProject;
      const dataSecretKey = {
        projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id ? this.projectSelected.id : null,
        employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id ? this.employeeSelected.id : null,       
        sortBy: this.sortTable,
        secretKey: '',
      };
      
      this.$store.dispatch('omproject/getSecretKey', dataSecretKey);
      setTimeout(() => {
        const dataExport = {
          projectId: this.projectSelected.projectId ? this.projectSelected.projectId : this.projectSelected.id ? this.projectSelected.id : null,
          employeeId: this.employeeSelected.employeeId ? this.employeeSelected.employeeId : this.employeeSelected.id ? this.employeeSelected.id : null,       
          sortBy: this.sortTable,
          secretKey: this.secretKey,
        };
        this.$store.dispatch('omproject/exportExcel', dataExport);
        window.open(this.linkExportExcel, '_blank');
      }, 350);
    },

    //Clear All
    clearAll() {
      this.projectSelected = {}
      this.employeeSelected = {}
      this.stateButton(false, false, true, true)
    }
  },

  computed: {
    ...mapState('omproject', {
      linkExportExcel: (state) => state.linkExportExcel,
      secretKey: (state) => state.secretKey,
      isLoading: (state) => state.isLoading,
    }),
  },
  
  watch: {
    //Show data from table selected
    dataSelected(val) {
      if (val.id) {
        this.projectSelected = val
        this.employeeSelected = val
        this.idUpdate = val.id
        this.stateButton(false, false, false, false)
      } else {
       this.stateButton(false, false, true, true)
      }
    },
   //Reload list OM project if have change
    isLoading(val1, val2) {
      if (val2 !== val1) {
        this.projectSelected = {}
        this.employeeSelected = {}
      }
    },
  }
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
