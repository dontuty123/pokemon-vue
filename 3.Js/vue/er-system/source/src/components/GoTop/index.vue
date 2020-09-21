<template>
  <div class="er-scrolltop">
    <div class="back-to-top" :class="{ 'fadeIn': !showNavbar }">
      <button class="ui large icon button" @click="scrollTop()">
        <span>&nbsp;</span>
      </button>
      <small>Back To Top</small>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scrollTop',
  data() {
    return {
      offset: 60,
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
    };
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener('scroll', this.onScroll);
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(viewportMeta);
  },
  methods: {
    //Scroll to top
    scrollTop(){
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },

    // Check hiden, show button
    onScroll(){
      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.offset) {
        return;
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
  },
};
</script>
<style scoped lang='scss'>
  @import 'style.scss';
</style>
