<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atm'}" @click="setActive('atm')">ATM Sinarmas</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'simobi'}" @click="setActive('simobi')">Mobile Banking (SIMOBI)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atm'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_sinarmas1 }}</li>
                  <li class="mb-1">{{ t.langkah_sinarmas2 }}</li>
                  <li class="mb-1">{{ t.langkah_sinarmas3 }}</li>
                  <li class="mb-1">{{ t.langkah_sinarmas4 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'simobi'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_simobi1 }}</li>
                  <li class="mb-1">{{ t.langkah_simobi2 }}</li>
                  <li class="mb-1">{{ t.langkah_simobi3 }}</li>
                  <li class="mb-1">{{ t.langkah_simobi4 }}</li>
                  <li class="mb-1">{{ t.langkah_simobi5 }}</li>
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