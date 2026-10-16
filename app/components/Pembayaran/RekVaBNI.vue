<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atmBni'}" @click="setActive('atmBni')">ATM BNI</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'bniMobile'}" @click="setActive('bniMobile')">BNI Mobile</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'internetBanking'}" @click="setActive('internetBanking')">Internet Banking</button>
      </div>
       <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atmBni'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_atm_bni11 }}<strong class="ms-2">{{ t.langkah_atm_bni12 }}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bni21 }}<strong class="ms-2">{{ t.langkah_atm_bni22 }}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bni31 }}<strong class="ms-2">{{ t.langkah_atm_bni32}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bni41 }}<strong class="ms-2">{{ t.langkah_atm_bni42}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bni51 }}<strong class="ms-2">{{ t.langkah_atm_bni52}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bni61 }}<strong class="ms-2">{{ t.langkah_atm_bni62}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bni7 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bni8 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'bniMobile'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_ib_bni11 }}<strong class="ms-2">{{ t.langkah_ib_bni12 }}</strong></li>
                  <li class="mb-1">{{ t.langkah_ib_bni21 }}<strong class="ms-2">{{ t.langkah_ib_bni22 }}</strong></li>
                  <li class="mb-1">{{ t.langkah_ib_bni31 }}<strong class="ms-2">{{ t.langkah_ib_bni32}}</strong><strong class="ms-2">{{ t.langkah_ib_bni33}}</strong></li>
                  <li class="mb-1">{{ t.langkah_ib_bni41 }}</li>
                  <li class="mb-1">{{ t.langkah_ib_bni51 }}<strong class="ms-2">{{ t.langkah_ib_bni52}}</strong></li>
                  <li class="mb-1">{{ t.langkah_ib_bni61 }}<strong class="ms-2">{{ t.langkah_ib_bni62}}</strong></li>
                  <li class="mb-1">{{ t.langkah_ib_bni71 }}<strong class="ms-2">{{ t.langkah_ib_bni72}}</strong><strong class="ms-2">{{ t.langkah_ib_bni73}}</strong></li>
                  <li class="mb-1">{{ t.langkah_ib_bni81 }}<strong class="ms-2">{{ t.langkah_ib_bni82}}</strong></li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'internetBanking'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_mb_bni1 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bni2 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bni3 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bni4 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bni5 }}<strong class="ms-2">{{ transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_mb_bni6 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bni7 }}</li>
                  <li class="mb-1">{{ t.langkah_mb_bni8 }}</li>
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
  const tabActive = ref('');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>

<style>

</style>