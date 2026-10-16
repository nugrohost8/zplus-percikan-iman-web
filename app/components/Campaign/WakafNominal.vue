<template>
    <div class="bg-white">
        <div class="text-w400 text-14 mb-2">Masukan Nominal Wakaf</div>
        <div class="d-flex align-items-center rounded1xl input-nominal border-1 p-2 mb-2">
            <span class="text-w400 text-18 text-bold">Rp</span>
            <input inputmode="numeric" class="input-plain text-body flex-grow-1 text-18 text-bold" name="nominal_donasi" @keypress="onlyNumber" v-model="nominal_wakaf" placeholder="0" type="text" ref="inputRefWakaf" :disabled="havePaketDonasi"
                autocomplete="off" required>
        </div>
        <div class="text-10 text-half-bl text-center" :class="{'text-danger' : warnMinimumWakaf }">Minimal Wakaf {{ $formatNumber(minimumDonasi) }}</div>
        <div class="my-1">&nbsp;</div>
        <div class="text-w400 text-14 mb-2">Masukan Operasional Wakaf</div>
        <div class="d-flex align-items-center rounded1xl input-nominal border-1 p-2 mb-2">
            <span class="text-w400 text-bold">Rp</span>
            <input inputmode="numeric" class="input-plain text-body flex-grow-1 text-bold" name="nominal_donasi" @keypress="onlyNumber" v-model="operasional_wakaf" placeholder="0" type="text" ref="inputRefOps" :disabled="havePaketDonasi"
                autocomplete="off" required>
        </div>
        <div class="text-10 text-half-bl text-center" :class="{'text-danger' : warnMinimumOps }">Minimal Operasional {{ $formatNumber(operasional) }}</div>
    </div>
</template>

<script setup>
    const props = defineProps({
        campaign:Object,
        minimumDonasi:Number,
        operasional:Number
    })
    import { useCartStore } from "@/stores/cart";
    const cartStore = useCartStore();
    const { $formatNumber,$bus } = useNuxtApp();
    const minimum = props.minimumDonasi;
    const ops = props.operasional;
    const campaign = props.campaign;
    const nominal_wakaf = ref(new Intl.NumberFormat('ID',{}).format(minimum));
    const operasional_wakaf = ref(0);
    const havePaketDonasi = ref(false)
    const warnMinimumWakaf  = ref(false);
    const warnMinimumOps  = ref(false);
    const inputRefWakaf = ref(null);
    const inputRefOps = ref(null);
    const onlyNumber =  ($event)=> {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
      }
    }
    const addToCart = ()=>{
        let currentCampaign = {
            id:Date.now(),
            campaign_id:campaign.campaign_id,
            title:campaign.title,
            slug:campaign.slug,
            thumbnail:campaign.mobile_thumbnail,
            nominal:parseInt(nominal_wakaf.value.toString().replaceAll('.','')),
            operasional:parseInt(operasional_wakaf.value.toString().replaceAll('.','')),
            total_nominal:parseInt(nominal_wakaf.value.toString().replaceAll('.','')) + parseInt(operasional_wakaf.value.toString().replaceAll('.','')),
            campaign_type:campaign.campaign_type,
            quantity:1,
            description:campaign.title,
            nama_pequrban:'',
            lokasi_qurban:'',
            id_paket:'',
            id_paket_qurban:'',
            jumlah_paket:'',
            atasnama:'',
            as_pengurang_pajak:0,
            npwp:''
        }
        if(currentCampaign.nominal != 0){
            cartStore.setCurrentCart(currentCampaign) 
            warnMinimumWakaf.value = false;
        }
        
    }

    watch([nominal_wakaf],()=>{
        let nom = nominal_wakaf.value.toString().replaceAll('.','');
        if(nom < minimum){
            warnMinimumWakaf.value = true;
        }else{
            warnMinimumWakaf.value = false;
        }
        nominal_wakaf.value = new Intl.NumberFormat('ID',{}).format(nom);
        addToCart();
    })

    watch([operasional_wakaf],()=>{
        let nomOps = operasional_wakaf.value.toString().replaceAll('.','');
        if(nomOps < ops){
            warnMinimumOps.value = true;
        }else{
            warnMinimumOps.value = false;
        }
        operasional_wakaf.value = new Intl.NumberFormat('ID',{}).format(nomOps)
        addToCart();
    })

    onMounted(()=>{
        $bus.$on('operasional-required',()=>{
            inputRefWakaf.value?.focus()

        })
        $bus.$on('donate-from-bottom-bar',()=>{
            let nom = nominal_wakaf.value.toString().replaceAll('.','');
            let nomOps = operasional_wakaf.value.toString().replaceAll('.','');
            if(nom < minimum){
                warnMinimumWakaf.value = true;
                if(inputRefWakaf.value != null){
                    inputRefWakaf.value?.focus()
                    window.scrollTo(0, 0)
                } 
            }
            if(nomOps < ops){
                warnMinimumOps.value = true;
                if(inputRefOps.value != null){
                    inputRefOps.value?.focus()
                    window.scrollTo(0, 0)
                } 
            }
            
           
        })
    })
</script>

<style>

</style>