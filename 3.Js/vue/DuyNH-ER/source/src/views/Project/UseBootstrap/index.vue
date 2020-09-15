<template>
  <div>
    <Header />
    <div class="body-content project">
      <h2 class="page-heading mb-4">Master/ Project</h2>
      <FormProject />
      <TableProJect />
    </div>
  </div>
</template>
<script>
import Header from '@/views/Header';
import FormProject from '@/components/Project/UseBootstrap/Detail/Form'
import TableProJect from '@/components/Project/UseBootstrap/Detail/Table'

export default {
  name: 'Project',
  data(){
    return {
      
    }
  },
  components: {
    Header,
    FormProject,
    TableProJect
  },
  methods: {
   
  },
};
</script>
<style lang='scss'>
    @import '../style.scss';
</style>
