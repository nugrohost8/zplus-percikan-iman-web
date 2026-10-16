<template>
  <section class="home-carousel-pad">
    <div class="">
      <carousel :items-to-show="1" :autoplay="autoplay" :wrapAround="true" :pauseAutoplayOnHover="true" :snapAlign="'center'" class="home-carousel" :transition="600">
        <slide v-for="(banner,index) in banners" :key="index" :class="'d-block'">
          <nuxt-link :to="banner.url_callback !== null ? banner.url_callback : '/'">
           <div class="p-relative w-100 aspect5_3">
              <nuxt-img  preload loading="lazy" :src="STORAGE_URL + banner.path" class="w-100 absolute-0" :alt="banner.title" ></nuxt-img>
            </div>
        </nuxt-link>
        </slide>
        
        <template #addons>
          <!-- <navigation /> -->
          <pagination />
        </template>
      </carousel>
    
  </div>
  </section>
</template>

<script setup>
    const config = useRuntimeConfig();
    const props = defineProps({
        banners: Array
    })

    const STORAGE_URL = config.public.storageUrl
    const { $bus } = useNuxtApp()
    const autoplay = ref(0);
    onBeforeUnmount(()=>{
    //clearInterval();
    });
    onMounted(()=>{
    autoplay.value = 2000
    })

</script>

<style scoped>
  .carousel__pagination{
    bottom:-12px;
  }
 
</style>