<template>
  <div class="er-error">
    <div class="error-form">
      <p class="page-title text-primary mb-0">
        404
      </p>
      <p class="noticate mb-0">{{ $t('error["notice"]') }}</p>
      <p class="error-content">{{ $t('error["noteLink"]') }}</p>
      <b-button class="btn-home" variant="primary" @click="linkHome">
        {{ $t('error["button"]') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import funcMemory from '@/core/service/memory.service.js';
export default {
  mounted() {
    this.$emit('initErrorPage', true)
  },
  methods: {
    linkHome() {
        this.$router.push('/update-working-hour').catch(error =>{})   
    }
  }
}
</script>

<style lang='scss'>
  @import 'style.scss';
</style>