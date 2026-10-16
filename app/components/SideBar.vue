<template>
  <div class="sidebar" :class="{active:isActive}" id="sidebar">
    <div class="sidebar-header">
      <nuxt-img :src="'/assets/icons/logo.png'" class="sidebar-logo" :alt="config.public.appName"></nuxt-img><button id="close-sidebar" @click="closeDrawer" class="close-button text-green">&times;</button>
    </div>
    <ul class="sidebar-menu">
      <li><nuxt-link :to="'/program'">Program</nuxt-link></li>
      <li><nuxt-link :to="'/kabar-bahagia'">Kabar Bahagia</nuxt-link></li>
      <li><nuxt-link :to="'/profile-lembaga'">Profile Lembaga</nuxt-link></li>
      <li><nuxt-link :to="'/struktur-lembaga'">Struktur Lembaga</nuxt-link></li>
      <li><nuxt-link :to="'/visi-misi'">Visi Misi</nuxt-link></li>
      <li><nuxt-link :to="'/legal-formal'">Legal Formal</nuxt-link></li>
      <li><nuxt-link :to="'/faq'">FAQ</nuxt-link></li>
      <li><nuxt-link :to="'/kebijakan-privasi'">Kebijakan Privasi</nuxt-link></li>
      <li><nuxt-link :to="'/laporan-keuangan'">Laporan Keuangan</nuxt-link></li>
      <li><nuxt-link :to="'/pengajuan-program'">Pengajuan Program</nuxt-link></li>
    </ul>
  </div>
</template>

<script setup>
/*
import { storeToRefs } from 'pinia'
import { useElemenStore } from "@/stores/elemen";
const elementStore = useElemenStore();
const elemen = storeToRefs(elementStore)
*/
const config = useRuntimeConfig();
const { $bus} = useNuxtApp();
const isActive = ref(false);
function closeDrawer(){
    isActive.value =false;
}
function openDrawer(){
    isActive.value =true;
}
onMounted(()=>{
  $bus.$on('open-drawer',()=>{
    openDrawer();
  })
  $bus.$on('close-drawer',()=>{
    closeDrawer();
  })
})
</script>

<style>

</style>