<template>
  <div class="d-flex flex-column justify-content-center h-100">
    <div class="form__user shadow mb-5 bg-white">
      <img src="@/assets/images/download.png" class="logo mb-3">
      <h4 class="text-center mb-3 font-weight-bold">RESET PASSWORD</h4>
      
      <b-input-group class="mb-2 position-relative"> 
        <b-icon icon="lock-fill" class="position-absolute icon__user"></b-icon>
        <input type="password" placeholder="Enter your new password" v-model="password.news" class="ip__login">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!messError.new.error"> {{messError.new.message}} </p>
      <b-input-group class="mb-2">
        <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
        <input type="password" placeholder="Confirm your new password" v-model="password.confirm" class="ip__login">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!messError.confirm.error"> {{messError.confirm.message}} </p>
      <input type="button" class="btn btn-primary w-100 font-weight-bold" value="Save new password" @click="resetPass">
    </div>
  </div>
</template>

<script>
import validateData from '@/core/util/validateData'
import CONTANT from '@/core/contant'
export default {
  data() {
    return { 
      data: {
        resetPassSecretKey:'',
        newPassword:''
      },
      secret: {
        resetPassSecretKey:''
      },
      password: {
        news: '',
        confirm: '' 
      },
      messError: {
        new: {
          error: true,
          message: ''
        },
        confirm: {
          error: true,
          message: ''
        }
      },
    }
  },

  created() {
    let myparam = this.$route.params.paramPage
    this.secret.resetPassSecretKey = myparam
    this.$store.dispatch('resetPass/secretPass', this.secret)
  },

  watch: {
    'password.confirm'(newVal,oldVal) {
      if (oldVal !== newVal && this.messError.confirm.error === false ) {
        this.messError.confirm.error = true
      }
      if (newVal === ''){
        this.messError.confirm.error = false
        this.messError.confirm.message = CONTANT.message['006']
      }
    },
    
    'password.news'(newVal,oldVal) {
      if (oldVal !== newVal && this.messError.new.error === false ) {
        this.messError.new.error = true
      }
      if (newVal === ''){
        this.messError.new.error = false
        this.messError.new.message = CONTANT.message['005']
      }
    },
  },

  methods:{
    resetPass() {
      //Check new pass is not '' and vaildate format password
      let { news, confirm } = this.password 
      if ( news === '' ) {
        this.messError.new.error = false
        this.messError.new.message = CONTANT.message['005']
      } else {
        this.messError.new.error = validateData.validateFormatPass(news)
        if ( this.messError.new.error === false) {
          this.messError.new.message = CONTANT.message['015']
        }
      }
      //Check confirmpass is not '' and matching newpassword 
      if ( confirm === '' ) {
        this.messError.confirm.error = false
        this.messError.confirm.message = CONTANT.message['006']
      } else {
        this.messError.confirm.error = validateData.validateComfirm(news, confirm)
        if ( this.messError.confirm.error === false) {
          this.messError.confirm.message = CONTANT.message['007']
        }
      }
      // Call api resetPass
      if (this.messError.new.error === true && this.messError.confirm.error === true ) {
        let myparam = this.$route.params.paramPage
        this.data.resetPassSecretKey = myparam
        this.data.newPassword = this.password.confirm
        this.$store.dispatch('resetPass/resetPass', this.data)
      }
    }
  }
}
</script>

<style>

</style>
