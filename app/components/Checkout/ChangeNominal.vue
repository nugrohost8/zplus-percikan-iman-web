<template>
    <div class="p-3">
        <div class="text-bold mb-3">{{ campaign.title }}</div>
        <div class="d-flex align-items-center rounded1xl input-nominal border-1 p-2 mb-2">
            <span class="text-w400 text-14">Rp</span>
            <input inputmode="numeric" class="input-plain text-body flex-grow-1 text-14" name="nominal_donasi" @keypress="onlyNumber" v-model="nominal_donasi" placeholder="0" type="text" ref="inputRef" :disabled="havePaketDonasi"
                autocomplete="off" required>
        </div>
        <div class="text-10 text-half-bl text-center" :class="{'text-danger' : warnMinimum }">Minimal Donasi Rp.10.000</div>
        <div class="text-10 error-nominal text-center" v-if="errorNominal != ''">
            {{ errorNominal }}
        </div>
        <div class="text-w400 text-14 my-2">{{ havePaketDonasi ? 'Pilih Paket Donasi' : 'Nominal Donasi'}}</div>
        <div v-if="campaign.campaign_type == 'qurban'" class="mb-3">
            <label class="card w-100 min-h-100 p-relative" :class="{'paket-active' : paket_qurban_id == paketQurban?.id}">
                <input name="paket_donasi" type="radio" class="form-check-input hidden absolute-0" :value="paketQurban?.id" v-model="paket_qurban_id" :required="true">
                <div class="d-flex p-2">
                    <div class="w-15">
                        <NuxtLink :to="STORAGE_URL + paketQurban?.image" target="_blank" rel="noopener noreferrer">
                            <nuxt-img preload loading="lazy" :src="STORAGE_URL + paketQurban?.image" class="w-100"></nuxt-img>
                        </NuxtLink>
                    </div>
                    <div class="flex-grow-1 px-2">
                        <div class="text-12">{{ paketQurban?.nama }}</div>
                        <div class="">{{ $formatNumber(paketQurban?.nominal) }}</div>
                        <div v-if="paketQurban?.berat !== undefined">Berat : {{ paketQurban?.berat }}</div>
                    </div>
                </div>
            </label>
        </div>
        <div v-else class="row justify-content-center px-2">
            <div class="form-check px-1 mb-2 d-flex justify-content-center align-items-center" v-for="(paket,index) in getPaketDonasi()" :key="index" :class="havePaketDonasi ? getPaketDonasi().length < 2 ? 'col-12' : 'col-6' : 'col-3'">
                <label class="card-unselect w-100 pt-2 min-h-100" :class="{'paket-active' : paket_donasi?.nominal == paket.nominal}">
                    <input name="paket_donasi" type="radio" class="form-check-input hidden" :value="paket" v-model="paket_donasi" autocomplete="off" :required="isPaketRequired">
                    <div class="h-100 d-flex align-items-center justify-content-center flex-column">
                        <div class="text-10 text-center flex-grow-1" v-if="paket.nama !== null">{{ paket.nama }}</div>
                        <div class="text-center">{{ $formatNumber(paket.nominal) }}</div>
                    </div>
                </label>
            </div>
        </div>

        <div v-if="havePaketDonasi" class="mb-2">
            <label for="choice_qty">Jumlah Paket</label>
            <div class="d-flex">
                <button type="button" class="btn btn-dark btn-sm" @click="kurangPaket" :disabled="jumlah_paket <= 1">
                    <i class="bx bx-minus"></i>
                </button>
                <div class="col-2">
                    <input type="number" v-model="jumlah_paket" min="1" class="form-control form-control-sm text-center">
                </div>
                <button type="button" class="btn btn-dark btn-sm" v-on:click="tambahPaket" :disabled="paket_donasi == ''">
                    <i class="bx bx-plus"></i>
                </button>
            </div>
        </div>
        
        <div v-if="campaign.campaign_type == 'qurban'">
            <div class="form-group">
                <label for="nama-pequrban" class="mb-2">Nama Pequrban</label>
                <input type="text" name="nama_pequrban" v-model="nama_pequrban" class="form-control input-nama rounded1xl text-sm" placeholder="Masukan nama pequrban" ref="namaPequrban">
            </div>
        </div>
        <div v-if="campaign.campaign_type == 'zakat'" class="my-3 pb-4">
            <div class="form-check form-switch mb-3">
                <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" v-model="makePengurangPajak">
                <label class="form-check-label pt-1" for="flexSwitchCheckDefault">Jadikan sebagai pengurang pajak</label>
            </div>
            <transition name="right-to-left" mode="out-in">
                <div v-if="makePengurangPajak">
                    <label class="text-w400">NPWP</label>
                    <input type="text" class="form-control input-nama rounded1xl mb-2" placeholder="Masukan nomor npwp anda" v-model="npwp" ref="npwpRef" required>
                </div>
            </transition>
        </div>
        
        <div class="text-center my-4">
            <button class="btn btn-checkout-donasi w-100 py-2 text-18" @click="addToCart">Update</button>
        </div>
    </div>
</template>

