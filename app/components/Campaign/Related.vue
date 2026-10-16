<template>
  <div class="p-3 bg-white">
    <div class="header-text mb-3">
        <span class="text-16 text-bold">Program Terkait</span>
    </div>
    <div class="row" v-if="related.length > 0">
        <div class="col-6 mb-2" v-for="(campaign,index) in related" :key="index" :class="index% 2 == 0 ? 'pe-1' : 'ps-1'">
            <CampaignRelatedItem :campaign="campaign" />
        </div>
    </div>
    <div class="text-center">
        <NuxtLink :to="'/program'" class="btn btn-sm btn-default border-1 card-radius text-green text-sm px-3 btn-view-all" data-label="Selengkapnya">Lihat Semua</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    related:Array
})
</script>

<style>

</style>