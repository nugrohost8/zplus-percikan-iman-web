<template>
  <div>
    <div class="zakat-tabs">
        <div class="p-3">
            <div class="header-text">
                <span class="text-16 text-bold">Zakat Kalkulator</span>
            </div>
        </div>
        <div class="px-3">
            <div class="row justify-content-center program-unggulan mb-2" role="tablist" id="tab-form-zakat">
                <div class="col-3 text-center mb-2">
                    <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat" :class="{ 'tab-zakat-active' : tabActive == 'Penghasilan'}" @click="setActive('Penghasilan')">
                        <SvgPenghasilan class="tab-icon"/>
                    </div>
                    <div class="my-1 text-sm">Penghasilan</div>
                </div>
                <div class="col-3 text-center mb-2">
                    <div class="text-center icon-circle icon-circle-md p-0 bg-white tab-zakat"  :class="{ 'tab-zakat-active' : tabActive == 'Tabungan'}" @click="setActive('Tabungan')">
                        <SvgTabungan class="tab-icon"/>
                    </div>
                    <div  class="my-1 text-sm">Tabungan</div>
                </div>
                <div class="col-3 text-center mb-2">
                    <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat"  :class="{ 'tab-zakat-active' : tabActive == 'Perdagangan'}" @click="setActive('Perdagangan')">
                        <SvgPerdagangan class="tab-icon"/>
                    </div>
                    <div  class="my-1 text-sm">Perdagangan</div>
                </div>
                <div class="col-3 text-center mb-2">
                    <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat"  :class="{ 'tab-zakat-active' : tabActive == 'Emas'}" @click="setActive('Emas')">
                        <SvgEmas class="tab-icon"/>
                        
                    </div>
                    <div  class="my-1 text-sm">Emas</div>
                </div>

            </div>
        </div>
    </div>
    <div class="tab-content px-0 pt-0 zakat-content">
            <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'Penghasilan'}" role="tabpanel">
                <transition name="right-to-left">
                    <ZakatPenghasilan v-if="tabActive == 'Penghasilan'" />
                </transition>
            </div>
       
            <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'Tabungan'}"  role="tabpanel">
                <transition name="right-to-left" mode="out-in">
                    <ZakatTabungan v-if="tabActive == 'Tabungan'" />
                </transition>
            </div>
        
            <div class="tab-pane fade"  :class="{ 'active show' : tabActive == 'Perdagangan'}"  role="tabpanel">
                <transition name="right-to-left" mode="out-in">
                    <ZakatPerdagangan v-if="tabActive == 'Perdagangan'" />
                </transition>
            </div>
        
            <div class="tab-pane fade"  :class="{ 'active show' : tabActive == 'Emas'}"  role="tabpanel">
                <transition name="right-to-left" mode="out-in">
                    <ZakatEmas  v-if="tabActive == 'Emas'"/>
                </transition>
            </div>
    </div>
  </div>
</template>

<script setup>
const {$bus }= useNuxtApp()
const tabActive = ref('Penghasilan');
const setActive = (tab)=>{
    tabActive.value = tab;
    $bus.$emit('tabActivate',{tab:tabActive})
}
</script>

<style>
.zakat-content{
    min-height: 332px;
}
</style>