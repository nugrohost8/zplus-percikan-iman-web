<template>
  <div class="p-4 bg-white">
    <div class="header-text mb-3">
        <span class="text-16 text-bold">Mitra Kebaikan</span>
      </div>
    <div class="py-3">
      <carousel :itemsToShow="itemsToShow" :snapAlign="'center'" :autoplay="2000" :wrapAround="true" :pauseAutoplayOnHover="true" class="pilar-program-carousel">
        <slide v-for="(partner,index) in partners" :key="index">
          <nuxt-link v-if="partner.website" :to="partner.website" class="text-center">
            <div class="text-center px-3">
               <nuxt-img  preload loading="lazy" :src="STORAGE_URL + partner.logo" class="partner-icon" :alt="partner.nama_partner"></nuxt-img>
              <div class="text-center mt-3 text-w900">{{ partner.nama_partner }}</div>
          </div>
          </nuxt-link>
          <div v-else class="text-center px-3">
            <nuxt-img  preload loading="lazy" :src="STORAGE_URL + partner.logo" class="partner-icon" :alt="partner.nama_partner"></nuxt-img>
            <!-- <div class="text-center mt-3 text-w900">{{ partner.nama_partner }}</div> -->
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    partners:Array
  })
  const itemsToShow = computed(()=>{
    if(props.partners?.length >=3 ){
      return 3;
    }else{
      return props.partners?.length;
    }
  })
  const config = useRuntimeConfig();
  const STORAGE_URL = config.public.storageUrl;
</script>

<style >
  

</style>