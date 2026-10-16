<template>
  <div class="p-3">
    <div class="header-text mb-3"><span class="text-16 text-bold">Zakat</span></div>
    <div class="row" v-if="campaigns.length > 0">
      <div v-for="(campaign,index) in campaigns" :key="index" class="col-6 px-2 mb-3">
        <NuxtLink :to="'campaign/' + campaign.slug">
          <div class="card card-radius">
            <NuxtImg preload loading="lazy" :src="STORAGE_URL + campaign.mobile_thumbnail" class="w-100 campaign-img" ></NuxtImg>
            <div class="card-body1 p-2">
              <div class="text-sm text-w400 t-elipsize elipsize-2 min-h-32px">{{ campaign.title }}</div>
            </div>
          </div>
        </NuxtLink> 
      </div>
    </div>
    <div v-else class="min-vh-68 d-flex justify-content-center align-items-center">
      <WidgetEmptyData />
    </div>
    
  </div>
</template>

<script setup>
 const props = defineProps({
  campaigns:Array,require:true
 })
 const config = useRuntimeConfig();
 const STORAGE_URL = config.public.storageUrl;

 
</script>

<style>

</style>