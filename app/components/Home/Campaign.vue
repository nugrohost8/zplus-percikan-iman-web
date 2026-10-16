<template>
     <div class="row">
        <div class="col-6 mb-2" v-for="(campaign,index) in campaigns" :key="campaign.campaign_id" :class="index% 2 == 0 ? 'pe-1' : 'ps-1'">
          <nuxt-link :to="'/campaign/'+campaign.slug" class="w-100 min-h-100">
            <CampaignCard :campaign="campaign" />
          </nuxt-link>
        </div>
     </div>
</template>

<script setup>
const props = defineProps({
    campaigns: Array
  })
  
</script>

<style>

</style>