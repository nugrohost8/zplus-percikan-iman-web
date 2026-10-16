<template>
    <div class="d-flex justify-content-center ">
        <div class="page">
          <CheckoutHeaderCheckout :title="''" />
            <div class="bg-white full-page pt-56">
                <div class="py-3 bg-white">
                    <div v-if="transaction != null">
                        <PembayaranSukses :transaction="transaction" v-show="transaction.status == 'paid'"/>
                        <PembayaranPending :transaction="transaction" v-show="transaction.status == 'pending'"/> 
                    </div>   
                    <div v-else>
                        <PembayaranNotFound />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const config = useRuntimeConfig();
const route = useRoute();
const { $formatDate,$formatRupiah} = useNuxtApp()
const { $getMeta,$getMetaScript} = useNuxtApp()
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const transaction = ref(null)
const paymentLink = route.query.payment_link
const { data ,status} = await $fetch(`${config.public.baseUrl}front-end/transaksi`,{
    method:'POST',
    body:{
            order_id:route.query.order_id
        },
    lazy: true
  });
  if(status == 1){
    transaction.value = data;
  }
  cartStore.emptyCart();
  onMounted(()=>{
    if(route.query !== undefined){
      let referral = route.query.referral;
      if(referral !== undefined){
        window.history.replaceState({},'',`?referral=`+referral);
      }
    }
  })
  useHead({
    title: 'Pembayaran ' + config.public.appName,
    meta: $getMeta({
      og_locale: "id_ID",
      og_type: "website",
      og_title: 'Pembayaran ' + config.public.appName,
      og_description: 'Pembayaran ' + config.public.appName,
      og_url: config.public.baseAppUrl + 'pembayaran',
      og_site_name: config.public.appName,
      og_image: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      og_keywords: 'Pendidikan,Kesehatan,Kemanusiaan,Ekonomi,Dakwah',
      theme_color: config.public.mainColor
    }),
    link: [{
        rel: "sitemap",
        type: "application/xml",
        title: "Sitemap",
        href: "/sitemap.xml"
      },
      {
        hid: 'canonical',
        rel: "canonical",
        href: config.public.baseAppUrl
      }
    ],
    script: $getMetaScript({
      url: config.public.baseAppUrl,
      title: 'Pembayaran ' + config.public.appName,
      description: 'Pembayaran ' + config.public.appName
    })
  })
</script>

<style>
.separator-pad{
    height:6px;
    width: 100%;
    background-color: #ddd;
}

</style>