<template>
    <div id="home" class="d-flex justify-content-center">
        <div class="page pt-56" v-if="campaign !== null">
            <SeoMeta 
              :title="campaign?.title"
              :sitename="config.public.siteName"
              :description="campaign?.description"
              :image="STORAGE_URL + campaign?.thumbnail"
              :url="config.public.baseAppUrl + 'campaign/' + campaign?.slug" />
            <CampaignHeaderDetail />
            <iframe v-if="campaign.link_video !== null && campaign.link_video !== ''" :src="campaign.link_video" title="YouTube video player" frameborder="0" class="iframe-video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
            <nuxt-img  v-else preload loading="lazy" :src="STORAGE_URL + campaign?.thumbnail" class="w-100" :alt="campaign?.title" ></nuxt-img>
            <CampaignProgressDonasi :campaign="campaign" />
            <CampaignNominal :campaign="campaign" :minimumDonasi="minimumDonasi" :operasional="operasional" />
            <CampaignContent :campaign="campaign" />
            <Divider />
            <CampaignInfo :campaign="campaign" />
            <Divider />
            <CampaignDonatur :campaign="campaign" :donations="campaign.donations" />
            <!-- <CampaignTab :campaign="campaign"/> -->
            <CampaignFundRaiser />
            <CampaignRelated :related="related" />
            <div class="bottom-footer"></div>
            <WidgetBubble v-show="cartAdded" :vShow="cartAdded"/>
            <WidgetShareMedia :data="null" />
            <BottomDonation :campaign="campaign"/>
            <!-- <CampaignFundraiserForm :isVisible="isFundVisible" /> -->
            <CampaignRegisterSuccess :isVisible="isRegisterVisible" />
        </div>
    </div>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { $bus,$getMetaScript,$getShareKonten,$share,$shareIt } = useNuxtApp();
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

const STORAGE_URL = config.public.storageUrl;
const campaign = ref(null);
const related = ref([]);
const cartAdded = ref(false);
const addToCart = ref(false);
const isFundVisible = ref(false);
const isRegisterVisible = ref(false);
const minimumDonasi = ref(50000);
const operasional = ref(10000);

const { data ,status} = await $fetch(`${config.public.baseUrl}front-end/campaign-detail`,{
    method:'POST',
    body:{
            slug:route.params.slug
        },
    lazy: true
  });
  if(status == 1){
    campaign.value = data.campaign;
    related.value = data.relate;
  }

onMounted(()=>{
    if(route.query !== undefined){
      let referral = route.query.referral;
      if(referral !== undefined){
        window.history.replaceState({},'',`?referral=`+referral);
      }
    }
   
    $bus.$on('add-to-cart',()=>{
      cartAdded.value = true;
    })
    $bus.$on('end-to-cart',()=>{
      cartAdded.value = false;
    })
    $bus.$on('share-media',(data)=>{
      shareMedia(data);
    })
    $bus.$on('open-fundraiser',(data)=>{
      isFundVisible.value = !isFundVisible.value
    })
    $bus.$on('close-modal',()=>{
      isFundVisible.value = false;
    })
    $bus.$on('open-register-modal',()=>{
      isRegisterVisible.value = true;
    })
    $bus.$on('close-register-modal',()=>{
      isRegisterVisible.value = false;
    })

    if (process.client && window.ttq) {
      window.ttq.track('ViewContent', { campaign: campaign.value?.title });
    }


})
const shareMedia = (data)=>{
  let url = data.url;
  let page = data.page; 
  if(page == 'whatsapp'){
        let konten = $getShareKonten(campaign.value.title,campaign.value.description,url);
        $shareIt('whatsapp',konten)
    }else if(page == 'facebook'){
        $shareIt('facebook',url)
    }else if(page == 'twitter'){
        $shareIt('twitter',url)
    }
}

useSeoMeta({
  title: ()=>campaign.value ? campaign.value.title : config.public.appName,
  ogTitle: ()=>campaign.value ? campaign.value.title : config.public.appName,
  description:()=>campaign.value ? campaign.value.description :config.public.appDescription,
  ogDescription: ()=>campaign.value ? campaign.value.description :config.public.appDescription,
  ogImage:()=>campaign.value ? config.public.storageUrl + campaign.value?.thumbnail : config.public.baseAppUrl +'assets/icons/icon-512x512.png',
  ogUrl:()=>campaign.value ? config.public.baseAppUrl + 'campaign/'+ campaign.value.slug :config.public.baseAppUrl,
  ogTitle: ()=>campaign.value ? campaign.value.title : config.public.appName,
})

  

</script>
<style>
   
</style>
