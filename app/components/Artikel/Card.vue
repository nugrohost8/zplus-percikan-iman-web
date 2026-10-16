<template>
    <div class="card w-100 min-h-100 card-radius card-shadow">
       
            <iframe v-if="artikel.link_video !== null" :src="artikel.link_video" title="YouTube video player" frameborder="0" class="iframe-video campaign-img" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
            <nuxt-link v-else  :to="'/artikel/'+artikel.slug" class="w-100 min-h-100">
                <nuxt-img preload loading="lazy" :src="STORAGE_URL + artikel.thumbnail" class="w-100 campaign-img" :alt="artikel.title" ></nuxt-img>
            </nuxt-link>
            <div class="card-body pb-2 ">
                <div class="d-flex flex-column justify-content-between text-start">
                    <div class="text-bold text-green mb-2">{{ artikel.type == 'artikel' ? "Artikel" : 'Pembaharuan' }}</div>
                    <div class="text-bold text-18 text-start t-elipsize elipsize-2 min-h-48px mb-2 flex-grow-1">{{ artikel.title }}</div>
                    <div class="text-w400 t-elipsize elipsize-2 min-h-36px" v-if="!hideDescription">{{ artikel.description }}</div>
                    <div class="row justify-content-center mt-3">
                        <div class="col-6 text-10 text-secondary">
                            <i class="bx bx-user"></i>{{ config.public.appName }}
                        </div>
                        <div class="col-6 text-10 text-half-bl">
                            <i class="bx bx-calendar"></i>{{ $formatDate(artikel.created_at) }}
                        </div>
                       
                    </div>
                </div>
            </div>
       
    </div>
</template>

<script setup>


     const props = defineProps({
        artikel: Object,
        hideDescription:{
            type:Boolean,
            default:false
        }
    })
    const { $formatDate } = useNuxtApp();
    const config = useRuntimeConfig();
    const STORAGE_URL = config.public.storageUrl;
</script>

<style>

</style>