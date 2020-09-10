<template>
  <div>
      <div class="account-wrapper">
        <b-form class="form-login" @submit.prevent="submitLogin">
          <div class="form-login__logo">
            <img src="@/assets/images/logo.png" alt="Kobelco" class="img-fluid" />
          </div>
          <h2 class="form-login__title">ĐĂNG NHẬP</h2>
          <div class="error-message" v-if="loginError">{{ messageResult }}</div>
          <b-input-group class="mb-3">
            <b-icon icon="person-fill" class="form-login__icon"></b-icon>
            <div class="flied">
              <b-form-input
                class="col-md-12 form-login__input"
                type="email"
                v-model="userData.email"
                placeholder="Địa chỉ email"
              ></b-form-input>
            </div>
            <div class="error-message" v-if="userData.email === '' && checkVal">Email là bắt buộc</div>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-icon icon="lock-fill" class="form-login__icon"></b-icon>
            <div class="flied">
              <b-form-input
                class="col-md-12 form-login__input"
                type="password"
                v-model="userData.password"
                placeholder="Mật khẩu"
              ></b-form-input>
            </div>
            <div
              class="error-message"
              v-if="userData.password === '' && checkVal"
            >Mật khẩu là bắt buộc</div>
          </b-input-group>
          <b-overlay
            :show="loadingBtn"
            rounded="sm"
            spinner-small
            spinner-variant="primary"
            variant="light"
            class="mb-3"
          >
            <b-button class="form-login__submit w-100 p-2" variant="primary" type="submit">Đăng nhập</b-button>
          </b-overlay>
          <div class="text-center">
            <b-link>Quên mật khẩu?</b-link>
          </div>
        </b-form>
      </div>
    <Footer />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Footer from '@/views/Footer';
export default {
  name: 'Login',
  
  components: {
    Footer,
  },

  data(){
    return {
      isLogin: true,
      checkValEmail: false,
      checkValPass: false,
      checkVal: false,
      loginError: false,
      userData: {
        email: '',
        password: '',
      },
      msgFromApi: {},
      loadingBtn: false,
    };
  },
  computed:  {
     ...mapState('auth', {
      messageResult: state => state.messageResult,
    })
  },
  methods: {
    //Button submit
    submitLogin(){
      this.checkVal = true
      if (this.userData.email !== '' && this.userData.password !== '') {
        this.$store.dispatch('auth/setUserData', this.userData)
        setTimeout(() => {
          this.loginError = true
        }, 600);
      } 
    },
  },

  watch: {
    userData: {
      handler(newVal) {
        if (newVal) {
          this.loginError = false
        }
      },
      deep: true,
    }, 
  },
};
</script>
<style scoped lang='scss'>
    @import 'style.scss';
</style>
