<template>
    <div>
      <b-navbar class="d-flex align-items-center justify-content-between">
        <b-navbar-nav class="d-flex align-items-center" >
          <b-nav-item href="#"><img src="@/assets/images/download.png" class="logo"></b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="MASTER" left class="items_menu ml-4">
            <b-dropdown-item :to="'/'" >EMPLOYEE</b-dropdown-item>
            <b-dropdown-item :to="'/project'">PROJECT</b-dropdown-item>
            <b-dropdown-item >OM PROJECT MANAGEMENT</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="ENGINEER HOUR RECORD" left class="items_menu ml-4">
            <b-dropdown-item href="#">UPDATE WORKING HOUR</b-dropdown-item>
            <b-dropdown-item href="#">TOTAL RECORD</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#" class="items_menu ml-4">APPROVE</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
           <!-- Navbar dropdowns -->
          <b-nav-item-dropdown  :text="username" left class="items_menu">
            <b-dropdown-item :to="'/changepassword'" >CHANGE PASSWORD</b-dropdown-item>
            <b-dropdown-item >LOGOUT</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="EN" left class="items_menu ml-4">
            <b-dropdown-item>VN</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-navbar>
    </div>
</template>

<script>
import storage from '@/core/util/Storage'
export default {
  data() {
    return {
      username: ''
    }
  },
  
  created() {
    const employeeCodeSimple = storage.getDataStorage('employeeCodeSimple')
    const employeeName = storage.getDataStorage('employeeName').toUpperCase()
    this.username = employeeCodeSimple + '_' + employeeName
  }
}
</script>

<style lang="scss">
  @import "style.scss";
</style>
