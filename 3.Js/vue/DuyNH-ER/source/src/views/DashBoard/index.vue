<template>
  <div>
    <Header />
    <div @submit.prevent="logout" class="body-content">
      <h1>Hi {{ userName }}</h1>
      <b-button class="p-2" variant="primary" type="submit" @click="logout">Đăng xuất</b-button>
      <ul class="list-button mt-3">
        <span class="mb-2">List màn hình</span>
        <li class="mr-2">
          <b-button href="/project-use-bootstrap" variant="primary" disable>Project (use Bootstrap)</b-button>
        </li>
        <li class="mr-2">
          <b-button href="/project" variant="primary">Project (Basic)</b-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from '../Header';
import Cookie from 'js-cookie'
import funcMemory from '@/core/service/memory.service.js'

export default {
  components: {
    Header,
  },
  data(){
    return {
      userName: '',
    };
  },
  created(){
    this.userName = funcMemory.getCookie('employeeName')
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout');
      window.location.reload('/login');
    },
  },
};
</script>
<style scoped lang='scss'>
    @import 'style.scss';
</style>
