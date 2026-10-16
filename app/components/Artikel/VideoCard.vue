<template>
    <div class="card w-100 min-h-100 card-radius">
        <iframe v-if="artikel.link_video !== null" :src="artikel.link_video" title="YouTube video player" frameborder="0" class="iframe-video card-radius" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>
</template>

<script setup>
     const props = defineProps({
        artikel: Object
    })
    const { $formatDate } = useNuxtApp();
    const config = useRuntimeConfig();
    const STORAGE_URL = config.public.storageUrl;
</script>

<style>

</style>