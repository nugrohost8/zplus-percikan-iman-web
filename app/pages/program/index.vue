<template>
  <div id="home" class="d-flex justify-content-center">
    <div class="page">
      <SeoMeta 
          :title="'Program Unggulan '+config.public.appName"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'program'" />
        <ProgramHeader />
        <div class="bg-white full-page pt-56">
          <ProgramPilarProgram :name="route.query.program" :pilarProgram="pilarProgram" @openProgram="openProgram"/>
          <div class="list-campaign p-3 bg-soft-grey">
            <div v-if="campaigns.length > 0">
              <div class="row">
                  <div class="col-6 mb-2" v-for="(campaign,index) in campaigns" :key="campaign.campaign_id" :class="{ 'pe-1': index% 2 == 0, 'ps-1' : index% 2 !== 0}">
                    <nuxt-link :to="'/campaign/'+campaign.slug" class="w-100 min-h-100">
                      <CampaignCard :campaign="campaign" :title="campaign.title" :image="campaign.thumbnail" />
                    </nuxt-link>
                  </div>
              </div>
              <infinite-loading v-if="hasNextPage && requestNextPage" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
              <div class="text-center" v-else>
                <button v-if="hasNextPage" class="btn btn-sm btn-default" @click="loadMore">Lebih banyak</button>
              </div>
            </div>
            <WidgetEmptyData v-else />
          </div>
          <Footer ></Footer>
          <CopyRight />
          <div class="bottom-footer"></div>
        </div>
        <BottomNavBar :page="'program'"/>
    </div>
  </div>
</template>

<script setup>
  import {usePrevStateStore} from "@/stores/prevstate";
  const { $bus,$getMeta,$getMetaScript } = useNuxtApp();
  const config = useRuntimeConfig();
  const route = useRoute();
  const numRows = ref(0)
  const per_page = ref(0)
  const campaigns = ref([])
  const preserveCampaigns = ref([])
  const pilarProgram = ref([])
  const hasNextPage = ref(true);
  const page = ref(1);
  const requested = ref(false);
  const found = ref(true);
  const timeout = ref(null);
  const requestNextPage = ref(false);
  const prevStateStore = usePrevStateStore()
  const { data: homeRes } = await useAsyncData('programs', () =>
    $fetch(config.public.baseUrl + 'front-end/campaigns', {
      method: 'POST',
      strictSSL: false
    })
  );
  if(homeRes.value && homeRes.value.status == 1){
    campaigns.value = homeRes.value.data.campaigns;
    preserveCampaigns.value = homeRes.value.data.campaigns;
  }
  
const openProgram = (page)=>{
    if(page == 'Semua'){
      campaigns.value = preserveCampaigns.value;
    }else {
      campaigns.value = preserveCampaigns.value.filter(item=>item.kategori == page);
    }
    
  }
const loadMore = ()=>{
  requestNextPage.value = true;
}

function infiniteScroll(state){
  console.log("Infinite Scroll");
  hasNextPage.value = true;
  page.value ++;
  setTimeout(() => {
    $fetch(`${config.public.baseUrl}front-end/campaigns`, {
        method: 'post',
        body: {page:page.value}
    }).then((response)=>{
      response.data.campaigns.forEach(item=>{
        campaigns.value.push(item);
      })
      if(response.data.campaigns.length < per_page.value){
          hasNextPage.value = false;
      }
      requestNextPage.value = false;
    }).catch(err=>{
      console.log(err)
      requestNextPage.value = false;
    })
  }, 1000);
  
}
onMounted(()=>{
  if(route.query !== undefined){
    let referral = route.query.referral;
    if(referral !== undefined){
      window.history.replaceState({},'',`?referral=`+referral);
    }
  }
  $bus.$on('search',function(key){
      console.log("Keyword",key);
  })
  

  $bus.$on('search',(keyword)=>{
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
          search(keyword);
      }, 250);
  })
  if(route.query.program !== undefined && route.query.program !== 'Pendidikan'){
    //fetchData(route.query.program)
  }
  const previousRoute = prevStateStore.getPrevState
  if(previousRoute !== null){
    campaigns.value = prevStateStore.getData
  }
  console.log("OnMounted Previous State",previousRoute)
})

const search = (keyword)=>{
  $fetch(`${config.public.baseUrl}front-end/search`, {
          method:'POST',
          body:{
              keyword:keyword
          },
          lazy: true
  }).then(resultdata=>{
    if(resultdata.status == 1){
      campaigns.value = resultdata.data;
      found.value = resultdata.data.length > 0
    } 
  })
}

onBeforeRouteLeave(() => {
  prevStateStore.setPrevState(useRoute().path)
  prevStateStore.setData(campaigns.value)
  prevStateStore.setHasNextPage(hasNextPage.value)
  prevStateStore.setCurrentPage(page.value)
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
        href: config.public.baseAppUrl + 'program'
      }
    ],
    script: $getMetaScript({
      url: config.public.baseAppUrl + 'program',
      title: 'Program Unggulan ' + config.public.appName,
      description: 'Program Unggulan ' + config.public.appName
    })
})
useSeoMeta({
  title:'Program Unggulan '+config.public.appName,
  description:config.public.appDescription,
  ogImage: config.public.baseAppUrl +'assets/icons/icon-512x512.png',
  ogUrl:config.public.baseAppUrl + 'program',
  ogTitle: 'Program Unggulan ' + config.public.appName,
  ogDescription: config.public.appDescription,
  twitterCard: 'summary_large_image',
})
  
  
</script>

<style>

</style>