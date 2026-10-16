<template>
  <div>
    <div class="p-3">
        <div class="text-bold text-16 mb-3">Pembayaran Tertunda</div>
        <div  class="d-flex justify-content-between">
            <div class="mb-2">No Invoice</div>
            <div class="mb-1 text-bold">{{ transaction.order_id }}</div>
        </div>
        <div  class="d-flex justify-content-between">
            <div class="mb-1">Dibuat</div>
            <div class="mb-1 text-bold">{{ $formatDate(transaction.created_at) }}</div>
        </div>
        <div  class="d-flex justify-content-between">
            <div class="mb-1">Status <span class="f-right">:</span></div>
            <div class="mb-1 text-bold">
                Tertunda
            </div>
        </div>
        <div class="card border-1 my-3">
            <div class="card-body">
                <div v-if="transaction?.payment_code == 'QRIS'">
                    <hr>
                    <div class="text-center">
                        <img src="/assets/icons/qris-font.png" alt="icon-payment" title="icon-payment" style="max-width: 110px; max-height: 40px; margin-bottom: 4px;"/>
                    </div>
                    <div class="w-100 text-center" v-if="transaction?.qris_code">
                        <client-only>
                            <qr-code :value="transaction?.qris_code" :variant="'default'" :radius="1" class="qr-code" :options="{ width: '100%',height:'100%' }" ref="qrCodeRef" />
                        </client-only>
                    </div>
                    <div class="text-center">
                        <button class="btn btnsm btn-default text-primary" @click="downloadQRCode">
                            <i class="bx bx-download me-2"></i> Download
                        </button>
                    </div>
                    <div class="font-weight-bold">Instruksi Pembayaran</div>
                    <div>1. Buka aplikasi e-wallet pilihan Anda (ShopeePay, Gopay, LinkAja, OVO, DANA, dll) atau mobile banking (mBCA, Livin by Mandiri, BRImo, dsb)</div>
                    <div>2. Scan QR di atas atau klik tombol download</div>
                    <div>3. Selesaikan pembayaran melalui aplikasi tersebut</div>
                    <div>4. Klik tombol "Cek status pembayaran" setelah pembayaran selesai</div>
                    <hr>
                </div>
                <div class="d-flex justify-content-between align-items-center" v-else>
                    <NuxtImg :src="transaction?.payment_type?.icon" class="icon-payment" />
                    <div class="text-bold flex-grow-1 mx-2">
                        {{ transaction?.va_number }}
                        <span id="copy-tooltip" class="tooltip-copy" :class="{'show':copied}">Disalin ke papan klip</span>
                    </div>
                    <a href="#" class="text-bold text-link" @click="copyToClipboard">Salin</a>
                </div>
            </div>
        </div>
        <div class="mb-3">Nominal Donasi</div>
        <div class="text-bold text-18">{{ $formatRupiah(transaction?.gross_amount) }}</div>
        <div class="mt-3 text-center">
            <div class="bg-label-warning fw-semibold text-three-fourt-bl p-3">
                <div class="text-bold text-14">Transfer sebelum</div>
                <div class="text-14 text-bold">{{ $formatDateTime(transaction?.expiration_time) }}</div>
                <div class="small"><i class="bx bx-time-five text-13 me-2"></i>{{ time }}</div>
            </div>
        </div>
    </div>
   
    <div class="separator-pad"></div>
    <div v-if="transaction?.payment_code !== 'QRIS'">
        <PembayaranPanduan :paymentCode="transaction?.payment_code" :transaction="transaction"/>
        <div class="separator-pad"></div>
    </div>
    <div class="p-3">
        <div class="d-flex mb-1 justify-content-between">
            <div class="text-bold">{{ transaction.nama_lengkap }}</div>
        </div>
        <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
                <div>{{ transaction.email}}</div>
                <div>{{ transaction.no_hape }}</div>
            </div>
        </div>
        <div class="d-flex justify-content-between bg-grey p-2">
            <div>Deskripsi</div>
            <div>Nominal Donasi</div>
        </div>

        <div v-for="(donasi,index) in transaction.donations" :key="index" class="px-2 py-3">
            <div class="d-flex justify-content-between align-items-start">
                <div class="text-half-bl">{{ donasi.campaign?.title }}</div>
                <div class="text-half-bl">{{ $formatRupiah(donasi.nominal) }}</div>
            </div>
            <hr class="bg-secondary" />
        </div>
        <div class="d-flex justify-content-between align-items-start px-2">
            <div class="text-bold">Total</div>
            <div class="text-bold">{{ $formatRupiah(transaction.gross_amount) }} </div>
        </div>
    </div>
    <div class="separator-pad"></div>
    <div class="p-3">
        <div  class="p-3 text-center">
            <div class="mb-3">Sahabat, transaksi mu masih proses penerimaan, mohon tunggu.</div>
            <button class="btn border-1 border-primary text-primary" @click="checkPembayaran">Cek Status Pembayaran</button>
        </div>
        <div class="row justify-content-center my-4">
            <div class="col-6 pe-1">
                <button class="btn btn-sm btn-refresh card-radius w-100 p-2 text-sm text-half-bl" @click="refresh">Segarkan Halaman</button>
            </div>
            <div class="col-6 ps-1">
                <NuxtLink :to="'/'" class="btn btn-sm btn-donate card-radius text-sm w-100 p-2">Teruskan Bersedekah</NuxtLink>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    transaction:Object
})
const config = useRuntimeConfig();
const trans = props.transaction;
const {$moment,$swal} = useNuxtApp();
const waktuHabis = ref(false)
const time = ref('');
const refresh = ()=>{
    window.location.reload();
}
const vaNumber = ref();
const copied = ref(false);
const qrCodeRef = ref(null);
onMounted(()=>{
    console.log(trans)
    showTimeInterval();
})
const  showTimeInterval = ()=>{
        if(trans !== undefined){
        setInterval(()=>{
                let then = trans.expiration_time;
                let now = $moment();
                let duration = $moment.duration($moment(then).diff(now));
                
                if(duration.days() > 0){
                    time.value = duration.days() + " hari, " + duration.hours() + " jam, " + duration.minutes() + " menit, " + duration.seconds() + " detik";
                    waktuHabis.value= false
                }else if(duration.hours() > 0){
                    time.value = duration.hours() + " jam, " + duration.minutes() + " menit, " + duration.seconds() + " detik";
                    waktuHabis.value= false
                }else if(duration.minutes() > 0){
                    time.value = duration.minutes() + " menit, " + duration.seconds() + " detik";
                    waktuHabis.value= false
                }else if(duration.seconds() > 0){
                    time.value = duration.seconds() + " detik";
                    waktuHabis.value= false
                }else{
                    time.value = 'Waktu habis'
                    waktuHabis.value= true
                }
            },1000)
        }
    }

