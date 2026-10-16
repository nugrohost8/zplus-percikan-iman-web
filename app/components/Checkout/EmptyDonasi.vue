<template>
  <div class="pt-56 bg-soft-grey">
    <div class="p-3">
      <div class="text-center">
        <SvgCartEmpty />
      </div>
      <div class="my-3 text-center text-16">Sahabat, keranjang kebaikan Anda masih kosong!</div>
      <div class="my-4 text-center">
        <nuxt-link :to="'/program'" class="btn btn-donate text-sm">Yuk, Tambah Sekarang</nuxt-link>
      </div>
    </div>

    <div class="bg-white p-3">
        <div class="text-center mb-4">Atau Pilih Program Unggulan Kami</div>
        <div class="row">
          <div class="col-6 mb-2" v-for="(campaign,index) in campaigns" :key="index" :class="index% 2 == 0 ? 'pe-1' : 'ps-1'">
            <nuxt-link :to="'/campaign/'+campaign.slug" class="text-decoration-none">
              <CampaignCard :campaign="campaign" />
            </nuxt-link>
        </div>
        </div>
    </div>
    <div class="bottom-footer"></div>
  </div>
</template>

<script setup>
 const props =  defineProps({
    campaigns:Array
 })
</script>

<style>

</style>