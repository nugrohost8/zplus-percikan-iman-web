<template>
    <div class="bubble-container">
        <div class="d-flex justify-content-center">
            <div class="page">
                <div  class="p-relative w-100 h-100">
                    <div class="text-center" :class="{bubble:vShow}">
                        <div>Terima Kasih!</div>
                        <div>Atas Dukungan Yang Anda Berikan!</div>
                    </div>
                </div>
            </div>
         </div>
    </div>
  </template>
  
  <script setup>
    const props= defineProps({
        vShow:Boolean
    })
  </script>
  
  <style>
  .bubble-container {
      /* position: relative; */
      display: inline-block;
  }
  
  .bubble {
      position: absolute;
      bottom: 64px;
      left: 10%;
      width:80%;
      transform: translateX(-50%);
      padding: 10px 20px;
      background: #4caf50;
      color: white;
      border-radius: 20px;
      font-size: 14px;
      opacity: 0;
      transform: scale(0.8) translateX(-50%);
      animation: popup 1s ease-out forwards;
  }
  
  @keyframes popup {
      0% {
      transform: scale(0.1);
      opacity: 0;
      }
      50% {
      transform: scale(1.2);
      opacity: 1;
      }
      
      100% {
      transform: scale(1);
      opacity: 1;
      }
      
  }
  </style>