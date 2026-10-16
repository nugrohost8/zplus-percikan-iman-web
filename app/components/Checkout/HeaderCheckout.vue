<template>
    <div class="fixed-0">
        <div class="d-flex justify-content-center">
          <div class="page">
            <nav class="navbar navbar-dark bg-white navbar-expand p-0 align-items-center nav-shadow bg-white header-bar" id="header-program">
              <div class="me-1">
                <nuxt-img :src="'/assets/icons/logo.png'" preload loading="lazy" :alt="$config.public.appName" class="logo-header ms-3"></nuxt-img>
              </div>
              <div class="text-w400  text-16 ms-4">{{ title }}</div>
              <div  class="flex-grow-1"></div>
            </nav>
            <div class="header-bottom"></div>
          </div>
        </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title:String
  })
  const config = useRuntimeConfig();
  </script>
  
  <style>
    
  </style>