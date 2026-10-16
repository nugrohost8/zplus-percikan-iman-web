<template>
  <div>
    <div class="text-center copyright p-3">©2024. Zplus. All Rights Reserved.</div>
    <div :class="{ 'bottom-footer' : needShow}"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  needShow:Boolean
})
</script>

<style>

</style>