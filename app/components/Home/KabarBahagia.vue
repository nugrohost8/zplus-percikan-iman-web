<template>
  <div class="p-3">
    <div class="header-text mb-3">
        <span class="text-16 text-bold">Berita & Artikel Terkini</span>
    </div>
    <div class="row">
        <div class="col-5 pe-2">
            <NuxtLink :to="'/artikel/'+firstArtikel.slug" v-if="firstArtikel !=null">
                <div class="card border-0 mt-1" >
                    <NuxtImg preload loading="lazy" :src="STORAGE_URL + firstArtikel.thumbnail" :alt="firstArtikel.title" />
                    <div class="text-sm text-bold t-elipsize elipsize-3 my-2">{{ firstArtikel.title }}</div>
                    <div class="text-xs text-gray t-elipsize elipsize-3 ">{{ firstArtikel.description }}</div>
                    <div class="text-10 text-half-bl mt-2">
                        <i class="bx bx-calendar"></i>{{ $formatDate(firstArtikel.created_at) }}
                    </div>
                </div>
            </NuxtLink>
        </div>
        <div class="col-7 ps-2">
            <div v-for="artikel in nextArtikel" class="mb-1" :key="artikel.id">
                <NuxtLink :to="'/artikel/'+artikel.slug">
                    <div class="row">
                        <NuxtImg preload loading="lazy" :src="STORAGE_URL + artikel.thumbnail" :alt="artikel.title" class="col-5 p-1 object-fit-cover"/>
                        <div class="col-7 ps-1">
                            <div class="text-sm text-bold t-elipsize elipsize-2 ">{{ artikel.title }}</div>
                            <div class="text-xs text-gray t-elipsize elipsize-3 ">{{ artikel.description }}</div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div class="text-center mt-3">
        <NuxtLink :to="'/kabar-bahagia'" class="btn btn-default text-sm bg-green card-radius text-bold btn-selengkapnya px-3">Lihat Semua Berita</NuxtLink>
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
        artikels: Array,
        videos: Array
    })
    const videos = props.videos;
    const firstArtikel = ref(null);
    const nextArtikel = ref([]);
    const config = useRuntimeConfig();
    if(props.artikels.length > 0){
        firstArtikel.value = props.artikels[0];
        nextArtikel.value = props.artikels.slice(1)
    }
    const STORAGE_URL = config.public.storageUrl;
    watch(()=>props.artikels,(newValue)=>{
        if(newValue.length > 0){
            firstArtikel.value = newValue[0];
            nextArtikel.value = newValue.slice(1)
        }
        console.log("Artikel Prop",newValue);
    },{deep:true})
    
</script>

<style>

</style>