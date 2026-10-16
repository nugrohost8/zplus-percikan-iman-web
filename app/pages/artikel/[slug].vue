<template>
  <div id="home" class="d-flex justify-content-center">
    <div class="page pt-56 bg-white" v-if="artikel !== null">
         <SeoMeta 
            :title="artikel?.title"
            :sitename="config.public.siteName"
            :description="artikel?.description"
            :image="STORAGE_URL + artikel.thumbnail"
            :url="config.public.baseAppUrl + 'artikel/' + artikel?.slug" />
        <ArtikelHeader :title="artikel ? artikel.title : ''" />
        <div class="" v-if="artikel">
          <div class="p-3">
            <div class="text-14 t-elipsize elipsize-2 text-bold mb-3">{{ artikel.title }}</div>
            <div class="row justify-content-center mt-3">
              <div class="col-6 text-10 text-half-bl text-center">
                <i class="bx bx-user text-12"></i>{{ config.public.appName }}
              </div>
              <div class="col-6 text-10 text-half-bl text-center">
                <i class="bx bx-calendar text-12"></i>{{ $formatDate(artikel.created_at) }}
              </div>
            </div>
          </div>
          <iframe v-if="artikel.link_video !== null" :src="artikel.link_video" title="YouTube video player" frameborder="0" class="iframe-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
          <nuxt-img v-else preload loading="lazy" :src="STORAGE_URL + artikel.thumbnail" class="w-100" :alt="artikel.title"></nuxt-img>
          <div class="p-3">
            <div class="description paragraph text-justify" v-html="artikel.content"></div>
            <div class="text-center my-2">Bagikan artikel ini</div>
            <div class="d-flex justify-content-center">
              <div class="mx-1">
                <div class="circle-green circle-md link" @click="shareMedia('whatsapp')">
                  <SvgWhatsappSm fill="#ffffff" class="icon-socmed" />
                </div>
              </div>
              <div class="mx-1">
                <div class="circle-green circle-md link" @click="shareMedia('facebook')">
                  <SvgFacebook class="icon-socmed"/>
                </div>
              </div>
              <div class="mx-1">
                <div class="circle-green circle-md link" @click="shareMedia('twitter')">
                  <SvgTwitter class="icon-socmed"/>
                </div>
              </div>
            </div>
            <div v-if="campaignStore.primaryCampaign" class="py-4">
              <div class="text-w400 text-center mb-2">Klik untuk mewujudkan {{ campaignStore.primaryCampaign.title }}</div>
              <NuxtLink :to="'/campaign/'+campaignStore.primaryCampaign.slug">
                <CampaignCardHorizontal :campaign="campaignStore.primaryCampaign" />
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <nuxt-link :to="'/artikel/' + prev.slug" class="btn btn-default d-flex align-items-center text-green px-4" data-label="Artikel Sebelumnya" v-if="prev != null"><i class="bx bx-chevron-left text-28"></i>Sebelumnya</nuxt-link>
          </div>
          <div>
            <nuxt-link :to="'/artikel/' + next.slug" class="btn btn-default d-flex align-items-center text-green px-4" data-label="Artikel Selanjutnya" v-if="next != null">Selanjutnya<i class="bx bx-chevron-right text-28"></i></nuxt-link>
          </div>
        </div>
        <div class="space-iklan py-5"></div>
        <div class="p-2 bg-white" v-if="related?.length > 0">
            <div class="header-text mb-3">
                <span class="text-16 text-bold">Artikel Terkait</span>
            </div>
            <div v-for="(artikel,index) in related" :key="index">
            <NuxtLink :to="'/artikel/' + artikel.slug">
                <ArtikelCardHorizontal :artikel="artikel" />
            </NuxtLink>
            <hr class="bg-half-bl my-2" />
            </div>
        </div>
        <Footer></Footer>
        <CopyRight />
    </div>
  </div>
</template>

<script setup>
  import {
    useCampaignStore
  } from "@/stores/campaign";
  const campaignStore = useCampaignStore();
  const route = useRoute();
  const config = useRuntimeConfig();
  const STORAGE_URL = config.public.storageUrl;
  const {
    $getMetaScript,
    $shareIt
  } = useNuxtApp();
  const artikel = ref(null);
  const related = ref([]);
  const prev = ref(null);
  const next = ref(null);
  const { data,status} = await $fetch(`${config.public.baseUrl}front-end/artikel-detail`, {
    method: 'POST',
    body: {
      slug: route.params.slug
    },
    lazy: true
  });
  if (status == 1) {
    artikel.value = data.artikel;
    related.value = data.related;
    prev.value = data.prev;
    next.value = data.next;
  }
  async function shareMedia(page){
      let url = config.public.baseAppUrl + route.path.slice(1);
      if(page == 'whatsapp'){
          url = "Ayo berdonasi melalui "+config.public.appName+" \n Klik disini untuk memulai " + config.public.baseAppUrl + route.path.slice(1);
      }
      if(page == 'whatsapp'){
          $shareIt('whatsapp',url);
      }else if(page == 'facebook'){
          $shareIt('facebook',url)
      }else if(page == 'twitter'){
          $shareIt('twitter',url)
      }
  }
  onMounted(() => {
    if (route.query !== undefined) {
      let referral = route.query.referral;
      if (referral !== undefined) {
        window.history.replaceState({}, '', `?referral=` + referral);
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
          href: config.public.baseAppUrl + 'campaign/'+ artikel.value.slug
        }
      ],
      script: $getMetaScript({
        url: config.public.baseAppUrl + 'campaign/'+ artikel.value.slug,
        title: config.public.appName,
        description: config.public.appName
      })
 })
  useSeoMeta({
    title:()=>artikel.value ? artikel.value.title :config.public.appName,
    description:()=>artikel.value ? artikel.value.description :config.public.appDescription,
    ogImage:()=>artikel.value ? config.public.storageUrl + artikel.value.thumbnail : config.public.baseAppUrl +'assets/icons/icon-512x512.png',
    ogUrl:()=>artikel.value ? config.public.baseAppUrl + 'campaign/'+ artikel.value.slug :config.public.baseAppUrl,
    ogTitle:()=>artikel.value ? artikel.value.title : config.public.appName,
    ogDescription:()=>artikel.value ? artikel.value.description :config.public.appDescription,
    twitterCard: 'summary_large_image',
 })
  
</script>

<style scoped>
.link{
  cursor: pointer;
}
.icon-socmed .path-white{
  stroke:#fff !important;
  fill:#fff !important;
}
</style>