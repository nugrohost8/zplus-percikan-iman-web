<template>
  <div class="fixed-0">
    <div class="d-flex justify-content-center">
      <div class="page">
        <nav class="navbar navbar-dark navbar-expand p-0 align-items-center header-bar bg-header-green" id="header-bar">
          <div class="me-1">
            <NuxtLink to="/">
              <nuxt-img :src="'/assets/icons/logo.png'" preload loading="lazy" alt="Percikan Iman" class="logo-header ms-3"></nuxt-img>
            </NuxtLink>
          </div>
          <div  class="flex-grow-1"></div>
          <button class="rounded-50 btn btn-default p-4px" @click="goToSearch" aria-label="search">
            <div class="p-relative">
              <i class='bx bx-search text-main text-24' ></i>
              <!-- <svg aria-hidden="true" class="" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0" fill="#ffffff"></path></svg> -->
            </div>
          </button>
          <WidgetCartButton />
          <div>
            <NuxtLink class="btn btn-urgent-donate mx-1" :to="'/program'">
              Donasi
            </NuxtLink>
          </div>
          <!-- 
          <div>
            <NuxtLink class="btn btn-urgent-donate-wakaf mx-1" :to="'/wakaf'">
              Wakaf
            </NuxtLink>
          </div>
           -->
         
          <button type="button" id="toggle-sidebar" class="btn btn-sm btn-default me-1" @click="openDrawer" aria-label="sidebar">
              <i class="bx bx-menu text-main text-bold text-24"></i>
            </button>
       
          <SideBar ref="sidebar"></SideBar>
        </nav>
        <div class="header-bottom"></div>
      </div>
    </div>
</div>
</template>

<script setup>
 const router = useRouter()
 const isActive = ref(false)
 const { $bus} = useNuxtApp();
 const headerActive = ref(false);
 import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const cartCount = ref('');
const wakafReady = ref(false);
cartCount.value = cartStore.listOfCart.length
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
onMounted(()=>{
  window.addEventListener('scroll', onScroll)
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
  if (currentScrollPosition < 40) {
    headerActive.value= false
  } else {
    headerActive.value= true
  }
})
onUnmounted(()=>{
  window.removeEventListener('scroll',stopScoll)
})

function onScroll() {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
      if (currentScrollPosition < 40) {
        headerActive.value= false
      } else {
        headerActive.value= true
      }
  }
function stopScoll(){

}

</script>

<style>

</style>