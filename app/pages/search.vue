<template>
  <div class="d-flex justify-content-center">
    <div class="page">
        <SearchHeader />
        
        <div class="bg-white pt-56 full-page">
            <div v-if="searching" class="min-vh-68 d-flex justify-content-center align-items-center">
              <div>
                <div class="">
                  <div class="spinner-search"></div>
                  <div class="my-3 text-green">Mencari</div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="3" v-if="found">
                  <div v-for="(item,index) in searchResult" :key="index">
                      <NuxtLink :to="item.type_data == 'campaign' ? 'campaign/' + item.slug : 'artikel/'+item.slug">
                          <WidgetSearchItem :result="item" />
                      </NuxtLink>
                  </div>
              </div> 
              <div v-else class="min-vh-68 d-flex justify-content-center align-items-center">
                <WidgetEmptyData />
              </div>
              
            </div>
          <div class="bottom-footer bg-white"></div>
        </div>
        <BottomNavBar :page="'search'"/>
    </div>
  </div>
  
</template>

<script setup>
  const config = useRuntimeConfig()
  const { $getMeta,$getMetaScript } = useNuxtApp()
  const route = useRoute();
  const {$bus } = useNuxtApp();
  const searchResult = ref([]);
  const found = ref(true);
  const timeout = ref(null);
  const searching = ref(false);

  onMounted(()=>{
    $bus.$on('search',(keyword)=>{
        clearTimeout(timeout.value);
        timeout.value = setTimeout(() => {
            search(keyword);
        }, 250);
    })
  })

  const search = (keyword)=>{
    searching.value = true;
    found.value = false;
    $fetch(`${config.public.baseUrl}front-end/search`, {
            method:'POST',
            body:{
                keyword:keyword,
                scope:'all'
            },
            lazy: true
    }).then(resultdata=>{
      searching.value = false;
      if(resultdata.status == 1){
        searchResult.value = resultdata.data;
        found.value = resultdata.data.length > 0
      }
      
    }).catch(err=>{
      searching.value = false;
    })
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
      title: config.public.appName,
        meta: $getMeta({
          og_locale: "id_ID",
          og_type: "website",
          og_title: 'Program Unggulan ' + config.public.appName,
          og_description:config.public.appDescription,
          og_url: config.public.baseAppUrl,
          og_site_name: config.public.appName,
          og_image: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
          og_keywords: 'Pendidikan,Kesehatan,Kemanusiaan,Ekonomi,Dakwah',
          theme_color:config.public.mainColor
        }),
        link: [{
            rel: "sitemap",
            type: "application/xml",
            title: "Sitemap",
            href: "/sitemap.xml"
          },
          {
            hid: 'canonical',
            rel: "canonical",
            href: config.public.baseAppUrl
          }
        ],
        script: $getMetaScript({
          url: config.public.baseAppUrl,
          title: config.public.appName,
          description: config.public.appDescription
        })
    })
</script>

<style>
.spinner-search {
    border: 3px solid rgba(15, 125, 66, 0.3);
    border-top: 3px solid #fff;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
    margin-top: 6px;
    
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>