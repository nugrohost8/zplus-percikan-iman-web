<template>
  <div class="d-flex justify-content-center">
    <div class="page">
      <ProgramHeader />
      <div class="bg-white full-page top-56">

      </div>
      <Footer></Footer>
      <CopyRight :needShow="true"/>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute();
const config = useRuntimeConfig();
const campaigns = ref([])
const { data, status } = await $fetch(`${config.public.baseUrl}program-campaign-list`,{
    method:'POST',
    body:{
            program:route.params.name
        },
    lazy: true
  })
  if(status ==1){
    campaigns.value = data.campaigns; 
  }

</script>

<style>

</style>