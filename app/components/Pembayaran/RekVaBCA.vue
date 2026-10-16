<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atmBca'}" @click="setActive('atmBca')">ATM BCA</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'bcaMobile'}" @click="setActive('bcaMobile')">BCA Mobile</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'internetBanking'}" @click="setActive('internetBanking')">Internet Banking</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atmBca'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_atm_bca1 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca2 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca3 }}<strong class="ms-2">{{transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_atm_bca4 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca5 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca6 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca7 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'bcaMobile'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_mobile_bca1 }}</li>
                  <li class="mb-1">{{ t.langkah_mobile_bca2 }}</li>
                  <li class="mb-1">{{ t.langkah_mobile_bca3 }}</li>
                  <li class="mb-1">{{ t.langkah_mobile_bca4 }}<strong class="ms-2">{{transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_mobile_bca5 }}</li>
                  <li class="mb-1">{{ t.langkah_mobile_bca5 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bca7 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'internetBanking'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_internet_bca1 }}</li>
                  <li class="mb-1">{{ t.langkah_internet_bca2 }}</li>
                  <li class="mb-1">{{ t.langkah_internet_bca3 }}<strong>{{transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_internet_bca4 }}</li>
                  <li class="mb-1">{{ t.langkah_internet_bca5 }}</li>
                  <li class="mb-1">{{ t.langkah_internet_bca6 }}</li>
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
  const tabActive = ref('atmBca');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>

<style>

</style>