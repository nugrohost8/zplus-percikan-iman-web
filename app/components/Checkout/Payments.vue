<template>
  <WidgetModalPad :title="''" :size="'modal-md'" :modalId="'modal-payments'">
    <div class="text-bold fs-16 mb-3">Pilih Pembayaran</div>
    <div v-if="groupVa.length > 0">
        <div class="text-bold mb-2">Virtual Account (Diverifikasi otomatis)</div>
        <div class="list-group-item list-group-item-action px-2 py-0" v-for="pembayaran in groupVa" :key="pembayaran.id" @click="selectPembayaran(pembayaran)">
            <div class="d-flex justify-content-between align-items-center">
                <nuxt-img :src="pembayaran.icon" class="icon-payment me-2" preload loading="lazy" />
                <div class="flex-grow-1 fw-semibold">
                    {{ pembayaran.nama }}
                </div>

            </div>
        </div>
     </div>
     <div v-if="groupEwallet.length > 0" class="my-3">
        <div class="text-bold mb-2">Uang Elektronik (Praktis dan Cepat)</div>
        <div class="list-group-item list-group-item-action px-2 py-0" v-for="pembayaran in groupEwallet" :key="pembayaran.id" @click="selectPembayaran(pembayaran)">
            <div class="d-flex justify-content-between align-items-center">
                <nuxt-img :src="pembayaran.icon" class="icon-payment me-2" preload loading="lazy" />
                <div class="flex-grow-1 fw-semibold">
                    {{ pembayaran.nama }}
                </div>

            </div>
        </div>
     </div>
     <div v-if="groupQr.length > 0" class="my-3">
        <div class="text-bold mb-2">QRIS</div>
        <div class="list-group-item list-group-item-action px-2 py-0" v-for="pembayaran in groupQr" :key="pembayaran.id" @click="selectPembayaran(pembayaran)">
            <div class="d-flex justify-content-between align-items-center">
                <nuxt-img :src="pembayaran.icon" class="icon-payment me-2" preload loading="lazy" />
                <div class="flex-grow-1 fw-semibold">
                    {{ pembayaran.nama }}
                </div>

            </div>
        </div>
     </div>

  </WidgetModalPad>
</template>

<script setup>
    const props = defineProps({
        pembayarans:{
            type:Array
        },
    });

    const groupVa = props.pembayarans.filter(item=>item.group == 'VIRTUAL_ACCOUNT');
    const groupEwallet = props.pembayarans.filter(item=>item.group == 'EWALLET');
    const groupQr = props.pembayarans.filter(item=>item.group == 'QR_CODE');
    const pembayaran = ref(null);
    const emit = defineEmits('paymentSelected');
    const selectPembayaran = (value)=>{
        emit('paymentSelected',value)
    }
</script>

<style>
   
</style>