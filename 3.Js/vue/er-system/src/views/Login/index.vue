<template>
  <div class="er-login">
    <div class="form-group shadow p-5">
      <img src="@/assets/images/logo_company.png">
      <h2 class="font-weight-bold text-center mt-5 mb-4">{{$t('login["titleLogin"]').toUpperCase()}}</h2>
      <p class="mb-2 text-danger"></p>
      <b-input-group> 
        <div class="position-relative w-100 mb-3">
          <b-icon icon="person-fill" class="position-absolute icon__user"></b-icon>
          <b-form-input type="email" :placeholder="holderUser" class="ip__login"></b-form-input>
        </div>
        <p class="mb-3 text-danger"></p>
        <div class="position-relative w-100 mb-3">
          <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
          <b-form-input type="email" :placeholder="holderPass" class="ip__login"></b-form-input>
        </div>
         <p class="mb-3 text-danger"></p>
        <b-button variant="primary" class="w-100 font-weight-bold" @click="loginApi">{{$t('login["titleLogin"]')}}</b-button>
      </b-input-group>
      <router-link class="text-primary mt-3 text-center d-block" :to="'/forgotpassword'">{{$t('login["forgotPass"]')}}</router-link>
    </div>
  </div>
</template>

<script>
// import Header from '@/components/Header'
export default {
  // components: {
  //   Header
  // }
  data() {
    return {
      holderUser : this.$t('login["user"]'),
      holderPass : this.$t('login["password"]'),
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginApi() {
      this.$store.dispatch('login/userLogin', this.user)
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>