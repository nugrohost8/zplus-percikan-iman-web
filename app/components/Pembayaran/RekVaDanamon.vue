<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'atm'}" @click="setActive('atm')">ATM Danamon</button>
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'dbankpro'}" @click="setActive('dbankpro')">Mobile Banking (D-Bank)</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'atm'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_danamon1 }}</li>
                  <li class="mb-1">{{ t.langkah_danamon2 }}</li>
                  <li class="mb-1">{{ t.langkah_danamon3 }}</li>
                  <li class="mb-1">{{ t.langkah_danamon4 }}</li>
                  <li class="mb-1">{{ t.langkah_danamon5 }}</li>
                </ol>
              </transition>
          </div>
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'dbankpro'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_dbank1 }}</li>
                  <li class="mb-1">{{ t.langkah_dbank2 }}</li>
                  <li class="mb-1">{{ t.langkah_dbank3 }}</li>
                  <li class="mb-1">{{ t.langkah_dbank4 }}</li>
                  <li class="mb-1">{{ t.langkah_dbank5 }}</li>
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