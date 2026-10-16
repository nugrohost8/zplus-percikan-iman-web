<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'btnmobile'}" @click="setActive('btnmobile')">Mobile Banking</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'btnmobile'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_btn1 }}</li>
                  <li class="mb-1">{{ t.langkah_btn2 }}</li>
                  <li class="mb-1">{{ t.langkah_btn3 }}</li>
                  <li class="mb-1">{{ t.langkah_btn4 }}</li>
                  <li class="mb-1">{{ t.langkah_btn5 }}</li>
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