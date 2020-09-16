<template>
  <div class="d-flex flex-column justify-content-center h-100">
    <b-overlay :show="dataForget.isLoading" rounded="sm">
     <div class="form__user shadow mb-5 bg-white">
      <img src="@/assets/images/download.png" class="logo mb-4">
      <h4 class="mb-2 text-center">FORGOT YOUR PASSWORD ?</h4>
      <p class="text-center mb-3">Send a link to your email to reset your password</p>
      <p class="mb-2" :class="dataForget.color" v-if="!dataForget.status">{{dataForget.message}}</p>
      <b-input-group class="mb-2">
        <b-icon icon="envelope-fill" class="position-absolute icon__pass"></b-icon>
        <input type="text" placeholder="Enter your email address" class="ip__login" v-model="data.email">
      </b-input-group>
      <p class="error__text" v-if="!mess.checkEmail">{{mess.emailError}}</p>
      <input type="button" class="btn btn-primary w-100 font-weight-bold mt-2" value="Send" @click="forgetPass">
      <router-link class="text-primary mt-3 text-center d-block" :to="'/'">Back to login</router-link>
     </div>
    </b-overlay>
  </div>
</template>

<script>
import validateData from '@/core/util/validateData'
import { mapState } from 'vuex'
import CONTANT from '@/core/contant'
export default {
   data() {
    return { 
      data: {
        email: ''
      },
      mess: {
        checkEmail: true,
        emailError: '',
      },
    }
  },

  computed:  {
    ...mapState('forgotPass', {
      dataForget : state => state.dataForget
    })
  },

  watch: {
    'data.email'(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.mess.checkEmail = true
        this.$store.dispatch('forgotPass/resetMess', true)
      }
      if (newValue === '') {
        this.mess.checkEmail = false
      }
    },
  },
  methods: {
    forgetPass() {
      const { email } = this.data
      let { checkEmail } = this.mess
      if (email === ''){
        checkEmail = false
        this.mess.emailError = CONTANT.message['002']
      }else{
        const mailVali = validateData.validateEmail(this.data.email)
        if (!mailVali){
          checkEmail = false
          this.mess.emailError = CONTANT.message['002']
        }
      }
      if (checkEmail) {
        this.$store.dispatch('forgotPass/loading', true)
        this.$store.dispatch('forgotPass/forgotPass', this.data)
      }
    }
  }
}
</script>
<style lang="scss">
</style>
