<template>
    <div class="p-3">
        <div class="header-text mb-3">
            <span class="text-16 text-bold">Rekomendasi Program</span>
        </div>
         <div class="text-half-bl text-12 text-center mb-2">Temukan beragam program kebaikan yang direkomendasikan untukmu</div>
        <div class="d-flex overflow-x-auto pilar-slide">
            <div class="w-30 text-center mx-2">
                <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat" :class="{ 'tab-zakat-active' : activeTab == 'Pendidikan'}" @click="setActive('Pendidikan')">
                    <SvgPendidikan class="tab-icon"/>
                </div>
                <div class="my-1 text-sm text-half-bl">Pendidikan</div>
            </div>
            <div class="w-30 text-center mx-2">
                <div class="text-center icon-circle icon-circle-md p-0 bg-white tab-zakat"  :class="{ 'tab-zakat-active' : activeTab == 'Kesehatan'}" @click="setActive('Kesehatan')">
                    <SvgKesehatan class="tab-icon"/>
                </div>
                <div  class="my-1 text-sm text-half-bl">Kesehatan</div>
            </div>
            <div class="w-30 text-center mx-2">
                <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat"  :class="{ 'tab-zakat-active' : activeTab == 'Ekonomi'}" @click="setActive('Ekonomi')">
                    <SvgEkonomi class="tab-icon"/>
                </div>
                <div  class="my-1 text-sm text-half-bl">Ekonomi</div>
            </div>
            <div class="w-30 text-center mx-2">
                <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat"  :class="{ 'tab-zakat-active' : activeTab == 'Kemanusiaan'}" @click="setActive('Kemanusiaan')">
                    <SvgKemanusiaan class="tab-icon"/>
                </div>
                <div  class="my-1 text-sm text-half-bl">Kemanusiaan</div>
            </div>
            <div class="w-30 text-center mx-2">
                <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat"  :class="{ 'tab-zakat-active' : activeTab == 'Dakwah Dan Advokasi'}" @click="setActive('Dakwah Dan Advokasi')">
                    <SvgDakwah class="tab-icon"/>
                </div>
                <div  class="my-1 text-sm text-half-bl">Dakwah</div>
            </div>
            <div class="w-30 text-center mx-2">
                <div class="text-center icon-circle icon-circle-md bg-white p-0 tab-zakat"  :class="{ 'tab-zakat-active' : activeTab == 'Semua'}" @click="setActive('Semua')">
                    <SvgSemua class="tab-icon"/>
                </div>
                <div  class="my-1 text-sm text-half-bl">Semua</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name:String,
    pilarProgram:Array
})
const config = useRuntimeConfig();
const STORAGE_URL = config.public.storageUrl;
const selectedProgram = props;
const activeTab = ref('')
const emit = defineEmits(['openProgram']);
const setActive = (page)=>{
    activeTab.value = page
    emit('openProgram',page);
}

onMounted(()=>{
    activeTab.value = selectedProgram.name
    
    /*
    if(program.name !== undefined){
        activeTab.value = program.name
        if(program.name == 'Kemanusiaan'){
            if(tabKemanusiaan.value){
                tabKemanusiaan.value.$el.scrollIntoView({behaviour:'smooth'})
            }
        }else if(program.name == 'Duafa'){
            if(tabDuafa.value){
                tabDuafa.value.$el.scrollIntoView({behaviour:'smooth'})
            }
        }
    }
    */
    
})

</script>

<style scoped>
   
</style>