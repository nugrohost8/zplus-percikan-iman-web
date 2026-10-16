<template>
  <div>
    <SeoMeta 
        :title="config.public.appName"
        :sitename="config.public.siteName"
        :description="config.public.appDescription"
        :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
        :url="config.public.baseAppUrl" />
    <HomeHeader />
    <div id="home" class="d-flex justify-content-center">
      <div class="page">
        <div  class="pt-56 full-page bg-soft-grey">
          <HomeCarousel :banners="banners" />
          
          <HomeCheckQurban v-if="searchQurban" />
          <div class="my-2" v-if="searchQurban"></div>
          <HomeProgramUnggulan :campaigns="campaigns" />
          <HomeKabarBahagia :artikels="artikels" :videos="videos" />
          <HomeKolaborasi :partners="partners" />
          <Footer></Footer>
          <CopyRight :needShow="true"/>
          <BottomNavBar :page="'home'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const {$getMetaScript} = useNuxtApp()
  const banners = ref([]);
  const config = useRuntimeConfig();
  const searchQurban = ref(false);
  const campaigns = ref([]);
  const artikels = ref([]);
  const videos = ref([]);
  const partners = ref([]);
  const { data: homeRes } = await useAsyncData('home-data', () =>
    $fetch(config.public.baseUrl + 'front-end/home', {
      method: 'POST',
      strictSSL: false
    })
  );
  if(homeRes.value && homeRes.value.status == 1){
      banners.value = homeRes.value.data.banners;
      campaigns.value = homeRes.value.data.campaigns?.campaigns;
      artikels.value = homeRes.value.data.artikels;
      videos.value =homeRes.value.data.videos;
      partners.value = homeRes.value.data.partners;
      let setting = homeRes.value.data.search_qurban;
      if(setting){
        searchQurban.value = setting.value == 1;
      }
    }
  
  onMounted(()=>{
      let referral = useRoute().query.referral;
      if(referral !== undefined){
        window.history.replaceState({},'',`?referral=`+referral);
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
          href: config.public.baseAppUrl + 'kalkulator-zakat'
        }
      ],
      script: $getMetaScript({
        url: config.public.baseAppUrl,
        title: 'Kalkulator Zakat ' + config.public.appName,
        description: 'Kalkulator Zakat ' + config.public.appName
      })
  })
    useSeoMeta({
      title: config.public.appName,
      ogTitle: config.public.appName,
      description:config.public.appDescription,
      ogDescription: config.public.appDescription,
      ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      twitterCard: 'summary_large_image',
    })
</script>

<style>

</style>