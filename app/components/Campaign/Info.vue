<template>
    <div class="p-3 bg-white">
        <div class="header-text mb-3">
          <span class="text-16 text-bold">Info Terbaru</span>
        </div>
        <div v-if="pembaruans?.length > 0" class="p-3 update-div">
            <div v-for="(update,index) in pembaruans" :key="index" class="mb-3">
                <NuxtLink :to="'/update/'+update.slug">
                    <div class="update-node">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6.5" cy="6.5" r="6.5" :fill="config.public.secondaryColor"/>
                        </svg>
                        <div class="text-bold text-sm mb-2 ms-2">{{ $formatDate(update.created_at) }}</div>
                    </div>
                    <div  class="text-bold">{{ update.title }}</div>
                    <div class="">{{ update.description }}</div>
                </NuxtLink>
            </div>
            <div class="text-center">
                <button v-if="hasNextPage" class="btn btn-sm btn-default" @click="loadMore">Lebih banyak</button>
            </div>
        </div>
        <WidgetEmptyData v-else />
    </div>
</template>

<script setup>
    const props = defineProps({
        campaign:Object,
    })
    const config = useRuntimeConfig();
    const pembaruans = ref([]);
    const page = ref(1);
    const paginateArray = (array, pageSize, pageNumber) =>{
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return array.slice(startIndex, endIndex);
    }
    const hasNextPage = ref(false);
    const loadMore = ()=>{
        let updates = props.campaign?.pembaharuan;
        let pageSize = Math.ceil(updates.length / 10);
        page.value++;
        pembaruans.value.push(...paginateArray(updates,10,page.value));
        hasNextPage.value = page.value < pageSize;
    }
    onMounted(()=>{
        let updates = props.campaign?.pembaharuan;
        let pageSize = Math.ceil(updates.length / 10);
        pembaruans.value = paginateArray(updates,10,1);
        hasNextPage.value = page.value < pageSize;
    })
    watch(()=>props.campaign,(newValue)=>{
        console.log("Campaign",newValue);
        
    })
</script>

<style>

</style>