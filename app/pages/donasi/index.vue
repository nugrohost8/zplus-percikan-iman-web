<template>
  <div>
    <SeoMeta 
          :title="'Donasi'"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'donasi'" />
    <CheckoutHeaderCheckout :title="'Keranjang Donasi'" />
      <div id="home" class="d-flex justify-content-center">
        
        <div class="page bg-white full-page pt-56">
          <WidgetWatermark v-if="environtment == 'local'" />
          <div v-if="changeNominal">
              <CheckoutChangeNominal :cart="cartToChange" />
          </div>
          <div v-else>
            <CheckoutEmptyDonasi v-if="cartStore.cart.length == 0" :campaigns="campaigns" />
            <div v-else class="p-3">
              <CheckoutCarts />
              <form @submit.prevent="bayarDonasi">
                <div class="text-half-bl text-sm my-3">
                  Merujuk kepada Perpres 18 tahun 2017 maka donasi yang disalurkan melalui {{ config.public.appName }} bersumber dari dana yang sah secara hukum, bukan bersumber dan untuk tujuan pencucian uang (money laundry), termasuk terorisme maupun tindak kejahatan lainnya.
                </div>
                <div class="text-w400 text-16 mb-2">Rincian Donasi Anda</div>
                <div class="card shadow-green">
                  <div class="card-body p-3">
                    <div class="d-flex justify-content-between mb-2" v-for="(cart,index) in cartStore.cart" :key="index">
                      <div class="text-half-bl">{{ cart.title }}</div>
                      <div class="text-half-bl">{{ cart.total_nominal !== undefined ? $formatRupiah(cart.total_nominal.toString().replaceAll('.','')) : '' }}</div>
                    </div>
                    <div class="dashed my-3"></div>
                    <div class="d-flex justify-content-between">
                      <div>Total</div>
                      <div>{{ $formatRupiah(calculateCart()) }}</div>
                    </div>
                    <div class="text-center mt-3">
                      <NuxtLink :to="'/program'" class="btn bg-green card-radius btn-sm btn-add-donasi">Tambah Donasi</NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center pad-pembayaran rounded1xl p-2 my-2 ">
                    <div v-if="pembayaran != null">
                      <nuxt-img :src="pembayaran.icon"  class="icon-payment me-2"/><span class="text-bold">{{ pembayaran.nama }}</span>
                    </div>
                    <div v-else class="t-bold">Pilih Pembayaran</div>
                    <button type="button" class="btn btn-default dropdown-toggle" @click="togglePembauyaran">Pilih</button>
                </div>
                <div class="form-group" v-if="pembayaran?.nama == 'Ovo'">
                    <div class="input-container w-100">
                      <input class="form-control required mb-2 rounded1xl" placeholder="Masukan ID OVO anda" required v-model="ovo_id">
                    </div>
                </div>
                <div class="py-3">
                  <div class="text-w400 text-16 mb-2">Masukan Data Diri</div>
                  <div class="d-flex mb-3">
                    <div class="d-flex align-items-center me-3">
                        <input type="radio" class="form-check-input me-2" :value="'Laki-laki'" v-model="jenis_kelamin" autocomplete="off" required>
                        <div class=""> Bapak</div>
                    </div>
                    <div class="d-flex align-items-center me-3">
                      <input type="radio" class="form-check-input me-2" :value="'Perempuan'" v-model="jenis_kelamin" autocomplete="off" required>
                      <div class=""> Ibu</div>
                    </div>
                  </div>
                  <div class="input-container w-100">
                    <input class="form-control input-nama required mb-2 rounded1xl" placeholder="Nama Lengkap" name="nama" required v-model="nama_lengkap">
                  </div>
                  
                  <div class="input-container w-100 mb-2">
                    <vue-tel-input v-model="no_telp" :class="'input-nama rounded1xl'" :defaultCountry="'id'" :inputOptions="inputOptions" :mode="'international'" @validate="onValidate" :required="isTelpRequired"></vue-tel-input>
                    <!-- <input inputmode="tel" class="form-control input-nama  mb-2" placeholder="Masukan Nomor Telepon Atau" v-model="no_telp" :required="isTelpRequired"> -->
                  </div>
                  <div class="input-container w-100">
                    <input inputmode="email" class="form-control input-nama mb-2 rounded1xl" placeholder="Masukan Email" v-model="email" :required="isEmailRequired" >
                  </div>
                  <div class="form-input d-flex  align-items-center mb-2">
                    <input type="checkbox" class="form-check-input form-checkbox me-2 mt-0" v-model="hideUser">
                    <label>Donasi Sebagai Hamba Allah</label>
                  </div>
                  
                </div>
                <div class="mb-4">
                      <div class="text-w400 mb-2">Doa Dan Harapan</div>
                      <textarea class="form-control input-doa text-14" v-model="doa" placeholder="Sahabat sertakan doa dan harapanmu disini"></textarea>
                  </div>
                <div class="text-center">
                  <button class="btn  btn-checkout-donasi w-100 py-2 p-relative" :disabled="submitted  || pembayaran == null" aria-label="donate"> 
                    <div class="absolute-0 w-100 d-flex justify-content-center">
                      <span class="spinner" v-show="submitted"></span>
                    </div>
                    <span class="btn-text text-18">Lanjut Pembayaran</span>
                  </button>
                  <div class="text-center" v-if="showCountDown">
                      <h4 class="text-center">{{ovoCountDown}}</h4>
                      <div>{{notice_ovo}}</div>
                  </div>
                </div>
                <div class="text-center text-danger payment-error" v-if="!submitted">{{ paymentErrorMsg }}</div>
                <div class="bottom-footer"></div>
              </form>
            </div>
          </div>
          <BottomNavBar v-if="cartStore.cart.length == 0" :page="'checkout'" />
        </div>
        <div class="modal-overlay" v-if="isWarningVisible" @click="closeModal" ref="warning">
          <div class="modal-content-1" @click.stop>
            <div class="d-flex justify-content-center">
              <div class="page p-3">
                <div class="card card-radius">
                  <div class="card-body text-center">
                    <div class="text-center mb-2"><SvgHeart/></div>
                    <div class="">
                      <div class="text-center text-18">
                        <i>Sahabat</i>
                      </div>
                      <div class="text-center">
                        <i>Uluran tangan serta kebaikan yang kita berikan walaupun sekecil apapun akan sangat membantu mereka yang membutuhkan.</i>
                      </div>
                      <div class="text-center my-2 text-bold">Hapus dari daftar donasi?</div>
                      <div class="d-flex justify-content-center my-4">
                        <button class="btn btn-info-green text-white me-1 text-sm w-50" @click="keepDonate" aria-label="donasi">Tetap Berdonasi</button>
                        <button class="btn btn-cancel ms-1 text-sm w-50" @click="yesDelete" aria-label="delete">Ya Hapus</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <WidgetModal>
          <WidgetDoa @bayar="submitDonasi" :jenis="jenisDoa" />
        </WidgetModal>
        <CheckoutPayments :pembayarans="pembayarans" @paymentSelected="paymentSelected"/>
      </div>
