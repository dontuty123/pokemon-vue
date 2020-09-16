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
      <p class="mb-3 error__text" v-if="!groupMess.currentMess.error">{{groupMess.currentMess.mess}}</p>
      <b-input-group class="mb-2">
        <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
        <input type="password" placeholder="Enter your new password" class="ip__login" v-model="groupPassword.news">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!groupMess.newMess.error">{{groupMess.newMess.mess}}</p>
       <b-input-group class="mb-2">
        <b-icon icon="lock-fill" class="position-absolute icon__pass"></b-icon>
        <input type="password" placeholder="Confirm your new password" class="ip__login" v-model="groupPassword.confirm">
      </b-input-group>
      <p class="mb-3 error__text" v-if="!groupMess.confirmMess.error">{{groupMess.confirmMess.mess}}</p>
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
        news: '',
        confirm: ''
      },
      groupMess: {
        currentMess: {
          error: true,
          mess: ''
        },
        newMess: {
          error: true,
          mess: ''
        },
        confirmMess: {
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
      this.messError(newValue, oldValue, 'currentMess', CONTANT.message['011'])
    },
    'groupPassword.news'(newValue, oldValue) {
      this.messError(newValue, oldValue, 'newMess', CONTANT.message['005'])
    },
    'groupPassword.confirm'(newValue, oldValue) {
      this.messError(newValue, oldValue, 'confirmMess', CONTANT.message['006'])
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

    validateForm(typeValid, typeMess) {
      // Setting type function use validate
      const typeFunction = typeValid === 'current' ? 'validateCurrent' : typeValid === 'news' ? 'validateFormatPass' : 'validateComfirm'
      // Check validate password
      if (this.groupMess[typeMess].error === true) {
        let resVal
        if (typeValid === 'confirm') {
          resVal = validateData[typeFunction](this.groupPassword['news'], this.groupPassword[typeValid])
        } else {
          resVal = validateData[typeFunction](this.groupPassword[typeValid])
        }
        return resVal
      }
    },
    changePass() {
      // Check currentPassword is not ''   
      const { currentMess, newMess, confirmMess } = this.groupMess
      const { current, news, confirm } = this.groupPassword
      currentMess.error = this.validateForm('current', 'currentMess')
      if (!currentMess.error) {
        currentMess.mess = CONTANT.message['011']
      }
      // Check newPassword is not '' && validate forrmat password
      if (news === '') {
        newMess.error = false
        newMess.mess = CONTANT.message['005']
      } else {
        newMess.error = this.validateForm('news', 'newMess')
        if (!newMess.error) {
          newMess.mess = CONTANT.message['015']
        }
      }
      // Check confirmPassword is not '' && matching with currentPassword
      if (confirm === '') {
        confirmMess.error = false
        confirmMess.mess = CONTANT.message['006']
      } else {
        confirmMess.error = this.validateForm('confirm', 'confirmMess')
        if (!confirmMess.error) {
          confirmMess.mess = CONTANT.message['007']
        }
      }
      // Call api changePassword 
      if (currentMess.error && newMess.error && confirmMess.error ) {
        const data = {
          currentPassword: current,
          newPassword: news
        }
          this.$store.dispatch('changePass/changePassword', data)
      }
    }
  }
}
</script>
