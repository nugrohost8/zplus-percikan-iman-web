<template>
    <div class="p-3 mb-2 bg-white">
        <div v-if="campaign.campaign_type == 'wakaf'">
            <CampaignWakafNominal :campaign="campaign" :minimumDonasi="minimumDonasi" :operasional="operasional" />
        </div>
        <div v-else>
            <div class="text-w400 text-14 mb-2">Masukan Nominal {{ jenisDonasi()}}</div>
            <WidgetAutonumeric v-model="nominal_donasi" :inputClass="'form-control text-end inputNominal'"/>
            <div class="text-10 text-half-bl text-center" :class="{'text-danger' : warnMinimum }">Minimal Donasi Rp.20.000</div>
            <div class="text-10 error-nominal text-center" v-if="errorNominal != ''">
                {{ errorNominal }}
            </div>
            <div class="text-w400 text-14 my-2">{{ havePaketDonasi ? 'Pilih Paket Donasi' : campaign.campaign_type == 'zakat' ? 'Nominal Zakat' : 'Nominal Donasi'}}</div>
            <div v-if="campaign.campaign_type == 'qurban'" class="mb-3">
                <label class="card w-100 min-h-100 p-relative mb-2" v-for="(pQurban,index) in campaign.paket_qurban" :key="index" :class="{'paket-active' : paket_qurban?.id == pQurban?.id}">
                    <input name="paket_qurban" type="radio" class="form-check-input hidden absolute-0" :value="pQurban" v-model="paket_qurban" :required="true">
                    <div class="d-flex p-2">
                        <div class="w-15">
                            <NuxtLink :to="STORAGE_URL + pQurban?.image" target="_blank" rel="noopener noreferrer">
                                <nuxt-img preload loading="lazy" :src="STORAGE_URL + pQurban?.image" class="w-100"></nuxt-img>
                            </NuxtLink>
                        </div>
                        <div class="flex-grow-1 px-2">
                            <div class="d-flex flex-column h-100">
                                <div class="text-bold">{{ pQurban?.nama_paket }}</div>
                                <div class="flex-grow-1">{{ $formatRupiah(pQurban?.nominal) }}</div>
                                <div class="" v-if="pQurban?.berat !== undefined">Berat : <span class="plus-minus"> ± </span>{{ pQurban?.berat }} kg</div>
                            </div>
                        </div>
                    </div>
                </label>
            </div>
            <div v-else class="row justify-content-center px-2">
                <div class="form-check px-1 mb-2 d-flex justify-content-center align-items-center" v-for="(paket,index) in getPaketDonasi()" :key="index" :class="havePaketDonasi ? getPaketDonasi().length < 2 ? 'col-12' : 'col-6' : 'col-3'">
                    <label class="card-unselect w-100 py-1 min-h-100 btn-paket-donasi d-flex justify-content-center align-items-center" :class="{'paket-active' : paket_donasi?.id == paket.id}">
                        <input name="paket_donasi" type="radio" class="form-check-input hidden" :value="paket" v-model="paket_donasi" autocomplete="off" :required="isPaketRequired">
                        <div class="h-100 d-flex align-items-center justify-content-center flex-column">
                            <div class="text-10 text-center flex-grow-1" v-if="paket.nama !== null">{{ paket.nama }}</div>
                            <div class="text-center">{{ $formatNumber(paket.nominal) }}</div>
                        </div>
                    </label>
                </div>
            </div>
            <div v-if="havePaketDonasi">
                <label for="choice_qty" class="mb-1">Jumlah Paket</label>
                <div class="d-flex">
                    <button type="button" class="btn btn-dark btn-sm" @click="kurangPaket" :disabled="jumlah_paket <= 1 || manualInput" aria-label="kurang-paket">
                        <i class="bx bx-minus text-10"></i>
                    </button>
                    <div class="col-2">
                        <input type="number" v-model="jumlah_paket" min="1" class="form-control form-control-sm text-center">
                    </div>
                    <button type="button" class="btn btn-dark btn-sm" v-on:click="tambahPaket" :disabled="(paket_donasi == null && paket_qurban == null) || manualInput" aria-label="add-paket">
                        <i class="bx bx-plus text-10"></i>
                    </button>
                </div>
            </div>
            <div v-if="campaign.campaign_type == 'qurban'" class="mt-2 pb-4">
                <div class="">
                    <div class="form-group">
                        <label for="nama-pequrban" class="mb-1">Nama Pequrban</label>
                        <input type="text" name="nama_pequrban" v-model="nama_pequrban" class="form-control input-nama rounded1xl text-sm" placeholder="Masukan nama pequrban" ref="namaPequrban">
                    </div>
                    <!-- 
                    <div class="form-group">
                        <label for="nama-pequrban">Lokasi Qurban</label>
                        <input type="text" name="lokasi_qurban" v-model="lokasi_qurban" class="form-control card-radius text-sn">
                    </div>
                    -->
                </div>
            </div>
            <div v-if="campaign.campaign_type == 'zakat' && campaign.jenis_zakat.toLowerCase() !== 'fitrah'" class="my-2">
                <div class="form-check form-switch mb-2">
                    <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" v-model="makePengurangPajak">
                    <label class="form-check-label pt-1" for="flexSwitchCheckDefault">Jadikan sebagai pengurang pajak</label>
                </div>
                <transition name="right-to-left" mode="out-in">
                    <div v-if="makePengurangPajak" class="make-pengurang-pajak">
                        <label class="text-w400">NPWP</label>
                        <input type="text" class="form-control input-nama rounded1xl mb-2" placeholder="Masukan nomor npwp anda" v-model="npwp" ref="npwpRef" required>
                    </div>
                </transition>
            </div>
            <div v-if="campaign.donasi_rutin == 1" class="pb-2">
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" v-model="donasiRutin">
                    <label class="form-check-label pt-1" for="flexSwitchCheckDefault">Bersedia menerima notifikasi?</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        campaign:Object,
        minimumDonasi:Number,
        operasional:Number
    })
    const route = useRoute();
    const config = useRuntimeConfig();
    const STORAGE_URL = config.public.storageUrl;
    const campaign = props.campaign
    import { useCartStore } from "@/stores/cart";
    import { useZakatStore } from "@/stores/zakat";
    const cartStore = useCartStore();
    const zakatStore  = useZakatStore();
    const { $formatNumber,$bus,$defaultPaketDonasi } = useNuxtApp();
    const havePaketDonasi = ref(false)
    const inputRef = ref(null);
    const nominal_donasi = ref(0);
    const paket_donasi = ref(null);
    const errorNominal = ref('')
    const nama_pequrban = ref('')
    const lokasi_qurban = ref('')
    const paket_qurban_id = ref('');
    const makePengurangPajak = ref(false);
    const npwp = ref('');
    const doa = ref('')
    const id_paket = ref('');
    const jumlah_paket = ref(1);
    const atasNama = ref('');
    const isPaketRequired = ref(true);
    const warnMinimum  = ref(false);
    const namaPequrban = ref('');
    const npwpRef = ref('');
    const paketQurban = ref(null)
    const paket_qurban = ref(null);
    const manualInput = ref(false);
    const donasiRutin = ref(false);

    if(campaign.campaign_type == 'qurban'){
        havePaketDonasi.value = true;
        //paketQurban.value = campaign.paket_qurban;
        /*
        paketQurban.value = campaign.paket_qurban;
        paket_qurban_id.value = campaign.paket_qurban.id;
        nominal_donasi.value = paketQurban.value?.nominal
        */
    }
    const getPaketDonasi = ()=>{
        if(campaign.paket_donasi && campaign.paket_donasi.length > 0){
            havePaketDonasi.value = true;
            return campaign.paket_donasi;
        }
        return $defaultPaketDonasi();
    }
    watch([paket_donasi],(newValue)=>{
        jumlah_paket.value = 1;
        if(newValue[0] !== null){
            id_paket.value = newValue[0].id;
        }
        calculatePaket();
        manualInput.value = false;   
    })
    watch(nominal_donasi,(newValue)=>{
        if(newValue != ''){
            const nominal = parseInt(newValue);
            if(nominal > 0){
                isPaketRequired.value = false;
                paket_donasi.value = null;
                if(nominal < 20000){
                     warnMinimum.value = true;
                }else{
                    warnMinimum.value = false;
                }
            }
            //nominal_donasi.value = new Intl.NumberFormat('ID',{}).format(nominal)
        }
        addToCart()
    })
    watch(makePengurangPajak,(newValue)=>{
        // console.log(newValue);
    })
    watch(jumlah_paket,(newValue)=>{
        if(paket_donasi.value !== null ||  paket_qurban.value !== null){
            calculatePaket();
        }else{
            jumlah_paket.value = 1;
        }
        
    })
    watch(nama_pequrban,(newValue)=>{
        cartStore.setNamaPequrban(newValue);
    })
    watch(paket_qurban,(neValue)=>{
        calculatePaket();
    })

    watch(manualInput,(newVal,oldVal)=>{
        if(newVal){
            jumlah_paket.value = 1;
        }
    })
    const kurangPaket = ()=>{
        if(jumlah_paket.value > 1){
            jumlah_paket.value--;
        }
        calculatePaket();
       
    }
    const tambahPaket = ()=>{
        jumlah_paket.value ++;
        calculatePaket();
       
    }
    const calculatePaket = ()=>{
        if(paket_donasi.value !== null){
            let val = parseInt(paket_donasi.value.nominal)
            let nom = val * jumlah_paket.value;
            nominal_donasi.value = nom;
        }
       
        if(paket_qurban.value !== null){
            let nom = paket_qurban.value.nominal * jumlah_paket.value;
            nominal_donasi.value = nom
        }
        addToCart() 
    }

    const checkNominal = (event)=>{
        manualInput.value = true;
        paket_donasi.value = null;
        paket_qurban.value = null;
    }

    const addToCart = ()=>{
        let nominal = paket_donasi.value ? paket_donasi.value.nominal : nominal_donasi.value;
        if(paketQurban.value !== null){
            nominal = parseInt(paketQurban.value.nominal);
        }
        let currentCampaign = {
            id:Date.now(),
            campaign_id:campaign.campaign_id,
            title:campaign.title,
            slug:campaign.slug,
            thumbnail:campaign.mobile_thumbnail,
            nominal:nominal,
            total_nominal:nominal_donasi.value,
            campaign_type:campaign.campaign_type,
            kategori_zakat:campaign.jenis_zakat,
            nama_pequrban:nama_pequrban.value,
            lokasi_qurban:lokasi_qurban.value,
            quantity:jumlah_paket.value,
            description:campaign.title,
            id_paket:id_paket.value,
            id_paket_qurban:paket_qurban.value?.id,
            jumlah_paket:jumlah_paket.value,
            atasnama:atasNama.value,
            as_pengurang_pajak:makePengurangPajak.value ? 1 : 0,
            npwp:npwp.value,
            donasi_rutin:donasiRutin.value ? 1 : 0,
        }
        if(currentCampaign.nominal >= 20000){
            cartStore.setCurrentCart(currentCampaign) 
            warnMinimum.value = false;
            $bus.$emit('toggle-button',true);
        }else{
            warnMinimum.value = true;
            $bus.$emit('toggle-button',false);
        }
        
    }

    const jenisDonasi = ()=>{
        if(campaign?.campaign_type == 'zakat'){
            return 'Zakat';
        }else if(campaign?.campaign_type == 'qurban'){
            return 'Qurban';
        }else{
            return 'Donasi';
        }
    }

    const onUserInput = ()=>{
        manualInput.value = true;
        paket_donasi.value = null;
        paket_qurban.value = null;
    }

    onMounted(()=>{
        cartStore.setCurrentCart(null)
        $bus.$on('donate-from-bottom-bar',()=>{
            warnMinimum.value = true;
            if(inputRef.value != null){
                inputRef.value?.focus()
                window.scrollTo(0, 0)
            }   
        })
        $bus.$on('nama-pequrban-required',()=>{
            namaPequrban.value?.focus()

        })
        $bus.$on('npwp-required',()=>{
            npwpRef.value?.focus()
        })
        if(route.query?.reference == 'zakat'){
            let currentZakat = zakatStore.currentZakat;
            console.log("Current",currentZakat);
            nominal_donasi.value = currentZakat;
        }
       
    })
</script>

<style scoped>
.plus-minus{
    content: "\00B1";
}
.inputNominal{
    border-radius: .5rem;
    font-size: 1.2rem !important;
    font-weight: 600 !important;
}
</style>