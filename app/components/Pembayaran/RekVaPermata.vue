<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <ol class="mt-3">
        <li class="mb-1">{{ t.langkah_permata11 }}<strong class="ms-2">{{ t.langkah_permata12}}</strong>.</li>
        <li class="mb-1">{{ t.langkah_permata2 }}</li>
        <li class="mb-1">{{ t.langkah_permata3 }}</li>
        <li class="mb-1">{{ t.langkah_permata4 }}</li>
        <li class="mb-1">{{ t.langkah_permata5 }}<strong class="ms-2">{{transaction.va_number}}</strong></li>
        <li class="mb-1">{{ t.langkah_permata6 }}</li>
        <li class="mb-1">{{ t.langkah_permata7 }}</li>
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