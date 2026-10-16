<template>
    <div id="home" class="d-flex justify-content-center">
        <div class="page">
          <SeoMeta 
            :title="'Program Zakat '+config.public.appName"
            :sitename="config.public.siteName"
            :description="config.public.appDescription"
            :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
            :url="config.public.baseAppUrl + 'zakat'" />
            <ProgramHeader />
            <div class="bg-white pt-56 full-page">
              <ZakatListZakat :campaigns="campaigns"/>
              <div class="bg-white p-4">
                 <div class="header-text mb-3"><span class="text-16 text-bold">Program Unggulan</span></div>
                  <div class="row">
                    <div class="col-6 mb-2" v-for="(infak,index2) in campaignInfak" :key="index2" :class="index% 2 == 0 ? 'pe-1' : 'ps-1'">
                      <nuxt-link :to="'/campaign/'+infak.slug" class="text-decoration-none">
                        <CampaignCard :campaign="infak" />
                      </nuxt-link>
                  </div>
                  </div>
              </div>
            </div>
            
            <div class="bottom-footer"></div>
            <Footer></Footer>
            <CopyRight :needShow="true" />
            <BottomNavBar :page="'zakat'"/>
        </div>
    </div>
</template>

<script setup>
 const config = useRuntimeConfig();
 const {$bus,$getMeta,$getMetaScript} = useNuxtApp()
 const route = useRoute();
const campaigns = ref([]);
const campaignInfak = ref([])
const { data, status } = await $fetch(`${config.public.baseUrl}front-end/list-zakat`,{
    method:'POST',
    lazy: true
  })
if(status == 1){
  campaigns.value = data.zakat.campaigns
  campaignInfak.value = data.infak
  console.log(data);
}

onMounted(()=>{
  $bus.$on('search',(value)=>{
        search(value)
        console.log(value)
  })
 
})


const search = (keyword)=>{
    $fetch(`${config.public.baseUrl}search`, {
            method:'POST',
            body:{
                keyword:keyword
            },
            lazy: true
    }).then(resultdata=>{
      if(resultdata.status == 1){
        campaigns.value = resultdata.data;
        //found.value = resultdata.data.length > 0
      } 
    })
  }

  const shareMedia = (data)=>{
    let url = data.url;
    let page = data.page; 
    if(page == 'whatsapp'){
          $shareIt('whatsapp',url)
      }else if(page == 'facebook'){
          $shareIt('facebook',url)
      }else if(page == 'twitter'){
          $shareIt('twitter',url)
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
          href: config.public.baseAppUrl +'zakat'
        }
      ],
      script: $getMetaScript({
        url: config.public.baseAppUrl,
        title: 'Kalkulator Zakat '+config.public.appName,
        description: 'Kalkulator Zakat ' + config.public.appName
      })
    })
  useSeoMeta({
    title:'Pembayaran Zakat',
    description:'Pembayaran Zakat',
    ogImage: config.public.baseAppUrl +'assets/icons/icon-512x512.png',
    ogUrl:config.public.baseAppUrl ,
    ogTitle: 'Home',
    ogDescription: 'Pembayaran Zakat ' + config.public.appName,
    twitterCard: 'summary_large_image',
 })
  
</script>

<style>

</style>