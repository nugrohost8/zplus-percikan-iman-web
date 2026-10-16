<template>
  <div>
    <SeoMeta 
          :title="'FAQ'"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'faq'" />
    <ArtikelHeader :title="'FAQ'" />
    <div id="home" class="d-flex justify-content-center">
      <div class="page">
        <div class="bg-white pt-56 full-page">
          <div class="p-3">
            <div class="list-group">
              <div class="list-group-item list-group-action mb-1" v-for="faq in faqs" :key="faq.id">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="t-bold flex-grow-1">{{ faq.title }}</div>
                    <button class="btn btn-default" @click="viewFaq(faq.slug)">
                      <i class="bx bx-chevrons-right"></i>
                    </button>
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
const { $getMetaScript} = useNuxtApp()
const faqs = ref('');
const { data, status} = await $fetch(`${config.public.baseUrl}front-end/faq`,{
    method:'POST',
    lazy: true
  })
  if(status == 1){
    faqs.value = data;
  }

  const viewFaq = (slug)=>{
    navigateTo('/detail-faq?slug=' + slug);
  }

  useHead({
        meta:[
          { name:'theme-color',content:config.public.mainColor},
          { name: "color-scheme", property: "color-scheme",content: "dark light"}
        ],
        link: [
          {
            hid: 'canonical',
            rel: "canonical",
            href: config.public.baseAppUrl + 'faq'
          }
        ],
        script: $getMetaScript({
          url: config.public.baseAppUrl,
          title: 'Legal Formal '+ config.public.appName,
          description: 'Legal Formal ' + config.public.appName
        })
    })

    useSeoMeta({
      title: 'FAQ',
      ogTitle: 'FAQ',
      description: config.public.appDescription,
      ogDescription: config.public.appDescription,
      ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      twitterCard: 'summary_large_image',
    })
</script>

<style>

</style>