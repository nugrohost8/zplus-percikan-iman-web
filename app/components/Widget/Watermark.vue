<template>
    <div class="watermark-box">
          <div class="watermark-box-overlay">
              <span>Debug Payment<br> -----Simulator-----</span>
          </div>
      </div>
  </template>
  
  <script>
  export default {
     
  }
  </script>
  
  <style>
  .watermark-box{
      width: 95%;
      /* height: 100vh; */
      border: 0px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      /* background: rgba(0,0,0,0.2); */
      z-index: 2;
      position: absolute;
      top:80px;
      /* margin-top: 32px; */
  }
  .watermark-box-overlay{
      display: table;
      width: 100%;
  }
  .watermark-box-overlay span{
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      color: red;
      font-size: 1.5em;
      border-top: 2px solid red;
      border-bottom: 2px solid red;
      font-family: arial;
      font-weight: bold;
      transform: rotate(-18deg);
     
  }
  @media(min-width:992px){
      .watermark-box{
          width: 100%;
          /* left:26%; */
      }
  }
  </style>