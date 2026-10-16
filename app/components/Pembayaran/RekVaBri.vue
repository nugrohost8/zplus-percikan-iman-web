<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atmBri'}" @click="setActive('atmBri')">ATM BRI</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'brimo'}" @click="setActive('brimo')">Mobile Banking BRI (BRImo)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atmBri'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_atmbri1 }}</li>
                  <li class="mb-1">{{ t.langkah_atmbri2 }}</li>
                  <li class="mb-1">{{ t.langkah_atmbri3 }}<strong class="ms-2">{{transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atmbri4 }}</li>
                  <li class="mb-1">{{ t.langkah_atmbri5 }}</li>
                  <li class="mb-1">{{ t.langkah_atmbri6 }}</li>
                  <li class="mb-1">{{ t.langkah_atmbri7 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'brimo'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_mbri1 }}</li>
                  <li class="mb-1">{{ t.langkah_mbri2 }}</li>
                  <li class="mb-1">{{ t.langkah_mbri3 }}</li>
                  <li class="mb-1">{{ t.langkah_mbri4 }}</li>
                  <li class="mb-1">{{ t.langkah_mbri5 }}</li>
                  <li class="mb-1">{{ t.langkah_mbri6 }}</li>
                  <li class="mb-1">{{ t.langkah_mbri7 }}</li>
                </ol>
              </transition>
          </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
  const props = defineProps({
    t:Object,
    transaction:Object
  })
  const tabActive = ref('atmBri');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>

<style>

</style>