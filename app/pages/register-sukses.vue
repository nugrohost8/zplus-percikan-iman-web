<template>
    <div class="d-flex justify-content-center">
          <div class="page">
              <HomeHeaderWhite />
              <div class="pt-56 bg-white full-page ">
                  <div class="program-unggulan p-4" v-if="!error">
                      <div class="header-text">
                          <span class="text-bold">Pendaftaran Berhasil</span>
                      </div>
                      <div class="">
                        <div class="card-body text-center">
                            <SvgRegisterSuccess />
                        </div>
                        <div class="my-4 text-center">
                            <div class="text-bold text-18 text-green">Selamat</div>
                            <div>Terima kasih telah menjadi bagian dari {{ config.public.appName }}</div>
                            <div>Data anda akan di verifikasi oleh Team kami, Anda akan menerima Email konfirmasi setelah proses verifikasi selesai</div>
                            <div class="text-center mt-4">
                                <nuxt-link :to="'/'" class="btn bg-green text-white card-radius btn-add-donasi">
                                <i class="bx bxs-home"></i> Teruskan Sedekah
                                </nuxt-link>
                            </div>
                        </div>
                      </div>
                  </div>
                  <div v-else class="program-unggulan p-4">
                    <div class="half-page bg-white d-flex justify-content-center align-items-center">
                        <div class="text-center">
                        <div class="text-32 text-bold">OOPS!</div>
                        <div class="text-center">Terjadi Kesalahan</div>
                        <div class="text-center mt-4">
                            <nuxt-link :to="'/'" class="btn bg-green text-white card-radius btn-add-donasi">
                            <i class="bx bxs-home"></i> Teruskan Sedekah
                            </nuxt-link>
                        </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </template>
<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const error = ref(false);
onMounted(()=>{
    try{
        let query = route.query.data;
        var decodedStringAtoB = atob(query);
        console.log(decodedStringAtoB);
    }catch(err){
        error.value = true;
    }
})
</script>
<style>
.half-page{
    height:50vh;
}
</style>