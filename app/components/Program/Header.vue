<template>
    <div class="fixed-0">
      <div class="d-flex justify-content-center">
        <div class="page">
          <nav class="navbar bg-white navbar-expand p-0 align-items-center bg-header-green header-bar" id="header-program">
            <div class="me-1">
              <nuxt-link to="/">
                <nuxt-img :src="'/assets/icons/logo.png'" preload loading="lazy" :alt="config.public.appName" class="logo-header ms-3"></nuxt-img>
              </nuxt-link>
            </div>
            <div  class="flex-grow-1"></div>
            <div class="search-pad p-relative mx-1">
              <input class="form-control form-control-sm text-input" @change="search"  v-model="keyword">
              <i class='bx bx-search text-16 iconSearch' ></i>
            </div>
            <WidgetCartButton />
            <div class="me-1">
              <button type="button" class="btn btn-default" @click="openDrawer">
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
   const router = useRouter()
   const config = useRuntimeConfig();
   const isActive = ref(false)
   const keyword = ref('');
   const {$bus } = useNuxtApp();
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
  watch(keyword,(newValue)=>{
      if(newValue !== ''){
        if($bus !== undefined){
          $bus.$emit('search',newValue);
        }
      }
  })
 
  </script>
  
  <style scoped>
  
  .form-control:focus {
    color: #212529;
    background-color: #fff;
    border-color: #f3d333;
    outline: 0;
    box-shadow: 0 0 0 .25rem rgb(241 207 23 / 25%);
}
  </style>