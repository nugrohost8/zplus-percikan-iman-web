<template>
    <div class="fixed-0">
        <div class="d-flex justify-content-center">
          <div class="page">
            <nav class="navbar navbar-dark bg-white navbar-expand p-0 align-items-center nav-shadow bg-header-green header-bar" id="header-program">
              <button class="btn btn-default " @click="goback">
                <i class="bx bx-arrow-back text-24 text-main"></i>
              </button>
              <div class="text-w400 text-14 text-main ms-1 t-elipsize elipsize-1">{{ title }}</div>
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
    const router = useRouter();

    const goback = ()=>{
      if(window.history.state.back == null){
        router.push('/')
      }else{
        router.back();
      }
    }
  </script>
  
  <style>
    
  </style>