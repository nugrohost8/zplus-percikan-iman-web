<template>
   <div>
    <SeoMeta 
          :title="'Laporan Keuangan '+config.public.appName"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'laporan-keuangan'" />
      <ArtikelHeader :title="'Laporan Keuangan'" />
      <div id="home" class="d-flex justify-content-center">
        <div class="page">
          <div class="bg-white pt-56 full-page">
            <div v-if="laporan.length > 0" class="p-3">
              <h4 class="text-center">
                  <span>Laporan Keuangan</span>
                  <div class="underscore"></div>
              </h4>
              <div class="text-center text-w400">Berikut kami lampirkan Laporan Keuangan {{ config.public.appName }} yang sudah diaudit oleh akuntan publik.</div>
              <div class="border-1 px-2 py-1 lap-item mt-4" v-for="(lap,index) in laporan" :key="index">
                  <div class="d-flex justify-content-between align-items-center lap-item" @click="show(index)">
                      <div class="text-green text-bold">Laporan Keuangan Tahun {{ lap.tahun }}</div>
                      <span class="p-2"><i class="bx bx-plus"></i></span>
                  </div>
                  <div class="collapse mb-2" :class="{show:collapseIndex == index}">
                      <div v-for="(item,index) in getLaporan(lap.title)" :key="index">
                          <NuxtLink :to="STORAGE_URL+getFiles(lap.files)[index]" class="text-bold">
                              <span>{{ (index + 1) + ". " +  item }}</span>
                          </NuxtLink>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { $getMeta,$getMetaScript} = useNuxtApp()
const route = useRoute();
  const laporan = ref([]);
  const collapseIndex = ref(null);
  const STORAGE_URL = config.public.storageUrl;
  const { data, status } = await $fetch(`${config.public.baseUrl}front-end/laporan-keuangan`,{
      method:'POST',
      lazy: true
    })
    if(status == 1){
      laporan.value = data;
    }

 const getLaporan = (lap)=>{
    return lap.split(',');
 }
 const getFiles = (files)=>{
    return files.split(',');
 }
 function show(index){
    if(collapseIndex.value == index){
        collapseIndex.value = null;
    }else{
        collapseIndex.value = index;
    }
}
onMounted(()=>{
  if(route.query !== undefined){
    let referral = route.query.referral;
    if(referral !== undefined){
      window.history.replaceState({},'',`?referral=`+referral);
    }
  }
})
useHead({
  meta:[
      { name:'theme-color',content:config.public.mainColor},
      { name: "color-scheme", property: "color-scheme",content: "dark light"},
    ],
        link: [
          {
            hid: 'canonical',
            rel: "canonical",
            href: config.public.baseAppUrl +'laoran-keuangan'
          }
        ],
        script: $getMetaScript({
          url: config.public.baseAppUrl,
          title: 'Laporan Keuangan ' + config.public.appName,
          description: 'Laporan Keuangan ' + config.public.appName
        })
    })

    useSeoMeta({
      title: 'Laporan Keuangan',
      ogTitle: 'Laporan Keuangan',
      description: config.public.appDescription,
      ogDescription: config.public.appDescription,
      ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      twitterCard: 'summary_large_image',
    })
</script>

<style>
   
</style>