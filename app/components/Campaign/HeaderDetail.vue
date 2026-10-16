<template>
  <div class="fixed-0">
      <div class="d-flex justify-content-center">
        <div class="page">
          <nav class="navbar navbar-dark bg-white navbar-expand p-0 align-items-center header-bar bg-white" id="header-program">
            <div class="me-1">
              <nuxt-link :to="'/'">
                <nuxt-img :src="'/assets/icons/logo.png'" preload loading="lazy" :alt="$config.public.appName" class="logo-header ms-3"></nuxt-img>
              </nuxt-link>
            </div>
            <div  class="flex-grow-1"></div>
            
            <WidgetCartButton class="me-1"/>
          </nav>
          <div class="header-bottom"></div>
        </div>
      </div>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();
</script>

<style>

</style>