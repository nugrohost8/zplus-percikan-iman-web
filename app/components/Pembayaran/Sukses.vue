<template>
  <div>
    <div class="p-3">
        <div class="text-success text-bold text-16 mb-3">Pembayaran Berhasil</div>
        <div  class="d-flex justify-content-between">
            <div class="mb-1">No Invoice </div>
            <div class="mb-1 text-bold">{{ transaction.order_id }}</div>
        </div>
        <div  class="d-flex justify-content-between">
            <div class="mb-1">Dibuat </div>
            <div class="mb-1 text-bold">{{ $formatDate(transaction.created_at) }}</div>
        </div>
        <div  class="d-flex justify-content-between">
            <div class="mb-1">Dibayar <span class="f-right">:</span></div>
            <div class="mb-1 text-bold">{{ transaction.setlement_date ? $formatDate(transaction.setlement_date) : '' }}</div>
        </div>
    </div>
    <div class="separator-pad"></div>
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
        <div class="d-flex justify-content-between align-items-start px-2 mt-2">
            <div class="text-bold">Total</div>
            <div class="text-bold">{{ $formatRupiah(transaction.gross_amount) }} </div>
        </div>

        <div  class="p-3 text-center">
            <div>Kami mengucapkan terimakasih dengan diiringi do’a </div>
            <div><em>Semoga Allah Shubhanahu Wata’ala memberikan pahala atas apa yang diberikan, dan semoga Allah Subhanahu wata’ala memberikan keberkahan atas (harta) anda</em></div>
        </div>
        <div class="text-center my-4">
            <NuxtLink :to="'/'" class="btn-refresh px-3">Teruskan Bersedekah</NuxtLink>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    transaction:Object
})
</script>

<style>

</style>