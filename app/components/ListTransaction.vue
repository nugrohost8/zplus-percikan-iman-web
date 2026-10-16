<template>
    <div class="px-3">
        <div class="mb-2" v-for="(transaksi,index) in transactionData" :key="index">
            <div class="p-relative">
                <div class="min-h-100 d-flex flex-column">
                    <div class="d-flex justify-content-between">
                        <div class="text-start text-w600">Order ID</div>
                        <div class="text-start text-w600">{{ transaksi.order_id }}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="text-start flex-grow-1 text-bold text-brown">Nominal</div>
                        <div class="text-end flex-grow-1 text-bold text-brown">{{ $formatRupiah(transaksi.gross_amount) }}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>Batas Pembayaran</div>
                        <div>{{ $formatDate(transaksi.expiration_time) }}</div>
                    </div>
                    <div class="pt-3 text-center">
                        <nuxt-link :to="new Date(transaksi.expiration_time) > new Date() ? '/pembayaran?order_id='+ transaksi.order_id + '&payment_link='+transaksi.payment_link: ''" v-if="new Date(transaksi.expiration_time) > new Date()" 
                            class="btn btn-sm card-radius text-13 px-4 text-info border-info">Selesaikan Pembayaran</nuxt-link>
                        
                    </div>
                </div>
            </div>
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
        transactions:Array
    })
    import {useDonaturStore} from "@/stores/donatur";
    const config = useRuntimeConfig();
    const STORAGE_URL = config.public.storageUrl;
    const hasNextPage = ref(true);
    const page = ref(1);
    const per_page = 10;
    const requestNextPage = ref(false);
    const transactionData = props.transactions;
    const donaturStore = useDonaturStore();
    const donatur = ref(null);
    function infiniteScroll(state) {
        hasNextPage.value = true;
        page.value++;
        setTimeout(() => {
            $fetch(`${config.public.baseUrl}front-end/my-transactions`, {
                method: "post",
                body: {
                    page: page.value,
                    donatur_id: donatur.value.id
                },
            }).then((response) => {
                response.data.donasi.forEach((item) => {
                    transactionData.push(item);
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
        if(transactionData.length < per_page){
            hasNextPage.value = false;
        }
      
    })
    const loadMore = ()=>{
        requestNextPage.value = true;
    }
</script>

<style>

</style>