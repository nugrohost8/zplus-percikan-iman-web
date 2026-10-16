<template>
    <div class="bg-white p-3" v-if="campaign !== null" >
        <div class="text-bold text-16 mb-5 t-elipsize elipsize-2">{{ campaign.title }}</div>
        <div class="post-progress-wrapper p-relative">
            <div class="post-progress-wrapper">
                <div class="progress post-progress">
                    <div class="progress-bar" role="progressbar" :data-value-now="campaign.progress" data-show-label="true" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="campaign.progress" :style="'width:'+ campaign.progress+'%;'">
                        <div v-if="campaign.progress > 0" class="progress-label text-sm">{{campaign.progress}}%</div></div>
                </div>
            </div>
        </div>

        <div class="d-flex my-2 justify-content-between align-items-center">
            <div class=""><span class="text-green text-16 text-w400"> {{ $formatRupiah(campaign.jumlah_donasi) }}</span> <span class="mx-1">terkumpul dari</span></div>
            <div class="text-sm"><b>{{ target() }}</b></div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    campaign:Object,
  })
  const {$formatRupiah} = useNuxtApp()
  const target = ()=>{
    let targetDonasi = props.campaign.target;
    if(targetDonasi == 0){
        return 'Tidak Terbatas';
    }
    return $formatRupiah(targetDonasi)
  }
</script>

<style>

</style>