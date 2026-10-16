<template>
  <div class="sharebar" :class="{active:isActive}">
        <div class="d-flex justify-content-center">
            <div class="page bg-white">
                <div class="d-flex justify-content-between p-3 align-items-center">
                    <div class="text-green text-bold">Bagikan</div>
                    <button class="btn btn-sm btn-default text-18 text-bold" @click="closeBottomBar">X</button>
                </div>
                <div class="px-3 pb-4">
                    <div class="row">
                        <div class="col-4">
                            <div class="text-center">
                                <SvgWhatsapp @click="shareMedia('whatsapp')"/>
                                <div>Whatsapp</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center">
                                <SvgFacebookShare @click="shareMedia('facebook')"/>
                                <div>Facebook</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center">
                                <SvgTwitterShare @click="shareMedia('twitter')"/>
                                <div>Twitter</div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        
  </div>
</template>

<script setup>
    const props = defineProps({
        data:Object
    })
const { $bus,$shareIt} = useNuxtApp();
const route = useRoute();
const config = useRuntimeConfig();
const isActive = ref(false);
function closeBottomBar(){
    isActive.value =false;
}

onMounted(()=>{
  $bus.$on('toggle-bottom-bar',()=>{
    console.log("Toogle bottom bar");
    isActive.value = !isActive.value;
  })
  $bus.$on('close-bottom-bar',()=>{
    closeBottomBar();
  })
})

async function shareMedia(page){
    let url = config.public.baseAppUrl + route.path.slice(1);
    $bus.$emit('share-media',({
        url:url,
        page:page,
    }))
    
}

</script>

<style>

</style>