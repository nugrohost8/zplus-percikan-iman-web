<template>
   <div>
        <div  class="text-half-bl py-2">{{ doa.content }}</div>
        <div class="d-flex align-items-center">
            <div class="green-rect no-wrap" :class="{ clicked: isClicked}" @click="amiin()">
                <SvgHeart width="24" height="24" class="icon-favourite me-1" :class="{ clicked: isClicked}"/>
            </div>
            <div class="text-sm text-half-bl ms-2" v-if="doa?.likes?.length == 0">Jadilah yang pertama untuk mengaminkan Doa ini</div>
            <div v-else>Amiin ({{ doa?.likes?.length }})</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    doa:Object
})
const config = useRuntimeConfig();
  import {
    useDonaturStore
  } from "@/stores/donatur";
const donaturStore = useDonaturStore();
const doa = props.doa;
const isClicked = ref(false);
const timeout = ref();
const likeToSubmit = ref([]);
const amiin = (doa)=>{
    isClicked.value = true;
    likeDoa();
    setTimeout(() => {
        isClicked.value = false;
    }, 1000);
        
}
const likeDoa = ()=>{
    clearTimeout(timeout);
    timeout.value = setTimeout(function() {
            submitLike();
        }, 3000);
}

const submitLike = ()=>{
    var donatur = donaturStore.donaturObj;
    $fetch(`${config.public.baseUrl}front-end/amin-doa`, {
        method: "post",
        body: {
            ids: [doa.id],
            id_donatur:donatur?.id
        },
    }).then((response) => {
        doa.likes.push({
            donatur_id:donatur.id,
            doa_id:doa.id
        })
    }).catch(err => console.log(err))
}

onBeforeUnmount(()=>{
    clearTimeout(timeout);
})
</script>

<style scoped>
.icon-favourite.clicked{
    transition: all 2s;
    animation: popup 1s ease-out forwards;
    /* transform: scale(1.3); */
    
}
.green-rect{
    cursor:pointer;
}
@keyframes popup {
      0% {
      transform: scale(0.1);
      opacity: 0;
      }
      50% {
      transform: scale(1.6);
      opacity: 1;
      }
      
      100% {
      transform: scale(1);
      opacity: 1;
      }
      
  }
</style>