<template>
  <div>
    <div class="text-bold">Panduan Pembayaran</div>
    <div class="card-modal my-3" scrollable>
      <div class="d-flex">
          <button class="btn btn-sm border-1" :class="{ 'tab-panduan-active' : tabActive == 'neoApp'}" @click="setActive('neoApp')">App Neobank</button>
      </div>
      <div class="tab-content px-0 pt-3">
          <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'neoApp'}" role="tabpanel">
              <transition name="right-to-left" mode="out-in">
                <ol>
                  <li class="mb-1">{{ t.langkah_neo_app1 }}</li>
                  <li class="mb-1">{{ t.langkah_neo_app2 }}</li>
                  <li class="mb-1">{{ t.langkah_neo_app3 }}<strong class="ms-2">{{transaction?.va_number}}</strong></li>
                  <li class="mb-1">{{ t.langkah_neo_app4 }}</li>
                  <li class="mb-1">{{ t.langkah_neo_app5 }}</li>
                  <li class="mb-1">{{ t.langkah_neo_app6 }}</li>
                  <li class="mb-1">{{ t.langkah_neo_app7 }}</li>
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
  const tabActive = ref('neoApp');
  const setActive = (tab)=>{
    tabActive.value = tab;
  }
</script>

<style>

</style>