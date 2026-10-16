<template>
    <div>
        <div  class="text-w400 text-16 mb-3">Keranjang Donasi</div>
        <div class="card card-shadow mb-2" v-for="cart in cartStore.listOfCart" :key="cart.campaign_id">
            <nuxt-link :to="'/donasi/detail-cart?id='+cart.id">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-4 min-h-100">
                            <nuxt-img  preload loading="lazy" :src="STORAGE_URL + cart.thumbnail" class="w-100 rounded1sm" :alt="cart.title"></nuxt-img>
                        </div>
                        <div class="col-8 ps-0 p-relative">
                            <div class="min-h-100 d-flex flex-column">
                                <div class="text-sm pe-4 flex-grow-1 t-elipsize elipsize-2">{{ cart.title }}</div>
                                <div class="text-10 text-half-bl">Jumlah: {{ cart.quantity }}</div>
                                <div class="text-bold text-green">{{ cart.total_nominal !== undefined ? $formatRupiah(cart.total_nominal.toString().replaceAll('.','')) : '' }}</div>
                                
                            </div>
                           
                        </div>
                    </div>
                </div>
            </nuxt-link>
            <button type="button" class="btn btn-sm btn-default btn-del-cart rounded-50 border-green" @click="removeCart(cart.id)" aria-label="Remove Cart">
                <i class='bx bxs-x-circle text-quarter-bl' ></i>
            </button>
        </div>
       
    </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
const config = useRuntimeConfig();
const STORAGE_URL = config.public.storageUrl;
const { $formatRupiah,$bus } = useNuxtApp();
const cartStore = useCartStore();
const totalDonasi = ref(0);
totalDonasi.value = cartStore.totalDonasi;

function removeCart(id){
    $bus.$emit('removeCart',id);
}

const changeNominal = (cart)=>{
    $bus.$emit('change-nominal',cart);
}
</script>

<style>

</style>