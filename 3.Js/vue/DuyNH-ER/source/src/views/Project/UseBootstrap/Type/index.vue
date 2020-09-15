<template>
  <div>
    <Header />
    <div class="body-content project">
      <h2 class="page-heading mb-4">Master/ Project/ Project Type</h2>
      <FormProjectType />
      <TableProJectType />
    </div>
  </div>
</template>
<script>
import Header from '@/views/Header';
import FormProjectType from '@/components/Project/UseBootstrap/Type/Form'
import TableProJectType from '@/components/Project/UseBootstrap/Type/Table'

export default {
   name: 'ProjectType',
   components: {
    Header,
    FormProjectType,
    TableProJectType,
   },
   data(){
     return {
       
     }
   },
}
</script>
