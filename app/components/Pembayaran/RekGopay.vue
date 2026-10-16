<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="text-center my-4">
          <img
          class="qr-image"
          :src="transaction.gopay_qrcode"
          alt="qr-code"
          title="qr-code"
          />
      </div>
    <ol class="mt-3">
        <li class="mb-1">
          <span class="item-name">{{ t.langkah_gopay11 }} <strong>Gojek</strong>
                {{ t.langkah_gopay12 }}
                <strong>e-wallet</strong>
                {{ t.langkah_gopay13 }}</span
              >
        </li>
        <li class="mb-1">
           <span class="item-name"
                ><strong>{{ t.langkah_gopay21 }}</strong>
                {{ t.langkah_gopay22 }}</span
              >
              <div class="table-images text-center">
                <img
                  class="qr-instruction my-3"
                  alt="QR Instruction"
                  title="QR Instruction"
                  width="50%"
                  src="//d2f3dnusg0rbp7.cloudfront.net/snap/assets/qr-instruction-2-76e4903a94594acce1954b8b037bb321ce1770d703406ba8f2d4290d368ee574.png"
                />
              </div>
        </li>
        <li class="mb-1">
          <span class="item-name">{{ t.langkah_gopay31 }}
                <strong>{{ t.langkah_gopay32 }}</strong></span>
        </li>
        <li class="mb-1">
          <span class="item-name">{{ t.langkah_gopay41 }}
              <strong>{{ t.langkah_gopay42 }}</strong></span>
        </li>
        <li class="mb-1"><span class="item-name">{{t.langkah_gopay5}}</span></li>
    </ol>
  </div>
</template>

<script setup>
 const props = defineProps({
    t:Object,
    transaction:Object
  })
</script>

<style>

</style>