<template>
    <div class="p-3">
        <div class="form-group">
            <label class="text-bold">Saldo Tabungan</label>
            <div class="input-container w-100">
                <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Masukan saldo tabungan terakhir" v-model="saldo_tabungan" @keypress="onlyNumber">
            </div>
        </div>
        <div class="form-group">
            <label class="text-bold">Bunga (Bank Konvensional)</label>
            <div class="input-container w-100">
                <input inputmode="numeric" class="form-control form-control-sm form-input-text text-sm mb-2" placeholder="Opsional jika ada" v-model="bunga_tabungan" @keypress="onlyNumber">
            </div>
        </div>
    </div>
</template>

<script setup>
    const { $bus } = useNuxtApp();
    const saldo_tabungan = ref('');
    const bunga_tabungan = ref('');

    watch([saldo_tabungan,bunga_tabungan],()=>{
        saldo_tabungan.value = new Intl.NumberFormat('ID',{}).format(saldo_tabungan.value.toString().replaceAll('.',''));
        bunga_tabungan.value = new Intl.NumberFormat('ID',{}).format(bunga_tabungan.value.toString().replaceAll('.',''));
        let saldo = parseInt(saldo_tabungan.value.replaceAll('.','')||0);
        let bunga = parseInt(bunga_tabungan.value.replaceAll('.','')||0);
        let total = saldo + bunga;
        if($bus !== undefined){
            $bus.$emit('event-zakat',{
                'total':total
            })
        }
    })
    onMounted(()=>{
        
        $bus.$on('tabActivate',()=>{
          saldo_tabungan.value = '';
          bunga_tabungan.value = '';
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