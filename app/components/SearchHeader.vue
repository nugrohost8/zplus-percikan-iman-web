<template>
    <div class="fixed-0">
      <div class="d-flex justify-content-center">
        <div class="page">
          <nav class="navbar bg-white navbar-expand p-0 align-items-center bg-header-green header-bar" id="header-program">
            <div class="me-1">
              <nuxt-img :src="'/assets/icons/logo.png'" preload loading="lazy" alt="Lazgis Peduli" class="logo-header ms-3"></nuxt-img>
            </div>
            <div class="flex-grow-1 p-relative mx-4">
              <input class="form-control form-control-sm text-input" @change="search"  v-model="keyword">
              <i class='bx bx-search text-16 iconSearch' ></i>
            </div>
          </nav>
          <div class="header-bottom"></div>
        </div>
      </div>
  </div>
  </template>
  
  <script setup>
   const keyword = ref('');
   const {$bus } = useNuxtApp();
 
  watch(keyword,(newValue)=>{
      if(newValue !== ''){
        if($bus !== undefined){
          $bus.$emit('search',newValue);
        }
      }
  })
 
  </script>
  
  <style >
  
  </style>