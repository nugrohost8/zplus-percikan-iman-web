<template>
  <div class="card card-radius mb-2">
    <div class="card-body p-3">
        <div class="d-flex">
            <iframe v-if="result.type_data == 'artikel' && result.link_video !== null" :src="result.link_video" title="YouTube video player" frameborder="0" class="w-30 aspect53" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> 
            </iframe>
            <NuxtImg v-else :src="STORAGE_URL + result.thumbnail" class="w-30" preload loading="lazy" placeholder="/images/no-image.png"></NuxtImg>
            <div class="d-flex flex-column min-h-100 px-2">
              <div class="text-bold t-elipsize elipsize-2 flex-grow-1">{{ result.title }}</div>
              <div class="t-elipsize elipsize-2">{{ result.description }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const STORAGE_URL = config.public.storageUrl;
    const props = defineProps({
        result:Object
    })
</script>

<style>

</style>