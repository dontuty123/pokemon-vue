<template>
  <div class="er-login">
    <div class="form-group shadow p-5">
      <img src="@/assets/images/logo_company.png">
      <h2 class="font-weight-bold text-center mt-5 mb-4">{{ $t('login["titleLogin"]').toUpperCase() }}</h2>
      <p class="mb-2 text-danger">{{ loginMess }}</p>
      <b-input-group> 
        <div class="position-relative w-100 mb-2">
          <b-icon icon="person-fill" class="position-absolute icon__user"></b-icon>
          <b-form-input 
            type="email" 
            :placeholder="holderUser" 
            class="ip__login" 
            v-model="user.email"></b-form-input>
        </div>
        <p class="mb-3 text-danger">{{ error.emailError }}</p>
        <div class="position-relative w-100 mb-2">
          <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
          <b-form-input 
            type="password" 
            :placeholder="holderPass" 
            class="ip__login" 
            v-model="user.password"></b-form-input>
        </div>
         <p class="mb-3 text-danger">{{ error.passError }}</p>
        <b-button 
          variant="primary" 
          class="w-100 font-weight-bold" 
          @click="loginApi">
          {{ $t('login["titleLogin"]') }}
          </b-button>
      </b-input-group>
      <router-link 
        class="text-primary mt-3 text-center d-block" 
        :to="'/forgotpassword'">
        {{ $t('login["forgotPass"]') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      holderUser : this.$t('login["user"]'),
      holderPass : this.$t('login["password"]'),
      user: {
        email: '',
        password: ''
      },
      error: {
        emailError: '',
        passError: ''
      },
      loginMess: ''
    }
  },

  computed: {
    ...mapState('login', {
      status : state => state.status
    })
  },

  watch: {
    'user.email'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.error.emailError = ''
        this.loginMess = ''
      }
      if (newValue === '') {
        this.error.emailError = this.$t('messages["002"]')
      }
    },
    'user.password'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.error.passError = ''
        this.loginMess = ''
      }
      if (newValue === '') {
        this.error.passError = this.$t('messages["003"]')
      }
    }
  },
 
  methods: {
    async loginApi() {
      const { email, password } = this.user
      const valiMail = email === '' ? false : true
      const valiPass = password === '' ? false : true
      this.error.emailError = !valiMail ? this.$t('messages["002"]') : ''
      this.error.passError = !valiPass ? this.$t('messages["003"]') : ''
      if (valiMail && valiPass) {
        await this.$store.dispatch('login/userLogin', this.user)
        if (this.status.http_code !== 200) {
          this.loginMess = this.$t('messages[' + this.status.error_code + ']')
        }
      }
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>