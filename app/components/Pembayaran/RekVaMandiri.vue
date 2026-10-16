<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
        <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'Livin'}" @click="setActive('Livin')">Livin</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atmMandiri'}" @click="setActive('atmMandiri')">ATM Mandiri</button>
          
        </div>
        <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'Livin'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_mandiri_livin1 }}</li>
                  <li class="mb-1">{{ t.langkah_mandiri_livin2 }}</li>
                  <li class="mb-1">{{ t.langkah_mandiri_livin3 }}</li>
                  <li class="mb-1">
                      {{ t.langkah_mandiri_livin41 }}
                      <strong class="ms-2">{{transaction.va_number}}</strong>
                      {{ t.langkah_mandiri_livin42 }}
                      <strong class="ms-2">{{ $formatRupiah(transaction.gross_amount) }}</strong>
                      {{ t.langkah_mandiri_livin43 }}
                    </li>
                  <li class="mb-1">{{ t.langkah_mandiri_livin5 }}</li>
                  <li class="mb-1">{{ t.langkah_mandiri_livin6 }}</li>
                  <li class="mb-1">{{ t.langkah_mandiri_livin7 }}</li>
                  <li class="mb-1">{{ t.langkah_mandiri_livin8 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atmMandiri'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_atm_mandiri1 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri2 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri3 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri4 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri5 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri6 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri7 }}</li>
                  <li class="mb-1">
                    <span>{{ t.langkah_atm_mandiri81}} <strong class="ms-2">{{transaction.va_number}}</strong> 
                    {{ t.langkah_atm_mandiri82 }} <strong>{{ $formatRupiah(transaction.gross_amount) }}</strong>,
                    {{ t.langkah_atm_mandiri83 }}</span>
                  </li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri9 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri10 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_mandiri11 }}</li>
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
  const tabActive = ref('Livin');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>


<style>

</style>