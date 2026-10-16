<template>
    <div class="fixed-0">
      <div class="d-flex justify-content-center">
        <div class="page">
          <nav class="navbar navbar-dark navbar-expand p-0 align-items-center bg-header-green  header-bar">
            <div class="me-1">
              <nuxt-link to="/">
                <nuxt-img :src="'/assets/icons/logo.png'" preload loading="lazy" :alt="$config.public.appName" class="logo-header ms-3"></nuxt-img>
              </nuxt-link>
            </div>
            <div  class="flex-grow-1"></div>
            <WidgetCartButton />
            <div class="me-1">
              <button type="button" id="toggle-sidebar" class="btn btn-default" @click="openDrawer">
                <i class="bx bx-menu text-main text-bold text-24"></i>
              </button>
            </div>
            <SideBar ref="sidebar"></SideBar>
          </nav>
          <div class="header-bottom"></div>
        </div>
      </div>
  </div>
  </template>
  
  <script setup>
  const config = useRuntimeConfig();
   const router = useRouter()
   const isActive = ref(false)
   const { $bus} = useNuxtApp();
  function openDrawer(){
    if($bus !== undefined){
      if(isActive.value){
        $bus.$emit('close-drawer');
      }else{
        $bus.$emit('open-drawer');
      }
      isActive.value = !isActive.value
      
    }
  }
  
  function goToSearch(){
    router.push({ path : '/search'})
  }
  
  
  
  </script>
  
  <style>
  
  
  </style>