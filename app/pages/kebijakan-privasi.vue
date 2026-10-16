<template>
    <div>
      <SeoMeta 
          :title="'Kebijakan Privasi '+config.public.appName"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'kebijakan-privasi'" />
      <ArtikelHeader :title="'Kebijakan Privasi'" />
      <div id="home" class="d-flex justify-content-center">
        <div class="page">
          <div class="bg-white pt-56 full-page">
              <div class="p-4" v-html="faq"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const config = useRuntimeConfig();
  const { $getMeta,$getMetaScript} = useNuxtApp()
  const route = useRoute();
  const faq = ref('');
  const { data, status } = await  $fetch(`${config.public.baseUrl}front-end/settings`,{
      method:'POST',
      body:{
            key:'kebijakan-privasi',
      },
      lazy: true
    })
    if(status == 1){
      faq.value = data.value
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
            href: config.public.baseAppUrl +'kebijakan-privasi'
          }
        ],
        script: $getMetaScript({
          url: config.public.baseAppUrl,
          title: 'Kebijakan Privasi '+config.public.appName,
          description: 'Kebijakan Privasi ' + config.public.appName
        })
    })
    useSeoMeta({
      title: 'Kebijakan Privasi',
      ogTitle: 'Kebijakan Privasi',
      description: config.public.appDescription,
      ogDescription: config.public.appDescription,
      ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      twitterCard: 'summary_large_image',
    })
  </script>
  
  <style>
  
  </style>