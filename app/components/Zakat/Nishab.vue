<template>
  <div class="text-sm">
    <div>Note:</div>
      <div>- Perhitungan zakat diupdate otomatis sesuai harga emas</div>
      <div>- Harga emas per gram saat ini : {{ $formatRupiah(hargaEmas) }}</div>
      <div>- Mengacu pada https://metalpriceapi.com</div>
      <div>- Nishab 85 gram:  {{ $formatRupiah(hargaEmas * 85) }}:</div>
      <div>- Dianjurkan dipotong dari gaji bruto</div>
  </div>
</template>

<script setup>
import { useZakatStore } from "@/stores/zakat";
const zakatStore  = useZakatStore();
const hargaEmas = zakatStore.getHargaEmas

</script>

<style>

</style>