<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atmBsi'}" @click="setActive('atmBsi')">ATM BSI</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'bsiMobile'}" @click="setActive('bsiMobile')">Mobile Banking BSI (BYOND)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atmBsi'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_atm_bsi1 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bsi2 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bsi3 }}<strong class="ms-2">{{transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bsi4 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bsi5 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bsi6 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca7 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'bsiMobile'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_mb_bsi1 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bsi2 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bsi3 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bsi41 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bsi5 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bsi6 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bsi7 }}</li>
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
  const tabActive = ref('atmBsi');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>

<style>

</style>