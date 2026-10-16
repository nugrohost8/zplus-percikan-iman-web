<template>
  <div class="bg-white">
    <ul class="d-flex justify-content-center py-0 px-3" role="tablist" id="tab-laporan">
        <button type="button" class="btn btn-tab-campaign me-1 flex-grow-1" :class="{ 'active' : tabActive == 'detail'}" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-pembaharuan" aria-controls="navs-pills-justified-pembaharuan" aria-selected="true" @click="setActive('detail')">
            Detail
        </button>
        <button type="button" class="btn btn-tab-campaign mx-1 flex-grow-1" :class="{ 'active' : tabActive == 'update'}" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-penyaluran" aria-controls="navs-pills-justified-penyaluran" aria-selected="false" @click="setActive('update')">
            Update
        </button>
        <button type="button" class="btn btn-tab-campaign ms-1 flex-grow-1" :class="{ 'active' : tabActive == 'donatur'}" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-penyaluran" aria-controls="navs-pills-justified-penyaluran" aria-selected="false" @click="setActive('donatur')">
            Donasi {{ campaign.donations.length }}
        </button>
    </ul>
    <div class="tab-content px-0 pt-0 pb-5">
        <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'detail'}" id="navs-pills-justified-pembaruan" role="tabpanel">
            <div class="description p-3 text-justify text-sm" :class="{ 'description-collapse' : collapse}" v-html="campaign.content" ref="descriptionRef"></div>
            <div class="text-center" v-show="shouldShow">
                <button class="btn btn-sm btn-default" @click="toggleCollapse">{{ collapseText }}</button>
            </div>
        </div>
        <div class="tab-pane fade px-3" :class="{ 'active show' : tabActive == 'update'}" id="navs-pills-justified-penyaluran" role="tabpanel">
            <div v-if="campaign.pembaruan.length > 0" class="p-3 update-div">
                <div v-for="(update,index) in campaign.pembaruan" :key="index" class="mb-3">
                    <NuxtLink :to="'/update/'+update.slug">
                        <div class="update-node">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6.5" cy="6.5" r="6.5" fill="#0D9000"/>
                            </svg>
                            <div class="text-bold text-sm mb-2 ms-2">{{ $formatDate(update.created_at) }}</div>
                        </div>
                        <div  class="text-bold">{{ update.title }}</div>
                        <div class="">{{ update.description }}</div>
                    </NuxtLink>
                </div>
            </div>
            <WidgetEmptyData v-else />
        </div>
        <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'donatur'}" id="navs-pills-justified-penyaluran" role="tabpanel">
            <CampaignDonatur :campaign="campaign" :donations="campaign.donations"  v-if="campaign.donations.length > 0"/>
            <WidgetEmptyData v-else />
        </div>
    </div>
  </div>
</template>
<script setup>
 const prop = defineProps({
    campaign:Object,
    require:true
})
const tabActive = ref('detail')
const collapse = ref(false)
const descriptionRef = ref(null);
const shouldShow = ref(false);
const collapseText = ref('Selengkapnya');
function setActive(val){
    tabActive.value = val;
}
function toggleCollapse(){
    collapse.value = !collapse.value;
    if(collapse.value){
         collapseText.value = "Selengkapnya"
       
    }else{
        collapseText.value = "Lebih Sedikit"
    }
}
onMounted(()=>{
    let height = descriptionRef.value.clientHeight;
    if(!isNaN(height)){
        if(height > 340){
            collapse.value = true;
            shouldShow.value = true;
        }
    }
    //console.log(descriptionRef.value.$el.clientHeight)
})
</script>

<style>

</style>