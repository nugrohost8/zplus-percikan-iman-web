<template>
  <div class="p-3">
      <div class="form-group">
          <label class="text-bold">Modal Usaha  Setahun</label>
          <div class="input-container w-100">
              <input inputmode="numeric" class="form-control form-input-text text-sm mb-3" placeholder="Masukan modal usaha selama setahun" v-model="modal_usaha" @keypress="onlyNumber">
          </div>
      </div>
      <div class="form-group">
          <label class="text-bold">Keuntungan Selama Setahun</label>
          <div class="input-container w-100">
              <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Masukan keuntungan usaha selama setahun" v-model="keuntungan_usaha" @keypress="onlyNumber">
          </div>
      </div>
      <div class="form-group">
          <label class="text-bold">Piutang</label>
          <div class="input-container w-100">
              <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Opsional jika ada" v-model="piutang_usaha" @keypress="onlyNumber">
          </div>
      </div>
      <div class="form-group">
          <label class="text-bold">Hutang Usaha</label>
          <div class="input-container w-100">
              <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Opsional jika ada" v-model="hutang_usaha" @keypress="onlyNumber">
          </div>
      </div>
      <div class="form-group">
          <label class="text-bold">Kerugian</label>
          <div class="input-container w-100">
              <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Opsional jika ada" v-model="kerugian_usaha" @keypress="onlyNumber">
          </div>
      </div>
  </div>
</template>

<script setup>
const { $bus } = useNuxtApp();
  const modal_usaha = ref('')
  const keuntungan_usaha = ref('');
  const piutang_usaha = ref('');
  const hutang_usaha = ref('');
  const kerugian_usaha = ref('');

  watch([modal_usaha,keuntungan_usaha,piutang_usaha,hutang_usaha,kerugian_usaha],()=>{
      let modal  = parseInt(modal_usaha.value.replaceAll('.','')||0);
      let untung  = parseInt(keuntungan_usaha.value.replaceAll('.','')||0);
      let piutang  = parseInt(piutang_usaha.value.replaceAll('.','')||0);
      let utang  = parseInt(hutang_usaha.value.replaceAll('.','')||0);
      let rugi  = parseInt(kerugian_usaha.value.replaceAll('.','')||0);
      let total = modal + untung +piutang - (utang + rugi);
      if($bus !== undefined){
            $bus.$emit('event-zakat',{
                'total':total
            })
        }

  })
  onMounted(()=>{
  
      $bus.$on('tabActivate',()=>{
        modal_usaha.value = '';
        keuntungan_usaha.value = '';
        piutang_usaha.value = '';
        hutang_usaha.value = '';
        kerugian_usaha.value = '';
      })
  })
  watch([modal_usaha,keuntungan_usaha,piutang_usaha,hutang_usaha,kerugian_usaha],([newValue,newValue2,newValue3,newValue4,newValue5])=>{
        modal_usaha.value = new Intl.NumberFormat('ID',{}).format(newValue.toString().replaceAll('.',''));
        keuntungan_usaha.value = new Intl.NumberFormat('ID',{}).format(newValue2.toString().replaceAll('.',''));
        piutang_usaha.value = new Intl.NumberFormat('ID',{}).format(newValue3.toString().replaceAll('.',''));
        hutang_usaha.value = new Intl.NumberFormat('ID',{}).format(newValue4.toString().replaceAll('.',''));
        kerugian_usaha.value = new Intl.NumberFormat('ID',{}).format(newValue5.toString().replaceAll('.',''));
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