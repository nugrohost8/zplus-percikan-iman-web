<template>
   <div>
    <SeoMeta 
          :title="'FAQ'"
          :sitename="config.public.siteName"
          :description="faq?.title ?? config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'faq'" />
    <ArtikelHeader :title="faq?.title ?? 'FAQ'" />
    <div id="home" class="d-flex justify-content-center">
      <div class="page">
        <div class="bg-white pt-56 full-page">
          <div class="p-3">
            <div v-html="faq?.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    const config = useRuntimeConfig();
    const faq = ref(null);
    const { data, status} = await $fetch(`${config.public.baseUrl}front-end/detail-faq`,{
        method:'POST',
        lazy: true,
        body:{
            slug:useRoute().query.slug
        }
    })
    if(status == 1){
        faq.value = data;
    }
</script>

<style>

</style>