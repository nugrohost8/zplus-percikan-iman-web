<template>
  <div class="bg-white pt-56">
    <div class="p-3" v-if="campaign !== null">
        <div class="text-green text-w500">Bantuan {{ campaign.program }}</div>
        <h4 class="text-bold text-24 text-center mt-3">
            {{ campaign.title }}
        </h4>
    </div>
</div>
</template>

<script setup>
    const prop = defineProps({
        campaign:Object,
        require:true
    })
</script>

<style>

</style>