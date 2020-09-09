<template>
  <div class="d-flex flex-column justify-content-center h-100">
    <div class="form__user shadow mb-5 bg-white">
      <img src="@/assets/images/download.png" class="logo mb-3">
      <h2 class="text-center mb-5 font-weight-bold">LOGIN</h2>
      <!-- v-slot:message="{ checkEmail, checkPass }" -->
      <p class="mb-2 error__text" v-if="!errorCode.status">{{errorCode.message}}</p>
      <b-input-group class="mb-2 position-relative"> 
        <b-icon icon="person-fill" class="position-absolute icon__user"></b-icon>
        <input type="email" placeholder="E-mail address" class="ip__login" v-model="user.email">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!message.checkEmail.error">Email is required</p>
      <b-input-group class="mb-2">
        <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
        <input type="password" placeholder="Password" class="ip__login" v-model="user.password">
      </b-input-group>
      <p class="error__text" v-if="!message.checkPass.error">Password is required</p>
      <input type="button" class="btn btn-primary w-100 font-weight-bold" value="Login" @click="loginAPI">
      <router-link class="text-primary mt-3 text-center d-block" :to="'/forgotpassword'">Forgot your password ?</router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CONTANT from '@/core/contant'
export default {
 data() {
    return {
      user: {
        email: '',
        password: ''
      },      
      message: {
        checkEmail: {
          error: true,
          message: ''
        },
        checkPass: {
          error: true,
          message: ''
        }
      }
    }
  },
  computed: {
    ...mapState('login', {
      errorCode : state => state.errorCode
    })
  },
  watch: {
    'user.email'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.message.checkEmail.error = true
        this.$store.dispatch('login/resetMess', true)
      }
    },

    'user.password'(newValue, oldValue) {
      if (oldValue !==  newValue) {
        this.message.checkPass.error = true
        this.$store.dispatch('login/resetMess', true)
      }
    }
  },

  methods: {
    loginAPI() {
      const { email, password } = this.user
      let { checkEmail, checkPass } = this.message 

      if (email === ''){
        checkEmail.error = false
        checkEmail.message = CONTANT.message['002']
      }
      if (password === ''){
        checkPass.error = false
        checkPass.message = CONTANT.message['003']
      }
      if ( checkEmail.error === true && checkPass.error === true) {
        this.$store.dispatch('login/loginData', this.user)
      }
    },
  },
}
</script>
