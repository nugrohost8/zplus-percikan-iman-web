<template>
  <div class="d-flex justify-content-center">
    <div class="page">
      <HomeHeaderWhite />
      <div class="bg-white pt-56 full-page">
        <div v-if="donatur">
          <div class="tab-content px-0 pt-0 pb-2">
              <div class="text-center avatar-pad mt-4">
                <div class="avatar">
                  <SvgAccount />
                </div>
                <div class="text-bold text-green text-18">
                  {{ donatur ? donatur.nama : '' }}
                </div>
                <div class="text-bold">
                  {{ donatur ? donatur.no_telp ? donatur.no_telp : donatur.email : '' }}
                </div>               
              </div>
            <div class="d-flex justify-content-center mt-3" role="tablist" id="tab-donasi">
              <div class="text-center me-1">
                <button class="btn btn-sm btn-default text-13 card-unselect" :class="{'paket-active': tabActive == 'Donasi'}" @click="tabActive = 'Donasi'" aria-label="Donasi">Daftar Donasi</button>
              </div>
              <div class="text-center ms-1">
                <button class="btn btn-sm btn-default text-13 card-unselect" :class="{'paket-active': tabActive == 'Transaksi'}" @click="tabActive = 'Transaksi'" aria-label="Transaksi">Donasi Tertunda</button>
              </div>
            </div>
            <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'Donasi'}" role="tabpanel">
              <div class="py-4">
                  <ListDonation :donations="donations" v-if="donations.length > 0" />
                  <WidgetEmptyHistoryDonasi v-else :campaigns="campaignUnggulan" />
                </div>
            </div>
            <div class="tab-pane fade" :class="{ 'active show' : tabActive == 'Transaksi'}" role="tabpanel">
              <div class="py-4">
                  <ListTransaction :transactions="transactions" />
                </div>
            </div>
          </div> 
        </div>
        <div v-else class="p-3">
          <div class="text-center my-4">
            Registrasikan diri untuk mendapatkan update laporan donasi yang Anda lakukan
          </div>
          <div class="card card-shadow card-radius min-vh-68">
            <div class="card-body">
              <form @submit.prevent="signin">
                <div class="p-sm-3">
                  <div class="text-bold text-24 mb-4">Login <i class="bx bx-lock text-32"></i></div>
                  <div class="form-group mb-4">
                    <label class="mb-2">Nama Anda</label>
                    <input class="form-control input-nama mb-2 rounded2xl" placeholder="Masukan nama anda" v-model="nama" required>
                  </div>
                  <div class="form-group mb-4">
                    <label class="mb-2">Nomor Telepon / Email</label>
                    <input class="form-control input-nama mb-2 rounded2xl" placeholder="Masukan email atau no telp" v-model="no_telp" required>
                  </div>
                </div>
                <div class="text-center px-sm-3">
                  <button class="btn btn-login w-100" aria-label="login">Masuk</button>
                </div>
              </form>
            </div>
          </div>
        
        </div>
      </div>
      <Footer ></Footer>
      <CopyRight :needShow="true"/>
      <BottomNavBar :page="'profile'" />
    </div>
  </div>
</template>

<script setup>
  import {
    useDonaturStore
  } from "@/stores/donatur";
  const {
    $getMetaScript
  } = useNuxtApp()
  const config = useRuntimeConfig();

  const route = useRoute();
  const donaturStore = useDonaturStore();
  const donatur = ref(null);
  const donations = ref([])
  const transactions = ref([])
  const nama = ref('')
  const no_telp = ref('')
  const tabActive = ref('Donasi');
  const campaignUnggulan = ref([])
  const ready = ref(false);
  const donaturLocal = donaturStore.donaturObj
  nama.value = donaturLocal.name
  no_telp.value = donaturLocal.telp !== null && donaturLocal.telp !== undefined ? donaturLocal.telp : donaturLocal.email
  const {
    data,
    status
  } = await $fetch(`${config.public.baseUrl}front-end/login`, {
    method: 'POST',
    body: {
      nama: nama.value,
      no_telp: no_telp.value?.replace(/[+ ]/g,'')
    },
    lazy: true
  })
  if (status == 1) {
    donatur.value = data;
    donations.value = data.donations
    transactions.value = data.pending_transactions
    if(data.campaigns !== undefined){
      campaignUnggulan.value = data.campaigns;
    }
  }

  const signin = ()=>{
    $fetch(`${config.public.baseUrl}front-end/login`, {
      method: 'POST',
      body: {
        nama: nama.value,
        no_telp: no_telp.value.replace(/[+ ]/g,'')
      },
      lazy: true
    }).then(response=>{
      if(response.status ==1){
        donatur.value = response.data;
        donations.value = response.data.donations
        donaturStore.setName(donatur.value.nama_lengkap);
        donaturStore.setTelp(donatur.value.no_telp);
        donaturStore.setEmail(donatur.value.email);
        donaturStore.setAlamat(donatur.value.alamat);
        donaturStore.setNpwp(donatur.value.no_npwp);
        donaturStore.setId(donatur.value.id);
        if(response.campaigns !== undefined){
          campaignUnggulan.value = response.campaigns;
        }
      }
    })
  
  }
  const handleLoginSuccess = (res)=>{
    let credential = res.access_token;
    $fetch(`${config.public.baseUrl}login-with-google`, {
        method: 'POST',
        body: {
          token: credential,
        },
        lazy: true
      }).then(response=>{
        if(response.status ==1){
            donatur.value = response.data;
            donations.value = response.data.donations
            donaturStore.setName(donatur.value.nama_lengkap);
            donaturStore.setTelp(donatur.value.no_telp);
            donaturStore.setEmail(donatur.value.email);
            donaturStore.setAlamat(donatur.value.alamat);
            donaturStore.setNpwp(donatur.value.no_npwp);
            donaturStore.setId(donatur.value.id);
            campaignUnggulan.value = response.data.campaigns;
        }
      })
  }

  onMounted(()=>{
    if(route.query !== undefined){
      let referral = route.query.referral;
      if(referral !== undefined){
        window.history.replaceState({},'',`?referral=`+referral);
      }
    }
    /*
    window.onload = () => {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse, //method to run after user clicks the Google sign in button
        });
        google.accounts.id.renderButton(
          document.getElementById("googleButton"),
          { theme: "outline", size: "large" } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
      }
    */
  })

  useHead({
    meta:[
      { name:'theme-color',content:config.public.mainColor},
      { name: "color-scheme", property: "color-scheme",content: "dark light"},
    ],
    link: [
      {
        hid: 'canonical',
        rel: "canonical",
        href: config.public.baseAppUrl+ 'profile'
      }
    ],
    script:$getMetaScript({
      url: config.public.baseAppUrl,
      title: 'Profil Donatur ' + config.public.appName,
      description: 'Profil Donatur ' + config.public.appName
    })
  })
  useSeoMeta({
      title:'Profile Donatur',
      description:config.public.appDescription,
      ogUrl:config.public.baseAppUrl+ 'profile',
      ogTitle: 'Profile Donatur',
      ogDescription:config.public.appDescription
  })
</script>

<style>
  .input-nama {
    /* height: 44px; */
  }
  .btn-login{
    background-color: var(--main-color);
    /* color:#fff; */

  }
  .btn-login:active{
    background-color: var(--header-color);
    /* color:#ccc; */
  }
</style>