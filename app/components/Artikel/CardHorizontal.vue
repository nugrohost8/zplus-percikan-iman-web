<template>
    <div class="shadow-green mb-3">
        <div  class="">
            <div class="row justify-content-start">
                    <div class="col-4  px-2">
                        <iframe v-if="artikel.link_video !== null" :src="artikel.link_video" title="YouTube video player" frameborder="0" class="iframe-video" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                        <nuxt-img v-else preload loading="lazy" :src="STORAGE_URL + artikel.thumbnail" class="w-100 min-h-100 rounded1sm" :alt="artikel.title"></nuxt-img>
                    </div>
                    <div class="col-8 px-2">
                        <div class="min-h-100 d-flex flex-column">
                            <div class="text-sm text-bold t-elipsize elipsize-2">{{ artikel.title }}</div>
                            <div class="text-sm t-elipsize elipsize-2 flex-grow-3">{{ artikel.description }}</div>
                            
                        </div>
                    </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-6 text-10 text-secondary">
                    <i class="bx bx-user text-12"></i>{{ config.public.appName }}
                </div>
                <div class="col-6 text-10 text-half-bl">
                    <i class="bx bx-calendar"></i>{{ $formatDate(artikel.created_at) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const STORAGE_URL = config.public.storageUrl;
const props = defineProps({
      artikel: Object
    })
</script>

<style>

</style>