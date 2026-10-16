<template>
    <div class="px-3">
      <div>
        <carousel :items-to-show="1" :wrapAround="true" :pauseAutoplayOnHover="true" :snapAlign="'center'" >
          <slide v-for="(artikel,index) in artikels" :key="index">
            <ArtikelCard :artikel="artikel" />
          </slide>
          <template #addons>
            <pagination />
          </template>
        </carousel>
      </div>
    </div>
  </template>
  
  <script setup>
      const props = defineProps({
        artikels: Array
      })
  
  </script>
  
  <style scoped>

  </style>