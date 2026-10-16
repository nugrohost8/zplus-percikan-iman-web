<template>
    <div class="px-3">
        <div class="mb-2" v-for="(donasi,index) in donationsData" :key="index">
            <nuxt-link :to="'/campaign/'+donasi.campaign?.slug">
                <div class="">
                    <div class="row">
                        <div class="col-4 min-h-100">
                            <nuxt-img  preload loading="lazy" :src="STORAGE_URL + donasi.campaign?.thumbnail" class="w-100 rounded1sm" :alt="donasi.campaign?.title"></nuxt-img>
                        </div>
                        <div class="col-8 p-0 p-relative">
                            <div class="min-h-100 d-flex flex-column">
                                <div class="text-start text-w600 pe-4 t-elipsize elipsize-2">{{ donasi.campaign?.title }}</div>
                                <div class="text-start flex-grow-1 text-bold text-brown">{{ $formatRupiah(donasi.nominal) }}</div>
                                <div class="d-flex justify-content-between text-sm text-half-bl">
                                    <div>{{ $formatDate(donasi.created_at) }}</div>
                                    <div class="me-3">{{ donasi.status == 1 ? 'Lunas' : 'Pending' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nuxt-link>
            <hr />
        </div>

        <infinite-loading v-if="hasNextPage && requestNextPage" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
        <div class="text-center" v-else>
            <button v-if="hasNextPage" class="btn btn-sm btn-default" @click="loadMore">Lebih banyak</button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        donations:Array
    })
    import {useDonaturStore} from "@/stores/donatur";
    const config = useRuntimeConfig();
    const STORAGE_URL = config.public.storageUrl;
    const hasNextPage = ref(true);
    const page = ref(1);
    const per_page = 10;
    const requestNextPage = ref(false);
    const donationsData = props.donations;
    const donaturStore = useDonaturStore();
    const donatur = ref(null);
    function infiniteScroll(state) {
        hasNextPage.value = true;
        page.value++;
        setTimeout(() => {
            $fetch(`${config.public.baseUrl}my-donations`, {
                method: "post",
                body: {
                    page: page.value,
                    donatur_id: donatur.value.id
                },
            }).then((response) => {
                response.data.donasi.forEach((item) => {
                    donationsData.push(item);
                });
                if (response.data.length < per_page) {
                hasNextPage.value = false;
                }
                requestNextPage.value = false;
            });
        }, 1000);
    }
    onMounted(()=>{
        donatur.value = donaturStore.donaturObj;
        if(donationsData.length < per_page){
            hasNextPage.value = false;
        }
    })
    const loadMore = ()=>{
        requestNextPage.value = true;
    }
</script>

<style>

</style>