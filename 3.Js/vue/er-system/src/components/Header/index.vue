<template>
  <div class="er-header shadow-sm">
    <div class="d-flex justify-content-between container-lg">
      <ul class="menu">
        <li>
          <router-link to="/"><img src="@/assets/images/logo_company.png" class="logo"></router-link>
        </li>
        <li @mouseover="listOne = true"  @mouseleave="listOne = false">
          <router-link to="#" :class="listOne ? 'active' : '' ">
            MASTER <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon>
          </router-link>
          <transition name="fade">
            <ul class="menu-item sub-text" v-if="listOne" @click="listOne = false">
              <li><router-link to="/">EMPLOYEE</router-link></li>
              <li><router-link to="/">PROJECT</router-link></li>
              <li><router-link to="/">OM PROJECT MANAGEMENT</router-link></li>
            </ul>
          </transition>
        </li>
        <li @mouseover="listTwo = true"  @mouseleave="listTwo = false">
          <router-link to="#" :class="listTwo ? 'active' : '' ">
            ENGINEER HOUR RECORD<b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon>
          </router-link>
          <transition name="fade">
            <ul class="menu-item" v-if="listTwo" @click="listTwo = false">
              <li><router-link to="/">UPDATE WORKING HOUR</router-link></li>
              <li><router-link to="/"> TOTAL RECORD</router-link></li>
            </ul>
          </transition>
        </li>
        <li>
          <router-link to="#">APPROVE</router-link>
        </li>
      </ul>
      <ul class="menu">
          <li @mouseover="listThree = true"  @mouseleave="listThree = false">
          <router-link to="#" :class="listThree ? 'active' : '' ">
            <b-icon class="mr-2" icon="person-fill" aria-hidden="true"></b-icon>
            NV.001-NAM THANH 
            <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon></router-link>
          <transition name="fade">
            <ul class="menu-item" v-if="listThree" @click="listThree = false">
              <li><router-link to="/">CHANGE PASSWORD</router-link></li>
              <li><router-link to="/">LOG OUT</router-link></li>
            </ul>
          </transition>
        </li>
        <li @mouseover="listFour = true"  @mouseleave="listFour = false">
          <router-link to="#" :class="listFour ? 'active' : '' ">
            <img :src="urlImages[$i18n.locale]" class="flag-icon"> 
            {{$i18n.locale.toUpperCase()}}
            <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon></router-link>
          <transition name="fade">
            <ul class="menu-item last-item" v-if="listFour" @click="listFour = false">
              <li>
                <router-link to="#" @click="setLocale('en')">
                  <img src="@/assets/images/flag_en.jpg" class="flag-icon">
                  EN
                </router-link>
              </li>
              <li>
                <router-link to="#" @click="setLocale('vn')">
                  <img src="@/assets/images/flag_vn.jpg" class="flag-icon">
                  VN
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
    <!-- demo multi language -->
    <!-- {{$t('messages["001"]')}} -->
  </div>
</template>

<script>
import FlagEn from '@/assets/images/flag_en.jpg'
import FlagVn from '@/assets/images/flag_vn.jpg'
export default {
  data() {
    return {
      listOne: false,
      listTwo: false,
      listThree: false,
      listFour: false,
      urlImages: {
        vn: FlagVn,
        en: FlagEn,
      }
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>