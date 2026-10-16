<template>
   <div class="modal-overlay" v-if="isVisible" @click="closeModal">
        <div class="d-flex justify-content-center">
            <div class="page">
                <div class="modal-content w-auto" @click.stop>
                    <div class="p-2">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const {$bus} = useNuxtApp();
/*

*/

onMounted(()=>{
    $bus.$on('modal-open', function(){
        openModal();
    } );
    $bus.$on('modal-close', function(){
        isVisible.value= false;
    } );
})
const isVisible = ref(false);

function openModal(){
    isVisible.value= true;
}
function closeModal(){
    isVisible.value= false;
}
</script>

<style>

</style>