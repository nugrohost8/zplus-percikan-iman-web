<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atm'}" @click="setActive('atm')">ATM CIMB</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'octo'}" @click="setActive('octo')">Mobile Banking (Octo Mobile)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atm'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_cimb1 }}</li>
                  <li class="mb-1">{{ t.langkah_cimb2 }}</li>
                  <li class="mb-1">{{ t.langkah_cimb3 }}</li>
                  <li class="mb-1">{{ t.langkah_cimb4 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'octo'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_octo_mobile1 }}</li>
                  <li class="mb-1">{{ t.langkah_octo_mobile2 }}</li>
                  <li class="mb-1">{{ t.langkah_octo_mobile3 }}</li>
                  <li class="mb-1">{{ t.langkah_octo_mobile4 }}</li>
                  <li class="mb-1">{{ t.langkah_octo_mobile5 }}</li>
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
  const tabActive = ref('atm');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>

<style>

</style>