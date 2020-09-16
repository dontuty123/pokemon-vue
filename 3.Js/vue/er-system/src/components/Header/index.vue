<template>
  <div class="er-header shadow-sm">
    <div class="d-flex justify-content-spacebetween">
      <ul class="menu">
        <li>
          <a><img src="@/assets/images/download.png" class="logo"></a>
        </li>
        <li @mouseover="listOne = true"  @mouseleave="listOne = false">
          <a href="#" :class="listOne ? 'active' : '' ">
            MASTER <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon>
          </a>
          <transition name="fade">
            <ul class="menu-item" v-if="listOne" @click="listOne = false">
              <li><a href="#">EMPLOYEE</a></li>
              <li><a href="#">PROJECT</a></li>
              <li><a href="#">OM PROJECT MANAGEMENT</a></li>
            </ul>
          </transition>
        </li>
        <li @mouseover="listTwo = true"  @mouseleave="listTwo = false">
          <a href="#" :class="listTwo ? 'active' : '' ">
            ENGINEER HOUR RECORD<b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon>
          </a>
          <transition name="fade">
            <ul class="menu-item" v-if="listTwo" @click="listTwo = false">
              <li><a href="#">UPDATE WORKING HOUR</a></li>
              <li><a href="#"> TOTAL RECORD</a></li>
            </ul>
          </transition>
        </li>
        <li>
          <a>APPROVE</a>
        </li>
      </ul>
      <ul class="menu">
          <li @mouseover="listThree = true"  @mouseleave="listThree = false">
          <a href="#" :class="listThree ? 'active' : '' ">
            <b-icon class="mr-2" icon="person-fill" aria-hidden="true"></b-icon>
            NV.001-NAM THANH
            <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon></a>
          <transition name="fade">
            <ul class="menu-item" v-if="listThree" @click="listThree = false">
              <li><a href="#">EMPLOYEE</a></li>
              <li><a href="#">PROJECT</a></li>
              <li><a href="#">OM PROJECT MANAGEMENT</a></li>
            </ul>
          </transition>
        </li>
        <li @mouseover="listFour = true"  @mouseleave="listFour = false">
          <a href="#" :class="listFour ? 'active' : '' ">
            EN
            <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon></a>
          <transition name="fade">
            <ul class="menu-item" v-if="listFour" @click="listFour = false">
              <li><a href="#">EN</a></li>
              <li><a href="#">VN</a></li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listOne: false,
      listTwo: false,
      listThree: false,
      listFour: false
    
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>