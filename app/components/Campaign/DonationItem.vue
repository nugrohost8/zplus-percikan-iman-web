<template>
    <div>
        <div class="d-flex align-items-center">
            <SvgAccount class="me-2"/>
            <div class="w-100">
                <div class="text-w400 text-half-bl">{{ $formatDate(donation.created_at) }}</div>
                <div class="row">
                    <div class="col-8 text-bold">{{ donation.hide_user == 0 ?donation.donatur?.nama_lengkap : 'Hamba Allah' }}</div>
                    <div class="col-4 text-bold text-end">{{ $formatRupiah(donation.nominal) }}</div>
                </div>
                 
            </div>
            
        </div>
       <CampaignDoa v-if="donation.doa" :doa="donation.doa" />
        <hr class="bg-secondary" />
    </div>
</template>

<script setup>

    const props = defineProps({
        donation:Object
    })
   
    const {donation} = props;
   
</script>

<style scoped>
    
</style>