<script setup>
    import {
        useCartStore
    } from "@/stores/cart";
    const {
        $formatNumber,
        $getMeta,
        $getMetaScript,
        $defaultPaketDonasi,
        $bus
    } = useNuxtApp();
    const props = defineProps({
        cart: Object
    });
    const cart = props.cart;
    const router = useRouter();
    const config = useRuntimeConfig();
    const STORAGE_URL = config.public.storageUrl;
    const cartStore = useCartStore();
    const zakatStore = useZakatStore();
    const inputRef = ref('');
    const nominal_donasi = ref('');
    const paket_donasi = ref(null);
    const errorNominal = ref('')
    const nama_pequrban = ref('')
    const lokasi_qurban = ref('')
    const makePengurangPajak = ref(false);
    const npwp = ref('');
    const havePaketDonasi = ref(false)
    const id_paket = ref('');
    const jumlah_paket = ref(1);
    const campaign = ref(null);
    const isPaketRequired = ref(true);
    const warnMinimum = ref(false);
    const dataZakat = zakatStore.getZakat;
    const paketQurban = ref(null);
    const paket_qurban_id = ref(null);
    if (dataZakat) {
        nominal_donasi.value = new Intl.NumberFormat('ID', {}).format(dataZakat.total)
    }
    const {
        data,
        status
    } = await $fetch(`${config.public.baseUrl}campaign-detail`, {
        method: 'POST',
        body: {
            slug: cart.slug
        },
        lazy: true
    })
    if (status == 1) {
        campaign.value = data.campaign;
        if(campaign.value.campaign_type == 'qurban'){
            paketQurban.value = campaign.value.paket_qurban
        }
    }
    const getPaketDonasi = () => {
        if(campaign.value.paket_donasi && campaign.value.paket_donasi.length > 0){
            havePaketDonasi.value = true;
            return campaign.value.paket_donasi;
        }
        return $defaultPaketDonasi();
    }
    nominal_donasi.value = new Intl.NumberFormat('ID',{}).format(cart.total_nominal);//;
    jumlah_paket.value = cart.jumlah_paket;
    //paket_donasi.value = cart.paket_donasi;
    nama_pequrban.value = cart.nama_pequrban;
    paket_qurban_id.value = cart.id_paket_qurban;
    let paket = getPaketDonasi().find(paket=>paket.id == cart.id_paket && paket.nominal == cart.nominal);
    paket_donasi.value = paket !== undefined ? paket : null;
   
    watch([paket_donasi],(newValue)=>{
        if(newValue)
        jumlah_paket.value = 1;
        id_paket.value = newValue[0].id;
        calculatePaket();     
    })
    watch(nominal_donasi,(newValue)=>{
        if(nominal_donasi.value != ''){
            nominal_donasi.value = parseInt(nominal_donasi.value.replaceAll('.',''))
        }
        if(newValue != ''){
            const nominal = parseInt(newValue.replaceAll('.',''));
            if(nominal > 0){
                isPaketRequired.value = false
            }
            nominal_donasi.value = new Intl.NumberFormat('ID',{}).format(nominal)
        }
      
        //addToCart()
    })
    watch(makePengurangPajak,(newValue)=>{
        console.log(newValue);
    })
    watch(jumlah_paket,(newValue)=>{
        if(paket_donasi.value !== null || paketQurban.value !== null){
            calculatePaket();
        }else{
            jumlah_paket.value = 1;
        }
        
    })
    watch(nama_pequrban,(newValue)=>{
       
    })

    function addToCart() {
        
        let nom = parseInt(nominal_donasi.value.replaceAll('.', ''));
        if (nom < 10000) {
            warnMinimum.value = true;
            return;
        }
        cart.nominal = paket_donasi.value?.nominal
        cart.quantity = jumlah_paket.value;
        cart.jumlah_paket = jumlah_paket.value;
        cart.total_nominal = nom
        cart.nama_pequrban = nama_pequrban.value;
        cart.id_paket_qurban = paket_qurban_id.value;
        cart.as_pengurang_pajak = makePengurangPajak.value ? 1 : 0;
        cart.npwp = npwp.value;
        cart.id_paket = paket_donasi.value !== null ? paket_donasi.value.id : null;
        cartStore.updateCart(cart)
        router.go(-1);
    }

    const kurangPaket = () => {
        if (jumlah_paket.value > 1) {
            jumlah_paket.value--;
        }
        calculatePaket();
    }
    const tambahPaket = () => {
        jumlah_paket.value++;
        calculatePaket();
    }

    const calculatePaket = () => {
        if(paket_donasi.value !== null){
            let val = parseInt(paket_donasi.value.nominal)
            let nom = val * jumlah_paket.value;
            nominal_donasi.value = new Intl.NumberFormat('ID',{}).format(nom)
        }
        if(paketQurban.value !== null){
            let nom = paketQurban.value.nominal * jumlah_paket.value;
            nominal_donasi.value = new Intl.NumberFormat('ID',{}).format(nom)
        }

    }
    onMounted(() => {
        /*
        nominal_donasi.value = new Intl.NumberFormat('ID',{}).format(cart.total_nominal);//;
        jumlah_paket.value = cart.jumlah_paket;
        //paket_donasi.value = cart.paket_donasi;
        nama_pequrban.value = cart.nama_pequrban;
        paket_qurban_id.value = cart.id_paket_qurban;
        let paket = getPaketDonasi().find(paket=>paket.id == cart.id_paket);
        paket_donasi.value = paket !== undefined ? paket : null;
        console.log("Paket",paket);
        //getPaketDonasi().find()
        */
    })

    const onlyNumber = ($event) => {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
            $event.preventDefault();
        }
    }
</script>

<style scoped>

</style>