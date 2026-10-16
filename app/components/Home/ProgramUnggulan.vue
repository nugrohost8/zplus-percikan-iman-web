<template>
  <div  class="bg-white p-3">
        <div class="header-text my-3">
          <span class="text-16 text-bold">Rekomendasi Program</span>
        </div>
        <div v-if="campaigns.length > 0">
            <HomeCampaign :campaigns="campaigns" />
            <div class="text-center mt-3">
                <NuxtLink :to="'/program'" class="btn btn-default text-sm bg-green card-radius text-bold btn-selengkapnya">Lihat Semua Program</NuxtLink>
            </div>
        </div>
        <WidgetEmptyData v-else />
      
  </div>
</template>

<script setup>
const props = defineProps({
    campaigns: Array
  })
</script>

<style>
   
</style>