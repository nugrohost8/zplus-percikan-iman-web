<template>
    <div>
    <SeoMeta 
          :title="'Pengajuan Program '+config.public.appName"
          :sitename="config.public.siteName"
          :description="config.public.appDescription"
          :image="config.public.baseAppUrl + 'assets/icons/icon-512x512.png'"
          :url="config.public.baseAppUrl + 'pengajuan-program'" />
      <ArtikelHeader :title="'Pengajuan Program'" />
      <div id="home" class="d-flex justify-content-center">
        <div class="page">
          <div class="bg-white pt-56 full-page">
            <div class="p-3">
                <div class="header-text mb-3">
                    <span class="text-16 text-bold text-center">Pengajuan Program</span>
                </div>
                <div class="mb-4">Formulir ini wajib diisi sebagai syarat pengajuan program di {{ config.public.appName }}</div>
                <form @submit.prevent="submitForm">
                    <div class="form-group mb-2">
                        <label class="required text-bold">Nama Pengaju</label>
                        <input type="text" class="form-control rounded1xl" v-model="nama_pengaju" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Nama Pengaju</label>
                        <vue-tel-input v-model="nomor_telp" :class="'form-control rounded1xl'" :inputOptions="inputOptions" :mode="'international'" @validate="onValidate" :required="true"></vue-tel-input>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Alamat</label>
                        <textarea type="text" class="form-control rounded1xl" v-model="alamat" required ></textarea>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Perihal Pengajuan</label>
                        <select required="required" class="form-control" v-model="perihal_pengajuan">
                            <option value="">-- Pilih --</option>
                            <option value="Permohonan Dana Bantuan">Permohonan Dana Bantuan</option>
                            <option value="Pengajuan Kerja Sama Program">Pengajuan Kerja Sama Program</option>
                            <option value="Pengajuan Audiensi">Pengajuan Audiensi</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Jenis Pengajuan</label>
                        <select required="required" class="form-control" v-model="jenis_pengajuan">
                            <option value="">-- Pilih Jenis --</option>
                            <option value="Pribadi">Pribadi</option>
                            <option value="Kelompok">Kelompok</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Kategori</label>
                        <select required="required" class="form-control" v-model="kategori">
                            <option value="">-- Pilih Kategori Program --</option>
                            <option value="Pendidikan">Pendidikan</option>
                            <option value="Kemanusiaan">Kemanusiaan</option>
                            <option value="Kesehatan">Kesehatan</option>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Dakwah &amp; Advokasi">Dakwah &amp; Advokasi</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Nama Program</label>
                        <input type="text" class="form-control rounded1xl" v-model="nama_program" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Bentuk Kegiatan</label>
                        <input type="text" class="form-control rounded1xl" v-model="bentuk_kegiatan" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Tanggal Kegiatan</label>
                        <client-only>
                            <vue-date-picker locale="id" auto-apply partial-flow :format="$formatDatePicker" :required="true" v-model="tanggal_kegiatan" 
                                :enable-time-picker="false" id="tanggal" :min-date="new Date()"></vue-date-picker>
                        </client-only>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Lokasi Kegiatan</label>
                        <input type="text" class="form-control rounded1xl" v-model="lokasi_kegiatan" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Asnaf</label>
                        <select required="required" class="form-control" v-model="asnaf">
                            <option value="">-- Pilih Asnaf --</option>
                            <option value="Fakir">Fakir</option>
                            <option value="Miskin">Miskin</option>
                            <option value="Muallaf">Muallaf</option>
                            <option value="Gharimin">Gharimin</option>
                            <option value="Riqab">Riqab</option>
                            <option value="Fisabilillah">Fisabilillah</option>
                            <option value="Ibnu Sabil">Ibnu Sabil</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Profile Penerima</label>
                        <textarea type="text" class="form-control rounded1xl" v-model="profile_penerima" required ></textarea>
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Nominal Pengajuan</label>
                        <WidgetAutonumeric v-model="nominal_pengajuan" :required="true" :maximumValue="10000000" />
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Nama Bank</label>
                        <input type="text" class="form-control rounded1xl" v-model="nama_bank" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">No. Rekening</label>
                        <input type="text" class="form-control rounded1xl" v-model="no_rek" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="required text-bold">Atas Nama</label>
                        <input type="text" class="form-control rounded1xl" v-model="atas_nama" required >
                    </div>
                    <div class="form-group mb-2">
                        <label class="text-bold">Surat Rekomendasi</label>
                        <input type="file" class="form-control rounded1xl" @change="handleSuratRekomendasi" accept=".docx,.xlsx,.ppt,.pdf,image/*">
                    </div>
                    <div class="form-group mb-2">
                        <label class="text-bold">Lampiran</label>
                        <input type="file" class="form-control rounded1xl" @change="handleFileLampiran" accept=".docx,.xlsx,.ppt,.pdf,image/*" multiple required>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6 mt-3 mb-4">
                            <button class="btn bg-green card-radius text-bold w-100" :class="{disabled:isDisabled}" :disabled="isDisabled">Kirim</button>
                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-overlay" v-if="isWarningVisible" @click="closeModal" ref="warning">
          <div class="modal-content-1" @click.stop>
            <div class="d-flex justify-content-center">
              <div class="page p-3">
                <div class="card card-radius">
                  <div class="card-body text-center">
                    <div class="text-center mb-2">
                        <nuxt-img src="/assets/icons/logo.png" />
                    </div>
                    <div class="min-w240 mt-4 mb-2 text-bold text-default">{{ errorMessage }}</div>
                    <div v-if="submitBerhasil">
                        Pengajuan akan segera di periksa oleh team program kami.
                    </div>
                    <div class="d-flex justify-content-center my-4">
                        <button class="btn btn-sm card-radius btn-donate text-bold w-50" @click="closeModal">Tutup</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();
    const { $getMeta,$getMetaScript,$moment,$potFormData} = useNuxtApp()
    const route = useRoute();
    const countryCode = ref('');
    const nama_pengaju = ref('');
    const nomor_telp = ref('');
    const alamat = ref('');
    const perihal_pengajuan = ref('');
    const kategori = ref('');
    const jenis_pengajuan = ref('');
    const nama_program = ref('');
    const bentuk_kegiatan = ref('');
    const tanggal_kegiatan = ref('');
    const lokasi_kegiatan = ref('');
    const asnaf = ref('');
    const nominal_pengajuan = ref('');
    const surat_rekomendasi = ref(null);
    const file_lampiran = ref([]);
    const profile_penerima = ref('');
    const nama_bank = ref('');
    const no_rek = ref('');
    const atas_nama = ref('');
    const isDisabled = ref(false);
    const isWarningVisible = ref(false);
    const errorMessage = ref('');
    const submitBerhasil = ref(false);
    const inputOptions = {
        placeholder:'Masukan nomor telepon',
        required:true,
        showdialcode:true
    }
    const onValidate = (phoneObject)=>{
        countryCode.value = phoneObject.country;
    }
    const disableButton = ()=>{
        isDisabled.value = true;
    }
    const enableButton = ()=>{
        isDisabled.value = false;
    }
    const closeModal = ()=>{
        isWarningVisible.value = false;
        if(submitBerhasil.value){
            navigateTo('/');
        }
    }

    const handleFileLampiran = (e)=>{
        file_lampiran.value = e.target.files;
        console.log(file_lampiran.value);
    }
    const handleSuratRekomendasi = (e)=>{
        surat_rekomendasi.value = e.target.files[0];
    }

    const submitForm = ()=>{
        let formData = new FormData();
        formData.append('nama_pengaju',nama_pengaju.value);
        formData.append('nomor_telp',nomor_telp.value);
        formData.append('alamat',alamat.value);
        formData.append('perihal_pengajuan',perihal_pengajuan.value);
        formData.append('jenis_pengajuan',jenis_pengajuan.value);
        formData.append('kategori_program',kategori.value);
        formData.append('nama_program',nama_program.value);
        formData.append('bentuk_kegiatan',bentuk_kegiatan.value);
        formData.append('tanggal_kegiatan',$moment(tanggal_kegiatan.value).format('YYYY-MM-DD'));
        formData.append('lokasi_kegiatan',lokasi_kegiatan.value);
        formData.append('asnaf',asnaf.value);
        formData.append('nominal_pengajuan',nominal_pengajuan.value);
        formData.append('profile_penerima',profile_penerima.value);
        formData.append('surat_rekomendasi',surat_rekomendasi.value || '');
        formData.append('nama_bank',nama_bank.value || '');
        formData.append('no_rek',no_rek.value || '');
        formData.append('atas_nama',atas_nama.value || '');
        //formData.append('file_lampiran',file_lampiran.value || '');
        formData.append('country_id',countryCode.value);
        for(var i=0;i<file_lampiran.value.length;i++){
            formData.append('lampiran[]',file_lampiran.value[i]);
        }
        disableButton();
        $fetch(`${config.public.baseUrl}front-end/pengajuan-program`,{
            method:'POST',
            body:formData
        }).then(response=>{
            if(response.status == 1){
                errorMessage.value = 'Pengajuan Program Berhasil';
                submitBerhasil.value = true;
            }else{
                errorMessage.value = 'Pengajuan Program Gagal : ' + response.message;
            }
            isWarningVisible.value = true;
            enableButton();
        }).catch(err=>{
            console.log(err);
            errorMessage.value = 'Pengajuan Program Gagal';
            isWarningVisible.value = true;
            enableButton();
        })

    }
    onMounted(()=>{
      if(route.query !== undefined){
        let referral = route.query.referral;
        if(referral !== undefined){
          window.history.replaceState({},'',`?referral=`+referral);
        }
      }
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
            href: config.public.baseAppUrl + 'legal-formal'
          }
        ],
        script: $getMetaScript({
          url: config.public.baseAppUrl,
          title: 'Legal Formal ' + config.public.appName,
          description: 'Legal Formal ' + config.public.appName
        })
    })

    useSeoMeta({
      title: 'Legal Formal',
      ogTitle: 'Legal Formal',
      description: config.public.appDescription,
      ogDescription: config.public.appDescription,
      ogImage: config.public.baseAppUrl + 'assets/icons/icon-512x512.png',
      twitterCard: 'summary_large_image',
    })
</script>

<style scoped>
.min-w240{
    min-width: 240px;
}
</style>