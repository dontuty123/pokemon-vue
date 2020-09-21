<template>
  <div class="er-header shadow-sm">
    <div class="d-flex justify-content-between px-5">
      <ul class="menu">
        <li>
          <router-link to="/"><img src="@/assets/images/logo_company.png" class="logo"></router-link>
        </li>
        <li @mouseover="listOne = true"  @mouseleave="listOne = false">
          <router-link to="#" :class="listOne ? 'active' : '' ">
            {{$t('header["master"]')}} <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon>
          </router-link>
          <transition name="fade">
            <ul class="menu-item sub-text" v-if="listOne" @click="listOne = false">
              <li><router-link to="/">{{$t('header["employee"]')}}</router-link></li>
              <li><router-link to="/">{{$t('header["project"]')}}</router-link></li>
              <li><router-link to="/">{{$t('header["omProject"]')}}</router-link></li>
            </ul>
          </transition>
        </li>
        <li @mouseover="listTwo = true"  @mouseleave="listTwo = false">
          <router-link to="#" :class="listTwo ? 'active' : '' ">
            {{$t('header["engineerHour"]')}}<b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon>
          </router-link>
          <transition name="fade">
            <ul class="menu-item sub-text" v-if="listTwo" @click="listTwo = false">
              <li><router-link to="/">{{$t('header["workingHour"]')}}</router-link></li>
              <li><router-link to="/">{{$t('header["totalRecord"]')}}</router-link></li>
            </ul>
          </transition>
        </li>
        <li>
          <router-link to="#">{{$t('header["approve"]')}}</router-link>
        </li>
      </ul>
      <ul class="menu">
          <li @mouseover="listThree = true"  @mouseleave="listThree = false">
          <router-link to="#" :class="listThree ? 'active' : '' ">
            <b-icon class="mr-2" icon="person-fill" aria-hidden="true"></b-icon>
            {{employeeCode}}-{{employeeName}} 
            <b-icon class="ml-2" icon="caret-down-fill" aria-hidden="true"></b-icon></router-link>
          <transition name="fade">
            <ul class="menu-item" v-if="listThree" @click="listThree = false">
              <li><router-link to="/">{{$t('header["changePass"]')}}</router-link></li>
              <li><router-link to="/">{{$t('header["logOut"]')}}</router-link></li>
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
                <a @click="setLocale('en')">
                  <img src="@/assets/images/flag_en.jpg" class="flag-icon">
                  EN
                </a>
              </li>
              <li>
                <a @click="setLocale('vn')">
                  <img src="@/assets/images/flag_vn.jpg" class="flag-icon">
                  VN
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FlagEn from '@/assets/images/flag_en.jpg'
import FlagVn from '@/assets/images/flag_vn.jpg'
import cookie from 'js-cookie'
import qs from 'qs'
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
      },
      employeeCode: '',
      employeeName: '',
    }
  },
  created() {
    const employeeData = qs.parse(cookie.get('userData'))
    this.employeeCode = employeeData.employeeCodeSimple
    this.employeeName = this.unmarkCharacter(employeeData.employeeName)
  },
  methods: {
    unmarkCharacter(str){
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      return str;
    },

    setLocale(locale) {
      this.$i18n.locale = locale
      cookie.set('userLang',locale)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>