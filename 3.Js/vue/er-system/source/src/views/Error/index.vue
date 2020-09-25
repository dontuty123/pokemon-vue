<template>
  <div class="er-error">
    <div class="error-form">
      <p class="page-title text-primary">
      404
      </p>
      <p class="noticate">{{ $t('error["notice"]') }}</p>
      <p class="error-content">{{ $t('error["noteLink"]') }}</p>
      <b-button class="btn-home" variant="primary" @click="linkHome">
        {{ $t('error["button"]') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import qs from 'qs'
import auth from '@/core/service/checkAuth';
export default {
  methods: {
    linkHome() {
      const userData = qs.parse(cookie.get('userData'))
      console.log(userData)
      userData.token !== '' ? window.location.reload('/') :  window.location.reload('/login')
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>