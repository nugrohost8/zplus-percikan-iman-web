<template>
  <div class="bottom-bar d-flex justify-content-center">
    <div class="page border-top-grey-1">
      <nav class="navbar navbar-dark bg-white navbar-expand px-3 align-items-center" id="bottom-bar">
        <div class="mx-1">
          <button class="btn btn-share w-100" @click="shareIt" aria-label="Share">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.87417 12.3841L14.135 16.0325M14.1258 5.96748L7.87417 9.61581M19.25 4.58331C19.25 6.1021 18.0188 7.33331 16.5 7.33331C14.9812 7.33331 13.75 6.1021 13.75 4.58331C13.75 3.06453 14.9812 1.83331 16.5 1.83331C18.0188 1.83331 19.25 3.06453 19.25 4.58331ZM8.25 11C8.25 12.5188 7.01878 13.75 5.5 13.75C3.98122 13.75 2.75 12.5188 2.75 11C2.75 9.4812 3.98122 8.24998 5.5 8.24998C7.01878 8.24998 8.25 9.4812 8.25 11ZM19.25 17.4166C19.25 18.9354 18.0188 20.1666 16.5 20.1666C14.9812 20.1666 13.75 18.9354 13.75 17.4166C13.75 15.8979 14.9812 14.6666 16.5 14.6666C18.0188 14.6666 19.25 15.8979 19.25 17.4166Z" stroke="#0D9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <!-- 
        <div class="mx-1">
          <button class="btn btn-add-to-cart w-100 bg-green" @click="addToCarts" aria-label="Add To Cart" :disabled="buttonDisabled">
            <i class='bx bxs-shopping-bag text-white text-24'></i>
          </button>
        </div>
         -->
        <div class="mx-1 flex-grow-1">
          <button class="nav-link px-0 text-center btn btn-checkout-donasi w-100" :data-value="campaign.title" aria-label="Klik Pembayaran" @click="donate" :disabled="buttonDisabled">
            <div class="text-center">Tunaikan Sekarang</div>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
<script setup>
  const {
    $bus
  } = useNuxtApp();
  const router = useRouter();
  const { trackEvent } = useGtm();
  const minimumDonate = 20000;
  import {
    storeToRefs
  } from 'pinia'
  import {
    useCartStore
  } from "@/stores/cart";
  const cartStore = useCartStore();
  const props = defineProps({
    campaign: Object,
  })
  const {
    cart
  } = storeToRefs(cartStore)
  const addToCart = ref(false);
  const cartAdded = ref(false);
  const campaign = props.campaign;
  function shareIt() {
    $bus.$emit('toggle-bottom-bar')
  }
  const addToCarts = () => {

    if (addToCart.value == false) {
      addToCart.value = true;
      let currentCart = cartStore.getCurrentCart;
      if (currentCart !== null && currentCart.nominal >= minimumDonate) {
        if(currentCart.campaign_type == 'qurban' && currentCart.nama_pequrban == ''){
          $bus.$emit('nama-pequrban-required')
          addToCart.value = false;
          return
        }else if(currentCart.campaign_type == 'wakaf' && currentCart.operasional < minimumDonate){
          $bus.$emit('operasional-required')
          addToCart.value = false;
          return
        }
        if (cartStore.isSameCart(currentCart) == false) {
          cartStore.addToCart(currentCart);
        } else {
          cartStore.addQuantity(currentCart);
        }
        cartAdded.value = true
        $bus.$emit('add-to-cart')
        trackEvent("Add to cart","Campaign","Klik",campaign.title,currentCart.nominal)
        setTimeout(() => {
          cartAdded.value = false
          addToCart.value = false;
          cartStore.setCurrentCart(null);
          $bus.$emit('end-to-cart')
        }, 3000)
      }else{
        addToCart.value = false;
        $bus.$emit('donate-from-bottom-bar')
      }
    }
    
  }

  const buttonDisabled = ref(true);

  const donate = () => {
    if(cartStore.getCurrentCart == null){
      let carts = cartStore.listOfCart;
      if(carts.length == 0){
        $bus.$emit('donate-from-bottom-bar')
      }else{
        trackDonateEvent("Klik Pembayaran","Campaign","Klik",campaign.title,carts[0].nominal)
        router.push({ path: '/donasi' })
      }
    }else{ 
      let LastCart = cartStore.getCurrentCart;
      if(LastCart.nominal < minimumDonate){
        $bus.$emit('donate-from-bottom-bar')
      }else if(LastCart.campaign_type == 'qurban' && LastCart.nama_pequrban == ''){
        $bus.$emit('nama-pequrban-required')
      }else{
        trackDonateEvent("Klik Pembayaran","Campaign","Klik",campaign.title,LastCart.nominal)
        if (cartStore.isSameCart(LastCart) == false) {
          cartStore.addToCart(LastCart);
        } else {
          cartStore.addQuantity(LastCart);
        }
        //cartStore.addToCart(LastCart);
        cartStore.setCurrentCart(null);
        router.push({ path: '/donasi' })
      }
    }
   
  }

  const  trackDonateEvent = (event,category,action,label,value)=>{
      trackEvent(event,{
              category: category,
              action: 'click',
              label: label,
              value: value,
              noninteraction: false,
            })
      }
  onMounted(()=>{
    $bus.$on('toggle-button',(data)=>{
      buttonDisabled.value = !data;
    })
  })
</script>
<style scoped>

</style>