<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atm'}" @click="setActive('atm')">ATM Maybank</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'M2U'}" @click="setActive('M2U')">Mobile Banking (M2U)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atm'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_maybank1 }}</li>
                  <li class="mb-1">{{ t.langkah_maybank2 }}</li>
                  <li class="mb-1">{{ t.langkah_maybank3 }}</li>
                  <li class="mb-1">{{ t.langkah_maybank4 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'M2U'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_m2u_id1 }}</li>
                  <li class="mb-1">{{ t.langkah_m2u_id2 }}</li>
                  <li class="mb-1">{{ t.langkah_m2u_id3 }}</li>
                  <li class="mb-1">{{ t.langkah_m2u_id4 }}</li>
                  <li class="mb-1">{{ t.langkah_m2u_id5 }}</li>
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