<template>
  <div class="d-flex justify-content-center">
        <div class="page">
            <HomeHeaderWhite />
            <div class="pt-56 bg-white  full-page ">
                <div class="program-unggulan p-4">
                    <div class="header-text">
                        <span class="text-bold">Pendaftaran Fundraiser</span>
                    </div>
                </div>
                <CampaignFundraiserForm :kokab="kota" :gerais="gerais" :kantors="kantors" />
            </div>
        </div>
    </div>
</template>

<script setup>
 const config = useRuntimeConfig();
 const kota = ref([]);
 const gerais = ref([]);
 const kantors = ref([]);
 /*
const { data,status } = await $fetch(`${config.public.baseUrl}data-kokab`,{
      method:'POST',
      lazy: true
    })
    if(status ==1){
      kota.value = data.kokab;
      gerais.value = data.gerai;
      kantors.value = data.kantors;
    }
*/
</script>

<style>

</style>