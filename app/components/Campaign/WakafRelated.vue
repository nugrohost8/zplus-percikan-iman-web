<template>
    <div class="p-3 bg-white">
      <div class="header-text mb-3">
          <span class="text-16 text-bold">Wakaf Terkait</span>
      </div>
      <div class="row" v-if="related.length > 0">
          <div class="col-6 mb-2" v-for="(campaign,index) in related" :key="index" :class="index% 2 == 0 ? 'pe-1' : 'ps-1'">
              <CampaignRelatedItem :campaign="campaign" />
          </div>
      </div>
     
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
      related:Array
  })
  </script>
  
  <style>
  
  </style>