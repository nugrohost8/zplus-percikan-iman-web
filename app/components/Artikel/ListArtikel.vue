<template>
  <div>
    <div v-if="data.length > 0">
        <div v-for="(artikel,index) in data" :key="index">
            <NuxtLink :to="'/artikel/'+artikel.slug">
                <ArtikelCardHorizontal :artikel="artikel" />
            </NuxtLink>
            <hr />
        </div>
        <infinite-loading v-if="hasNextPage && requestNextPage" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
        <div class="text-center" v-else>
            <button v-if="hasNextPage" class="btn btn-sm btn-default" @click="loadMore">Lebih banyak</button>
        </div>
    </div>
    <WidgetEmptyData v-else />
  </div>
</template>

<script setup>
    import {useArtikelStore} from "@/stores/artikel";
    const artikelStore = useArtikelStore();
    const props = defineProps({
        category:String,
        data:Array,
    })
    const config = useRuntimeConfig();
    const per_page = 10;
    const hasNextPage = ref(true);
    const page = ref(1);
    const requestNextPage = ref(false);
    const { category,data} = props;
    if(data.length < per_page){
        hasNextPage.value = false;
    }
    const loadMore = ()=>{
        requestNextPage.value = true;
    }
    function infiniteScroll(state){
        hasNextPage.value = true;
        page.value ++;
        setTimeout(() => {
            $fetch(`${config.public.baseUrl}artikels`, {
                method: 'post',
                body: {page:page.value,type:category}
            }).then((response)=>{
                if(response.status == 1){
                    response.data.artikels.forEach(item=>{
                        data.push(item);
                    })
                    if(response.data.artikels.length < per_page){
                        hasNextPage.value = false;
                    }
                    requestNextPage.value = false;
                }
            })
        }, 1000);
    
    }
    onBeforeRouteLeave(() => {
        if(data.length > 12){
            artikelStore.setPrevState(useRoute().path)
            artikelStore.setHasNextPage(hasNextPage.value)
            artikelStore.setCurrentPage(page.value)
            artikelStore.setArtikels(data)
        }
      
    })
    onMounted(() => {
        if(artikelStore.getPrevState !== null){
            page.value = artikelStore.getCurrentPage;
            hasNextPage.value = artikelStore.getHasNextPage;
        }
    });
</script>

<style>

</style>