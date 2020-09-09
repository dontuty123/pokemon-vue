<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to='"/"'>Master</router-link></li>
        <li class="breadcrumb-item"><router-link :to='"/"'>Employee</router-link></li>
        <li class="breadcrumb-item" aria-current="page">Position</li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import "style.scss";
</style>