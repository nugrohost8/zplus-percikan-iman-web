<template>
    <div class="footer p-3 bg-main">
        <div class="text-center mb-3">
            Jadilah yang pertama dapat kabar bahagia dari kami!
        </div>
        <form @submit.prevent="subscribe">
            <div class="text-center">
                <input class="form-control text-input text-center" type="text" inputmode="email" name="email" required v-model="email" placeholder="Masukan email">
            </div>
            <div class="text-center mt-3">
                <input type="submit" name="submit" class="btn-subscribe btn btn-sm btn-default mb-1" value="Subscribe">
            </div>
        </form>
        <div class="d-flex justify-content-center my-4">
            <div class="mx-1">
                <nuxt-link :to="config.public.facebookUrl" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="socmed-link socmed-fb">
                    <div class="icon-circle icon-circle-sm bg-white">
                        <SvgFacebook />
                    </div>
                </nuxt-link>
            </div>
            <div class="mx-1">
                <nuxt-link :to="config.public.instagramUrl" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="socmed-link socmed-ig">
                    <div class="icon-circle icon-circle-sm bg-white">
                        <SvgInstagram />
                    </div>
                </nuxt-link>
            </div>
            <div class="mx-1">
                <nuxt-link :to="config.public.tiktokUrl" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" class="socmed-link socmed-tk">
                    <div class="icon-circle icon-circle-sm bg-white">
                        <SvgTiktok />
                    </div>
                </nuxt-link>
            </div>
            
            <div class="mx-1">
                <nuxt-link :to="config.public.youtubeUrl" target="_blank" rel="noopener noreferrer" aria-label="Youtube" class="socmed-link socmed-yt">
                    <div class="icon-circle icon-circle-sm bg-white">
                        <SvgYoutube />
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div class="text-justify text-sm my-4">
            <div class="mb-3">
                **Dana yang didonasikan Donatur kepada {{ config.public.appName }} berasal dari Dana yang Halal, bukan bersumber dari tindak pidana korupsi, kriminal serta tindak pidana lainnya, dan tidak ditujukan untuk tindak pencucian uang / Money Laundering termasuk terorisme maupun tindak kejahatan lainnya.
            </div>
            <div>
                **Donatur memberikan kuasa penuh kepada {{ config.public.appName }} atas dana yang didonasikan untuk didistribusikan ke Asnaf dan dikelola sesuai dengan kebijakan program {{ config.public.appName }}.
            </div>
        </div>
        <WidgetModal>
            <div v-if="registerSukses">
                <div class="news-letter-head mb-3">Registrasi Berhasil</div>
                <div>Anda akan menerima informasi pembaharuan yang akan kami kirim melalui email</div>
            </div>
            <div v-else>
                <div class="news-letter-head mb-3 text-center">Registrasi Gagal</div>
                <div class="text-center">{{ error_subscribe }}</div>
                <div class="text-center">Pastikan email yang anda masukan sudah benar</div>
            </div>
            <div class="text-center my-3">
                <button type="submit" name="submit" class="text-submit col-6" @click="closeModal">Tutup</button>
            </div>
        </WidgetModal>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const nama = ref('');
const email = ref('');
const error_subscribe = ref('');
const {$bus} = useNuxtApp();
const registerSukses = ref(true);
function subscribe(){
    const formData = new FormData();
    formData.append('nama',nama.value);
    formData.append('email',email.value);
   
    $fetch(`${config.public.baseUrl}subscribe`,{
        method:'POST',
        body:formData,
        lazy: true
    }).then(response=>{
        console.log(response);
        if(response.status == 1){
            registerSukses.value= true;
            email.value = '';
            nama.value = '';
        }else{
            error_subscribe.value = response.message;
            registerSukses.value = false;
        }
        $bus.$emit('modal-open');
    })
    
}
function closeModal(){
    $bus.$emit('modal-close');
}
</script>

<style>


</style>