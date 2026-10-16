<template>
    <div>
      <SeoMeta 
          :title="'Visi Misi '+config.public.appName"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'visi-misi'" />
      <ArtikelHeader :title="'Visi Misi'" />
      <div id="home" class="d-flex justify-content-center">
        <div class="page">
          <div class="bg-white pt-56 full-page">
            <div class="p-4" v-html="faqPage"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const config = useRuntimeConfig();
  const { $getMeta,$getMetaScript} = useNuxtApp()
  const route = useRoute();
  const faqPage = ref('');
  const { data, status, error, refresh, clear } = await useAsyncData(
    'front-end/setting',
    () => $fetch(`${config.public.baseUrl}front-end/settings`,{
      method:'POST',
      body:{
        key:'visi-misi',
    },
      lazy: true
    })
  );
  if(data.value){
      const result = data.value;
      faqPage.value = result.data.value;
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
            href: config.public.baseAppUrl + 'visi-misi'
          }
        ],
        script: $getMetaScript({
          url: config.public.baseAppUrl,
          title: 'Visi Misi ' + config.public.appName,
          description: config.public.appDescription
        })
    })

    useSeoMeta({
      title: 'Visi Misi',
      ogTitle: 'Visi Misi',
      description: config.public.appDescription,
      ogDescription: config.public.appDescription,
      ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      twitterCard: 'summary_large_image',
    })
  </script>
  
  <style>
  
  </style>