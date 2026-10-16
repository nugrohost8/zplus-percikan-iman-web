<template>
  <div class="px-3">
    <div class="d-flex justify-content-center">
        <div class="w-30 d-flex align-items-center p-2">
            <input name="mode_zakat" type="radio" class="form-check-input mt-0 me-2" :value="'tahun'" v-model="mode_zakat" autocomplete="off" :ckecked="mode_zakat == 'tahun'">
            <div class="">PerTahun</div>
        </div>
        <div class="w-30 d-flex align-items-center p-2">
            <input name="mode_zakat" type="radio" class="form-check-input mt-0 me-2" :value="'bulan'" v-model="mode_zakat" autocomplete="off" :ckecked="mode_zakat == 'bulan'">
            <div class="">PerBulan</div>
        </div>
    </div>
    <div class="form-group">
      <label class="text-bold">Penghasilan Per Bulan</label>
      <div class="input-container w-100">
          <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Masukan penghasilan bulanan anda" v-model="penghasilan_bulanan" @keypress="onlyNumber">
        </div>
    </div>
    <div class="form-group">
      <label class="text-bold">Pendapatan Lain (Bonus,THR,Komisi)</label>
      <div class="input-container w-100">
          <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Opsional jika ada" v-model="pendapatan_lain" @keypress="onlyNumber">
        </div>
    </div>
    <!-- 
    <div class="form-group">
      <label class="text-bold">Pengeluaran kebutuhan pokok /bulan</label>
      <div class="input-container w-100">
          <input inputmode="numeric" class="form-control form-input-text text-sm mb-3" placeholder="Masukan pengeluaran pokok anda" v-model="pengeluaran_pokok" @keypress="onlyNumber">
        </div>
    </div>
    -->
  </div>
</template>

<script setup>
    const {$bus }= useNuxtApp()
    const mode_zakat = ref('tahun');
    const penghasilan_bulanan = ref('');
    const pendapatan_lain = ref('');
    const pengeluaran_pokok = ref('');
    const totalPenghasilan = ref('0');
    const calculate = ()=>{
      let penghasilan = parseInt(penghasilan_bulanan.value.replaceAll('.','')||0) * 12;
      let penghasilan_lain = parseInt(pendapatan_lain.value.replaceAll('.','')|0);
      let pengeluaran = parseInt(pengeluaran_pokok.value.replaceAll('.','')|0) * 12;
      totalPenghasilan.value = penghasilan + penghasilan_lain - pengeluaran;
      //wajibZakat.value = totalPenghasilan.value > (hargaEmas.value * 85);
      //totalZakat.value = totalPenghasilan.value * (2.5 / 100);
      
      if($bus !== undefined){
        $bus.$emit('event-zakat',{
          'mode_zakat':mode_zakat.value,
          'total':totalPenghasilan.value
        })      
      }
      
    }
    onMounted(()=>{
        $bus.$on('tabActivate',(data)=>{
          penghasilan_bulanan.value = '';
          pendapatan_lain.value = '';
          pengeluaran_pokok.value = '';
          mode_zakat.value = 'tahun'
        })
    })
    watch([penghasilan_bulanan,pendapatan_lain,pengeluaran_pokok,mode_zakat],([newValue,newValue2,newValue3,newValue4])=>{
        penghasilan_bulanan.value = new Intl.NumberFormat('ID',{}).format(newValue.toString().replaceAll('.',''));
        pendapatan_lain.value = new Intl.NumberFormat('ID',{}).format(newValue2.toString().replaceAll('.',''));
        pengeluaran_pokok.value = new Intl.NumberFormat('ID',{}).format(newValue3.toString().replaceAll('.',''));
        calculate();
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