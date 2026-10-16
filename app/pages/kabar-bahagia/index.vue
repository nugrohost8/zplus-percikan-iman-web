<template>
    <div class="d-flex justify-content-center">
        <div class="page">
            <SeoMeta 
                :title="'Kabar Bahagia'"
                :sitename="config.public.siteName"
                :description="'Berita & Artikel Terkini'"
                :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
                :url="config.public.baseAppUrl + 'kabar-bahagia'" />
            <HomeHeaderWhite />
            <div class="pt-56 bg-white  full-page ">
                <div class="program-unggulan p-3">
                    <div class="header-text">
                        <span class="text-16 text-bold">Berita & Artikel Terkini</span>
                    </div>
                   
                </div>
                <ArtikelCarousel :artikels="highlight" />
                <div class="p-3">
                    <ul class="d-flex justify-content-center py-0 px-3" role="tablist" id="tab-laporan">
                        <button type="button" class="btn btn-sm btn-tab-campaign me-1 flex-grow-1" :class="{ 'active' : tabActive == 'semua'}" role="tab" @click="setActive('semua')">
                            Semua
                        </button>
                        <button type="button" class="btn btn-sm btn-tab-campaign mx-1 flex-grow-1" :class="{ 'active' : tabActive == 'artikel'}" role="tab"  @click="setActive('artikel')">
                            Artikel
                        </button>
                        <button type="button" class="btn btn-sm btn-tab-campaign ms-1 flex-grow-1" :class="{ 'active' : tabActive == 'pembaruan'}" role="tab"  @click="setActive('pembaruan')">
                            Pembaruan
                        </button>
                    </ul>
                    <div class="tab-content px-0 pt-0 pb-5">
                        <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'semua'}" id="navs-pills-justified-pembaruan" role="tabpanel">
                            <ArtikelListArtikel :data="artikels" :category="''" />
                        </div>
                        <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'artikel'}" id="navs-pills-justified-pembaruan" role="tabpanel">
                            <ArtikelListArtikel :data="artikelOnly" :category="'artikel'" />
                        </div>
                        <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'pembaruan'}" id="navs-pills-justified-pembaruan" role="tabpanel">
                            <ArtikelListArtikel :data="pembaharuan" :category="'pembaruan'" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            <CopyRight :needShow="true"/>
            
            <BottomNavBar :page="'artikel'"/>
        </div>
    </div>
</template>

<script setup>
    import {useArtikelStore} from "@/stores/artikel";
    const artikelStore = useArtikelStore();
    const config = useRuntimeConfig();
    const { $getMeta,$getMetaScript} = useNuxtApp();
    const route = useRoute();
    const artikels = ref([]);
    const highlight = ref([]);
    const numRows = ref(0)
    const per_page = ref(0)
    const hasNextPage = ref(false);
    const tabActive = ref('semua');
    const artikelOnly = ref([]);
    const pembaharuan = ref([]);

    const { data, status} = await $fetch(`${config.public.baseUrl}front-end/artikels`,{
            method:'POST',
            lazy: true
        })
    if(status == 1){
        console.log(data);
        if(artikelStore.getPrevState == null){
            numRows.value = data.total_rows
            per_page.value = data.per_page

            artikels.value = data.artikels
            highlight.value = data.highlight
            if(artikels.value.length < per_page.value){
                hasNextPage.value = false;
            }
            if(artikels.value.length > 0){
                artikelOnly.value = artikels.value.filter(item=>{
                    return item.type == 'artikel';
                })
                pembaharuan.value = artikels.value.filter(item=>{
                    return item.type == 'pembaharuan';
                })
            }
        }else{
            console.log("Artiokels",artikelStore.listArtikel)
            artikels.value = artikelStore.listArtikel
        }
    }
    const setActive = (tab)=>{
        tabActive.value = tab
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
          href: config.public.baseAppUrl + 'kabar-bahagia'
        }
      ],
      script: $getMetaScript({
        url: config.public.baseAppUrl + 'kabar-bahagia',
        title: 'Kabar Bahagia ' +config.public.appName,
        description: 'Kabar Bahagia ' + config.public.appDescription
      })
 })
  useSeoMeta({
    title:'Kabar Bahagia ' +config.public.appName,
    description:config.public.appDescription,
    ogImage: config.public.baseAppUrl +'assets/icons/icon-512x512.png',
    ogUrl:config.public.baseAppUrl + 'kabar-bahagia',
    ogTitle: 'Kabar Bahagia ' + config.public.appName,
    ogDescription: config.public.appDescription
 })
  
</script>

<style>

</style>