</div>
</template>

<script setup>
  const config = useRuntimeConfig();
  import { useCartStore } from "@/stores/cart";
  import { useDonaturStore } from "@/stores/donatur";
  const {
    $getMeta,
    $getMetaScript,
    $sendFbEvents,
    $bus
  } = useNuxtApp()
  const route = useRoute();
  const router = useRouter();
  const cartStore = useCartStore();
  const donaturStore = useDonaturStore();
  //const selectedPayment = ref({})
  const payment_type = ref('');
  const nama_lengkap = ref('');
  const no_telp = ref('');
  const email = ref('');
  const hideUser = ref(0);
  const isVisible = ref(false)
  const payments = ref(null);
  //const metodePembValidation = ref('')
  const rekeningId = ref('');
  const isTelpRequired = ref(true)
  const isEmailRequired = ref(false)
  const jenis_kelamin = ref('')
  const donatur = donaturStore.donaturObj
  nama_lengkap.value = donatur.name
  no_telp.value = donatur.telp
  email.value = donatur.email
  jenis_kelamin.value = donatur.jenis_kelamin
  isTelpRequired.value = email.value == null
  isEmailRequired.value = no_telp.value == null
  const paymentError = ref(false);
  const paymentErrorMsg = ref('');
  const submitted = ref(false);
  const isWarningVisible = ref(false);
  const currentRemovableCart = ref(null)
  const changeNominal = ref(false);
  const countryCode = ref('')
  const cartToChange = ref(null)
  const campaigns = ref([]);
  const doa = ref('');
  const referralCode = ref('');
  const grossAmount = ref(0);
  const pembayarans = ref([]);
  const pembayaran = ref(null);
  const ovo_id = ref('');
  const showCountDown = ref(false);
  const ovoCountDown = ref(70);
  const payInterval = ref(null);
  const notice_ovo = '*Mohon segera lakukan pembayaran melalui aplikasi OVO, anda memiliki waktu 70 detik untuk menyelesaikan pembayaran';
  const inputOptions = {
    placeholder:'Masukan nomor telepon atau',
    required:isTelpRequired.value,
    showdialcode:true,
  }
  const jenisDoa = ref('');
  const environtment = config.public.appEnv;
  const { data,status,error,refresh,clear } = await $fetch(`${config.public.baseUrl}front-end/campaign-unggulan`,{
    method:'POST',
    lazy: true,
  }, { initialCache: false });
  if(status == 1){
    campaigns.value = data.campaigns;
    pembayarans.value = data.payments;
  }
  watch(no_telp, (newValue) => {
    if (newValue) {
      isEmailRequired.value = false
    }
  })
  watch(email, (newValue) => {
    if (newValue) {
      isTelpRequired.value = false
    }
  })
  payment_type.value = cartStore.payment;
  const openModal = () => {
    isVisible.value = true
  }
  const closeModal = () => {
    isVisible.value = false
    isWarningVisible.value = false;
  }

  const calculateCart = () => {
    let total = 0;
    cartStore.cart.forEach(itm => {
      total += parseInt(itm.total_nominal)
      if (itm.npwp !== undefined) {
        donaturStore.setNpwp(itm.npwp)
      }
      if(itm.campaign_type == 'zakat'){
        if(itm.title.includes('Fitrah')){
          jenisDoa.value = 'Fitrah'
        }else{
          if(jenisDoa.value !== 'Fitrah'){
            jenisDoa.value = 'Zakat';
          }
        }
      }
     
    })
    grossAmount.value = total;
    console.log("Doa",jenisDoa.value)
    return total;
  }

  const keepDonate = () => {
    closeModal()
  }

  const yesDelete = () => {
    
    closeModal();
    isWarningVisible.value = false;
    removeCart(currentRemovableCart.value);
  }

  function removeCart(id) {
    cartStore.removeItem(id);
    jenisDoa.value = '';
    calculateCart();
  }

  const bayarDonasi = async () => {
      $bus.$emit('modal-open');
  }

  const countDownTimer = ()=>{
    payInterval.value = setInterval(() => {
      ovoCountDown.value -= 1;
      if(ovoCountDown.value < 0){
        clearInterval(payInterval.value);
        showCountDown.value = false;
        ovoCountDown.value = 70;
      }
    }, 1000);
    
  }
  
  const submitDonasi = async () => {
    let payload = {
      donatur: {
        name: nama_lengkap.value,
        phone: no_telp.value || '',
        email: email.value || '',
        country:countryCode.value ||'',
        jenis_kelamin:jenis_kelamin.value ||'',
        referral:referralCode.value ||''
      },
      hide_user: hideUser.value ? 1 : 0,
      items: cartStore.listOfCart,
      generate_certificate: 1,
      rekening_id: rekeningId.value,
      doa:doa.value,
      gross_amount:grossAmount.value,
      payment_code:pembayaran.value.code,
      group_payment:pembayaran.value.group,
      ovo_id:ovo_id.value || '',
      request_id:Date.now()
    }
    donaturStore.setName(nama_lengkap.value)
    donaturStore.setTelp(no_telp.value)
    donaturStore.setEmail(email.value)
    donaturStore.setJenisKelamin(jenis_kelamin.value)
    if (!submitted.value) {
      submitted.value = true;
      if (import.meta.client && window.ttq) {
        window.ttq.track('Donate', { cart: cartStore.listOfCart });
      }
      if(pembayaran.value?.code == 'EMONEY_OVO'){
        showCountDown.value = true;
        countDownTimer();
      }
      let endPoint = `${config.public.baseUrl}front-end/make-donation`;
      if(pembayaran.value.code == 'EMONEY_OVO'){
        endPoint = `${config.public.baseUrl}front-end/make-donation-ovo`;
      }
      $fetch(endPoint, {
        method: 'post',
        timeout: 90000,
        body: {
          cart: payload
        }
      }).then(response => {
        if (response.status == 1) {
          try {
            let payment = response.data.payment;
            let transaction = response.data.transaction;
            cartStore.emptyCart();
            cartStore.setPayment(pembayaran.value);
            if(pembayaran.value?.group == 'EWALLET'){
                if(pembayaran.value?.code == 'EMONEY_OVO'){
                  navigateTo('/pembayaran?order_id='+transaction.order_id)
                }else{
                  window.open(transaction.payment_link);
                }
            }else{
                navigateTo('/pembayaran?order_id='+transaction.order_id)
            }
          } catch (err) {
            paymentError.value = true;
            paymentErrorMsg.value = 'Terjadi kesalahan pembayaran'
          }
        } else {
          if(response.statusCode == 400){
            paymentErrorMsg.value = response.message;
          }else{
            paymentErrorMsg.value = 'Terjadi kesalahan pembayaran'
          }
        }
        submitted.value = false;
        clearInterval(payInterval.value);
        showCountDown.value = false;
      }).catch(err => {
        console.log(err)
        paymentErrorMsg.value = 'Terjadi kesalahan pembayaran'
        submitted.value = false;
        clearInterval(payInterval.value);
        showCountDown.value = false;
      })
    }else{
      console.log("Still submitted");
    }

  }

  const onValidate = (phoneObject)=>{
    countryCode.value = phoneObject.country;
  }

  const togglePembauyaran = ()=>{
     $bus.$emit('openModal',{
      id:'modal-payments'
     })
  }

  const paymentSelected = (value)=>{
    pembayaran.value = value;
    $bus.$emit('closeModal',{
      id:'modal-payments'
    })
    
  }

  onMounted(() => {
    if (route.query !== undefined) {
      let referral = route.query.referral;
      if (referral !== undefined) {
        window.history.replaceState({}, '', `?referral=` + referral);
        referralCode.value = referral;
      }
    }
    $bus.$on('removeCart', (id) => {
      currentRemovableCart.value = id;
      isWarningVisible.value = true;
      
    })
    $bus.$on('change-nominal', (cart) => {
      cartToChange.value = cart;
      changeNominal.value = true;
    })
    $bus.$on('finish-edit', () => {
      changeNominal.value = false;
    })
    if (process.client && window.ttq) {
      window.ttq.track('AddToCart', { cart: cartStore.listOfCart });
    }
    
    if(cartStore.getPayment !== null){
      pembayaran.value = cartStore.getPayment;
    }

    
  })
  useHead({
    title: 'Checkout Donasi Zakat ' + config.public.appName,
    meta: $getMeta({
      og_locale: "id_ID",
      og_type: "website",
      og_title: 'Checkout Donasi ' + config.public.appName,
      og_description: 'Checkout Donasi ' + config.public.appName,
      og_description: 'Checkout Donasi ' + config.public.appName,
      og_url: config.public.baseAppUrl + 'donasi',
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
      title: 'Checkout Donasi ' + config.public.appName,
      description: 'Checkout Donasi ' + config.public.appName
    })
  })
</script>

<style>
.vue-tel-input{
  /* border-radius:10px !important; */
  padding:.115rem .15rem !important;
  border:1px solid #bbb;
}
  .spinner {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #fff;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
    margin-top: 6px;

  }
  .vti__input{
    background-color: #fff !important;
    color:#333333;
  }
  .form-check-radio{
    width:1rem;
    height:1rem;
  }

  .btn-cancel{
    background-color: var(--red-color);
    border-radius: 24px;
    border: 1px solid rgba(230, 67, 18, 0.2);
    font-weight: 600;
    color:#fff;
  }

   .btn-cancel:hover,.btn-info-green:hover{
    color:#cdcdcd !important;
   }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
  .pad-pembayaran{
    background-color: rgb(243 244 246 / 69%);
  }
  
</style>