<template>
  <div id="home" class="d-flex justify-content-center">
      <div  class="left-page"></div>
      <div class="page">
        <div class="bg-white pt-56 full-page">
          <SeoMeta 
              :title="'Kalkulator Zakat '+config.public.appName"
              :sitename="config.public.siteName"
              :description="config.public.appDescription"
              :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
              :url="config.public.baseAppUrl + 'kalkulator-zakat'" />
          <HomeHeaderWhite />
          <ZakatTabs />
          <div class="px-3">
            <div class="text-bold">Apakah Wajib Zakat?</div>
            <div class="card-grey p-2">
              <div class="text-success" :class="{'wajib-zakat' : wajibZakat}">{{ wajibZakatText }}</div>
            </div>
           
            <div class="text-center py-2">
              <div class="text-bold">Total Zakat {{ jenisZakat }} se {{ mode_zakat }}</div>
              <div class="text-bold text-green text-18 text-bold" >{{ wajibZakat ? $formatRupiah(totalZakat) :$formatRupiah(0)  }}</div>
            </div>
            <div class="text-center" v-if="!wajibZakat && totalZakat > 0">
              {{ jenisZakat }} anda belum mencapai nishab, anda tetap bisa menyempurnakan niat baik dengan bersedekah
            </div>
            <div class="">
              <nav class="navbar navbar-dark bg-white navbar-expand align-items-center" id="bottom-bar">
                  <div class="mx-1">
                    <button class="btn btn-share w-100" @click="shareIt">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.87417 12.3841L14.135 16.0325M14.1258 5.96748L7.87417 9.61581M19.25 4.58331C19.25 6.1021 18.0188 7.33331 16.5 7.33331C14.9812 7.33331 13.75 6.1021 13.75 4.58331C13.75 3.06453 14.9812 1.83331 16.5 1.83331C18.0188 1.83331 19.25 3.06453 19.25 4.58331ZM8.25 11C8.25 12.5188 7.01878 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.4812 3.98122 8.24998 5.5 8.24998C7.01878 8.24998 8.25 9.4812 8.25 11ZM19.25 17.4166C19.25 18.9354 18.0188 20.1666 16.5 20.1666C14.9812 20.1666 13.75 18.9354 13.75 17.4166C13.75 15.8979 14.9812 14.6666 16.5 14.6666C18.0188 14.6666 19.25 15.8979 19.25 17.4166Z" stroke="#0D9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div class="mx-1 flex-grow-1">
                    <button class="nav-link px-0 text-center btn btn-checkout-donasi w-100" v-if="wajibZakat" :class="{ disabled : disabledButton}" :disabled="disabledButton" @click="bayarZakat">
                      <div class="text-center">Tunaikan Sekarang</div>
                    </button>
                    <button class="nav-link px-0 text-center btn btn-checkout-donasi w-100" v-else @click="sedekahSekarang">
                      <div class="text-center">Sedekah Sekarang</div>
                    </button>
                  </div>
              </nav>
              <div class="text-center text-sm error">{{ errorMessage }}</div>
            </div>
            <ZakatNishab />
          </div>
          <div class="bottom-bar d-flex justify-content-center">
            
          </div>
          <WidgetShareMedia :data="null" />
        </div>
        <div class="bottom-footer bg-white"></div>
        <Footer ></Footer>
        <CopyRight :needShow="true"/>
        <BottomNavBar :page="'kalkulator'"/>
      </div>
      <div  class="right-page"></div>
   </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useZakatStore } from "@/stores/zakat";
const config = useRuntimeConfig();
const {$getMetaScript,$shareIt} = useNuxtApp()
const router = useRouter();
const route = useRoute()
const { $bus } = useNuxtApp();
const zakatStore  = useZakatStore();
const disabledButton = ref(true);
const mode_zakat = ref('tahun');
const totalZakat = ref('0');
const wajibZakat = ref(false)
const jenisZakat = ref('Penghasilan')
const wajibZakatText = ref('Tidak Wajib Membayar Zakat');
const hargaEmas = ref(zakatStore.getHargaEmas);
const errorMessage = ref('');
const { data, status } = await $fetch(`${config.public.baseUrl}front-end/harga-emas`,{
    method:'POST',
    lazy: true
  })
if(status == 1){
  zakatStore.setHargaEmas(data);
  hargaEmas.value = data;
}
const bayarZakat = ()=>{
  const zakat = {
    jenis:jenisZakat.value,
    total:totalZakat.value,
    mode:mode_zakat.value
  }
 
  $fetch(`${config.public.baseUrl}front-end/campaign-zakat`,{
    method:'POST',
    body:{
      jenis_zakat:jenisZakat.value
    },
    lazy: true
  }).then(response=>{
      if(response.status == 1){
        zakatStore.setZakat(zakat);
        zakatStore.setCurrentZakat(totalZakat.value);
        navigateTo('/campaign/' + response.data.slug +'?reference=zakat');
      }else{
        errorMessage.value = response.message;
      }
  }).catch(err=>{
    console.log(err);
  })
  //router.push({path:'checkout/'})
}

const sedekahSekarang = ()=>{
  router.push({
    path:'/program'
  })
}
onMounted(()=>{
  if(route.query !== undefined){
    let referral = route.query.referral;
    if(referral !== undefined){
      window.history.replaceState({},'',`?referral=`+referral);
    }
  }
  $bus.$on('event-zakat',(data)=>{
    
    if(hargaEmas.value > 0){
      wajibZakat.value =  data.total > (hargaEmas.value * 85);
      console.log("Wajib Zakat",wajibZakat.value);
    }
    wajibZakatText.value = wajibZakat.value ? 'Wajib membayar Zakat':'Tidak Wajib Membayar Zakat';
    totalZakat.value = data.total * (2.5 / 100);
    disabledButton.value = !wajibZakat.value
    if(data.mode_zakat !== undefined){
      mode_zakat.value = data.mode_zakat;
      if(mode_zakat.value == 'bulan'){
        totalZakat.value = Math.ceil(totalZakat.value / 12);
      }
    }
  })
  $bus.$on('tabActivate',(data)=>{
    totalZakat.value = 0;
    wajibZakat.value = false;
    wajibZakatText.value = 'Tidak Wajib Membayar Zakat';
    disabledButton.value = true;
    jenisZakat.value = data.tab.value
  })
  $bus.$on('share-media',(data)=>{
    shareMedia(data);
  })
  
})

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
function shareIt(){
  $bus.$emit('toggle-bottom-bar')
}
useSeoMeta({
    title: 'Kalkulator Zakat',
    ogTitle: 'Kalkulator Zakat',
    description:config.public.appDescription,
    ogDescription: config.public.appDescription,
    ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
    twitterCard: 'summary_large_image',
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
  
</script>

<style>
  .left-page{
    width: 0;
  }
.right-page{
  width: 480px;
  margin-right:-480px;
  z-index:2;
  background-color: #eef2f1;
}
</style>