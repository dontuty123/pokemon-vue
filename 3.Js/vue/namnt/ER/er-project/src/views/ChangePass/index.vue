<template>
 <div class="d-flex flex-column justify-content-center h-100">
    <div class="form__user shadow mb-5 bg-white">
      <img src="@/assets/images/download.png" class="logo mb-3">
      <h4 class="text-center mb-3 font-weight-bold">CHANGE PASSWORD</h4>
      <p class="mb-3 error__text" v-if="!changeError.status">{{changeError.message}}</p>
      <b-input-group class="mb-2 position-relative"> 
        <b-icon icon="lock-fill" class="position-absolute icon__user"></b-icon>
        <input type="password" placeholder="Enter your current password" class="ip__login" v-model="groupPassword.current">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!groupMess.current.error">{{groupMess.current.mess}}</p>
      <b-input-group class="mb-2">
        <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
        <input type="password" placeholder="Enter your new password" class="ip__login" v-model="groupPassword.new">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!groupMess.new.error">{{groupMess.new.mess}}</p>
       <b-input-group class="mb-2">
        <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
        <input type="password" placeholder="Confirm your new password" class="ip__login" v-model="groupPassword.confirm">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!groupMess.confirm.error">{{groupMess.confirm.mess}}</p>
      <input type="button" class="btn btn-primary w-100 font-weight-bold" value="Save new password" @click="changePass">
    </div>
  </div>
</template>
<script>
import validateData from '@/core/util/validateData'
import CONTANT from '@/core/contant'
import { mapState } from 'vuex'
export default {
  data() {
    return { 
      groupPassword: {
        current: '',
        new: '',
        confirm: ''
      },
      groupMess: {
        current: {
          error: true,
          mess: ''
        },
        new: {
          error: true,
          mess: ''
        },
        confirm: {
          error: true,
          mess: ''
        }
      },
    }
  },

  computed: {
    ...mapState('changePass', {
      changeError : state => state.changeError
    })
  }, 

  watch: {
    'groupPassword.current'(newValue, oldValue) {
      this.messError(newValue, oldValue, 'current', CONTANT.message['011'])
    },
    'groupPassword.new'(newValue, oldValue) {
      this.messError(newValue, oldValue, 'new', CONTANT.message['005'])
    },
    'groupPassword.confirm'(newValue, oldValue) {
      this.messError(newValue, oldValue, 'confirm', CONTANT.message['006'])
    }
  },

  methods: {
    messError(newValue, oldValue, typeValid, mess) {
      if (newValue !== oldValue) {
        this.groupMess[typeValid].error = true
      }
      if (newValue === '') {
        this.groupMess[typeValid].error = false
        this.groupMess[typeValid].mess = mess
      }
      this.$store.dispatch('changePass/resetMess', true)
    },

    validateForm(typeValid) {
      // Setting type function use validate
      let typeFunction = typeValid === 'current' ? 'validateCurrent' : typeValid === 'new' ? 'validateFormatPass' : 'validateComfirm'
      // Check validate password
      if (this.groupMess[typeValid].error === true) {
        let resVal
        if (typeValid === 'confirm') {
          resVal = validateData[typeFunction](this.groupPassword['new'], this.groupPassword[typeValid])
        } else {
          resVal = validateData[typeFunction](this.groupPassword[typeValid])
        }
        return resVal
      }
    },
    changePass() {
      // Check currentPassword is not '' 
      this.groupMess.current.error = this.validateForm('current')
      if (this.groupMess.current.error === false) {
        this.groupMess.current.mess = CONTANT.message['011']
      }
      // Check newPassword is not '' && validate forrmat password
      if (this.groupPassword.new === '') {
        this.groupMess.new.error = false
        this.groupMess.new.mess = CONTANT.message['005']
      } else {
        this.groupMess.new.error = this.validateForm('new')
        if ( this.groupMess.new.error === false) {
          this.groupMess.new.mess = CONTANT.message['015']
        }
      }
      // Check confirmPassword is not '' && matching with currentPassword
      if (this.groupPassword.confirm === '') {
        this.groupMess.confirm.error = false
        this.groupMess.confirm.mess = CONTANT.message['006']
      } else {
        this.groupMess.confirm.error = this.validateForm('confirm')
        if (this.groupMess.confirm.error === false) {
          this.groupMess.confirm.mess = CONTANT.message['007']
        }
      }
      // Call api changePassword 
      if ( this.groupMess.current.error === true && this.groupMess.new.error === true && this.groupMess.confirm.error === true ) {
        let data = {
          currentPassword: this.groupPassword.current,
          newPassword: this.groupPassword.new
        }
          this.$store.dispatch('changePass/changePassword', data)
      }
    }
  }
}
</script>