const copyToClipboard = async ()=>{
    try {
        await navigator.clipboard.writeText(props.transaction?.va_number?.trim() ?? '');
        showTooltip();
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}
const showTooltip = ()=>{
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
}

const checkPembayaran = async ()=>{
    const { data,status} = await $fetch(config.public.baseUrl + 'front-end/check-pembayaran',{
        method:'POST',
        body:{
            order_id:props.transaction?.order_id
        },
    });
    if(status == 1){
        if(data.status == 'pending'){
            $swal.fire('Pembayaran Tertunda', 'Transaksi anda masih tertunda, silahkan selesaikan pembayaran sebelum batas waktu yang ditentukan.', 'warning').then(result=>{
                
            });
        }else if(data.status == 'paid'){
            $swal.fire('Pembayaran Berhasil', 'Terima kasih donasi anda sudah masuk ke sistem kami.', 'success').then(result=>{
                if(result.isConfirmed){
                    window.location.reload();
                }
            });
        }
    }
}

const downloadQRCode = () => {
    if (qrCodeRef.value) {
        const qrComponent = qrCodeRef.value;
        const canvas = qrComponent.$el;

        if (canvas) {
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = image;
            link.click();
        } else {
            console.error('Canvas element not found in QR code component');
        }
    } else {
        console.error('QR code component reference not available');
    }
};
</script>

<style scoped>
    .bg-label-warning{
        background-color: #fef8c2;
    }

    .tooltip-copy {
        visibility: hidden; /* Hidden by default */
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        padding: 5px 10px;
        position: absolute;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s, visibility 0.3s;
        /* Position the tooltip relative to its container or the button */
    }

    .tooltip-copy.show {
        visibility: visible;
        opacity: 1;
    }
    .qr-code{
        margin:0 auto;
    }
</style>