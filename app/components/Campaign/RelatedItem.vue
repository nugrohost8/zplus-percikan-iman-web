<template>
    <div class="card w-100 min-h-100 card-radius-sm">
       <nuxt-link :to="'/campaign/'+campaign.slug" class="w-100 min-h-100">
           <nuxt-img  preload loading="lazy" :src="STORAGE_URL + campaign.mobile_thumbnail" class="w-100 campaign-img-sm" :alt="campaign.title" ></nuxt-img>
           <div class="card-body p-2">
               <div class="d-flex flex-column justify-content-between">
                   <div class="text-start t-elipsize elipsize-2 text-sm min-h-34px">{{ campaign.title }}</div>
                   <div class="d-flex">
                       <div class="text-green text-bold text-sm me-2">{{ config.public.appName }}</div>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M8.31668 23.375L6.25834 19.9083L2.35834 19.0417L2.73751 15.0333L0.0833435 12L2.73751 8.96667L2.35834 4.95833L6.25834 4.09167L8.31668 0.625L12 2.19583L15.6833 0.625L17.7417 4.09167L21.6417 4.95833L21.2625 8.96667L23.9167 12L21.2625 15.0333L21.6417 19.0417L17.7417 19.9083L15.6833 23.375L12 21.8042L8.31668 23.375ZM9.23751 20.6125L12 19.4208L14.8167 20.6125L16.3333 18.0125L19.3125 17.3083L19.0417 14.275L21.0458 12L19.0417 9.67083L19.3125 6.6375L16.3333 5.9875L14.7625 3.3875L12 4.57917L9.18334 3.3875L7.66668 5.9875L4.68751 6.6375L4.95834 9.67083L2.95418 12L4.95834 14.275L4.68751 17.3625L7.66668 18.0125L9.23751 20.6125ZM10.8625 15.8458L16.9833 9.725L15.4667 8.15417L10.8625 12.7583L8.53334 10.4833L7.01668 12L10.8625 15.8458Z" fill="#00AAFF"/>
                       </svg>
                   </div>
               </div>
           </div>
       </nuxt-link>
   </div>
   </template>
   
   <script setup>
     const config = useRuntimeConfig();
     const STORAGE_URL = config.public.storageUrl;
     const props = defineProps({
         campaign: Object
       })
   </script>
   
   <style scoped>
   
   </style>