<template>
    <div class="p-3">
        <div class="form-group">
          <label class="text-bold">Jumlah Emas(dalam gram)</label>
          <div class="input-container w-100">
              <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Masukan total berat emas anda" v-model="jumlah_emas" @keypress="onlyNumber">
          </div>
      </div>
    </div>
</template>

<script setup>
const { $bus } = useNuxtApp();
import { useZakatStore } from "@/stores/zakat";
const zakatStore  = useZakatStore();
const hargaEmas = zakatStore.getHargaEmas
const jumlah_emas = ref('')
watch(jumlah_emas,(newValue)=>{
    let total = parseInt(newValue.replaceAll('.','')||0) * hargaEmas;
    
    if($bus !== undefined){
            $bus.$emit('event-zakat',{
                'total':total
            })
        }
})
onMounted(()=>{
    
      $bus.$on('tabActivate',()=>{
          jumlah_emas.value = '';
        })
})

const onlyNumber =  ($event)=> {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
      }
    }
</script>

<style>

</style>