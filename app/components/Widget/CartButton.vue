<template>
    <nuxt-link :to="'/donasi'" class="rounded-50 btn btn-default btn-circle">
        <div class="p-relative">
            <SvgCharity />
            <span class="cart-count">{{ cart.length }}</span>
        </div>
    </nuxt-link>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const cartCount = ref('');
const { cart} = storeToRefs(cartStore)
cartCount.value = cartStore.listOfCart.length
</script>

<style>

</style>