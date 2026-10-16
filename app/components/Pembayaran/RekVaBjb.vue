<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atm'}" @click="setActive('atm')">ATM BJB</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'digi'}" @click="setActive('digi')">Mobile Banking (DIGI)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atm'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_atm_bjb1 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bjb2 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bjb3 }}</li>
                  <li class="mb-1">{{ t.langkah_atm_bjb4 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'digi'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_bjb1 }}</li>
                  <li class="mb-1">{{ t.langkah_bjb2 }}</li>
                  <li class="mb-1">{{ t.langkah_bjb3 }}</li>
                  <li class="mb-1">{{ t.langkah_bjb4 }}</li>
                  <li class="mb-1">{{ t.langkah_bjb5 }}</li>
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