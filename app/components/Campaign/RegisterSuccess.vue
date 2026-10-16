<template>
    <div class="modal-overlay" v-if="isVisible">
         <div class="modal-content-1 p-relative">
           <div class="d-flex justify-content-center">
             <div class="page p-3">
               <div class="card card-radius bg-white">
                 <div class="card-body text-center">
                     <div class="text-18">Pendaftaran berhasil</div>
                     <div class="text-center mt-4">
                        <button class="btn btn-green rounded2xl text-w600 mx-2 text-sm px-3 shadow-sm text-white" @click="closeModal">OK</button>
                     </div>
                 </div>
               </div>
             </div>
           </div>
 
         </div>
       </div>
 </template>
 <script setup>
  const { $bus } = useNuxtApp()
    const props = defineProps({
        isVisible:Boolean,
    })
    const closeModal = () => {
        $bus.$emit('close-register-modal')
    }
</script>