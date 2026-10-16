<template>
    <div class="py-3">
        <div class="text-center" v-if="jenis == 'Zakat'">
            <div class="arb mb-3">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ مَالِي فَرْضًا لِلَّهِ تَعَالَى</div>
            <div class="mb-3"><em>Nawaitu an ukhrija zakata maali fardhan lillahi ta’ala.</em></div>
            <div class="text-12 mb-4">"Saya niat mengeluarkan zakat mal dari diri saya sendiri sebagai kewajiban karena Allah Ta’ala."</div>
            <div class="text-center">
                ✅ Dengan melakukan pembayaran zakat melalui platform ini, Anda memahami dan menyetujui bahwa zakat akan disalurkan kepada asnaf yang berhak.
            </div>
        </div>
        <div class="text-center" v-else-if="jenis == 'Fitrah'">
            <div class="arb mb-3">ﻧَﻮَﻳْﺖُ أَﻥْ أُﺧْﺮِﺝَ ﺯَﻛَﺎﺓَ ﺍﻟْﻔِﻄْﺮِ ﻋَﻦْ ﻧَﻔْسيْ ﻓَﺮْﺿًﺎ ِﻟﻠﻪِ ﺗَﻌَﺎﻟَﻰ</div>
            <div class="mb-3"><em>Nawaitu an ukhrija zakaatal fithri ‘an nafsii fardhan lillaahi ta’aalaa.</em></div>
            <div class="text-12 mb-4">Saya niat mengeluarkan zakat fitrah untuk diriku sendiri, fardu karena Allah Ta‘âlâ.”</div>
            <div class="text-center">
                ✅ Dengan melakukan pembayaran zakat melalui platform ini, Anda memahami dan menyetujui bahwa zakat akan disalurkan kepada asnaf yang berhak.
            </div>
        </div>
        <div class="text-center" v-else>
            ✅ Dengan melakukan pembayaran infaq melalui platform ini, Anda memahami dan menyetujui bahwa infaq akan disalurkan kepada penerima manfaat yang berhak.
        </div>
        <div class="mt-4">
            <button class="btn  btn-checkout-donasi w-100 py-1 p-relative" aria-label="donate" @click="lanjutDonasi"> 
                <div class="absolute-0 w-100 d-flex justify-content-center"></div>
                <span class="btn-text text-18">Lanjutkan</span>
            </button>
        </div>
    </div>
</template>

<script setup>
    const { $bus } = useNuxtApp();
    const props = defineProps({
        jenis:String
    })
    const emit = defineEmits(["bayar"]);
    const lanjutDonasi = () => {
        $bus.$emit('modal-close');
        emit('bayar');
    }
</script>


<style>
.arb{
    font-size:14px;
    font-weight: bold;
}
</style>