<template>
  <div class="p-3 bg-white" v-if="donations.length > 0">
    <div class="header-text mb-3">
      <span class="text-16 text-bold">Donasi</span>
    </div>
    <div v-for="(donasi, index) in donations" :key="index">
      <CampaignDonationItem :donation="donasi" />
    </div>
    <infinite-loading v-if="hasNextPage && requestNextPage" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
    <div class="text-center" v-else>
      <button v-if="hasNextPage" class="btn btn-sm btn-default" @click="loadMore">Lebih banyak</button>
    </div>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();
  const props = defineProps({
    campaign:Object,
    donations:Array,
  });
  import { useDonaturStore } from "@/stores/donatur";
  const donaturStore = useDonaturStore();
  const { campaign,donations} = props;
  const { $bus} = useNuxtApp();
  const numRows = ref(0)
  const per_page = 10;
  const page = ref(1);
  const hasNextPage = ref(false);
  const requestNextPage = ref(false);
  if(campaign.count_donation > per_page ){
      hasNextPage.value = true;
    }
  const hit = ref(false);
  const timeout = ref();
  const likeToSubmit = ref([]);
  function infiniteScroll(state) {
    hasNextPage.value = true;
    page.value++;
    setTimeout(() => {
      $fetch(`${config.public.baseUrl}donations/${campaign.id}`, {
        method: "post",
        body: {
          page: page.value
        },
      }).then((response) => {
        console.log("Response",response);
        response.data.forEach((item) => {
          donations.push(item);
        });
        if (response.data.length < per_page) {
          hasNextPage.value = false;
        }
        requestNextPage.value = false;
      });
    }, 1000);
  }

  const loadMore = ()=>{
    requestNextPage.value = true;
  }

</script>

<style></style>