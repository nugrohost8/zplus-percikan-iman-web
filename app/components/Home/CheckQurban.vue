<template>
  <div class="p-3 search-pad bg-white">
    <div class="row justify-content-center">
        <div class="col-lg-10 ">
          <div class="">
            <div class="card-body py-2">
              <div class="text-bold">Cari data qurban mu disini</div>
              <div class="d-flex">
                 <input class="form-control font-18 w-100 search-input" v-model="keyword" type="text"
                    id="no-qurban" placeholder="Nomor Qurban atau Nama Pequrban">
                  <button class="btn btn-md btn-default border-1" @click="searchQurban"><i class="bx bx-search m-auto"></i></button>
              </div>
            </div>
          </div>
            
        </div>
    </div>
    <!-- <NuxtLink :to="'/search-qurban'" class="btn btn-default text-sm bg-green card-radius text-white btn-selengkapnya">Cek status qurban disini <img class="sheep" src="/assets/icons/sheep.svg" alt="sheep"></NuxtLink> -->
  </div>
</template>

<script setup>
  const keyword = ref('');
  const searchQurban = ()=>{
    if(keyword.value){
      navigateTo('/search-qurban?keyword='+keyword.value)
    }
  }
</script>

<style>
.sheep{
    height: 16px;
}

</style>