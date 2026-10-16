<template>
  <div class="d-flex justify-content-center">
    <div class="page">
        <ArtikelHeader :title="'Detail Donasi'" />
        <div class="pt-56 full-page bg-white">
            <CheckoutChangeNominal :cart="cart" v-if="cart !== null"/>
        </div>
    </div>
  </div>
</template>

<script setup>
    const route = useRoute();
    const config = useRuntimeConfig();
    const router = useRouter();
    const { $getMetaScript } = useNuxtApp();
    const id = route.query.id
    const cart = ref(null);
    const campaign = ref();
    const edited = ref(false);
    import {useCartStore} from "@/stores/cart";
    const cartStore = useCartStore();

    onMounted( async ()=>{
        cart.value = cartStore.getCartById(id);
        console.log(cart.value)
        /*
        const { data,status,error,refresh,clear } = await $fetch(`${config.public.baseUrl}campaign-detail`,{
            method:'POST',
            lazy: true,
        }, { initialCache: false });
        if(status == 1){
            campaign.value = data.campaign;
        }
        */
       /*
       router.beforeRouteLeave = (to, from, next) {
            if(to.name == 'slug-id___id' && !this.isWarned){
                next(false);
                this.$eventBus.$emit('needWarned');
            }else{
            next()
            }
            console.log("Before leave")
        }
        */

    })
    useHead({
        meta:[
        { name:'theme-color',content:config.public.mainColor},
        { name: "color-scheme", property: "color-scheme",content: "dark light"},
        ],
        link: [
            {
            hid: 'canonical',
            rel: "canonical",
            href: config.public.baseAppUrl + 'checkout'
            }
        ],
        script: $getMetaScript({
            url: config.public.baseAppUrl,
            title: config.public.appName,
            description: config.public.appName
        })
    })
    onBeforeRouteLeave(()=>{
        if(edited.value){
            edited.value = false;
            return false;
        }
    })
    definePageMeta({
        pageTransition: {
            name: 'right-to-left', // Custom transition name
            mode: 'out-in',     // Optional: mode of the transition
        },
    });
</script>

<style>

</style>