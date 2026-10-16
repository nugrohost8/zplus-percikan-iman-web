<template>

          <div class="d-flex justify-content-center">
            <div class="page p-3">
              <div class="card card-radius bg-white">
                <div class="card-header bg-green text-white campaign-img p-3">
                    <div class="text-14">Lengkapi data anda untuk menjadi fundraiser program ini.</div>
                    <div class="">Pastikan data yang anda masukan adalah benar untuk mempermudah proses verifikasi.</div>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitRegister" autocomplete="off" ref="form">
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="nama">Nama Lengkap</label>
                            <div class="input-container w-100">
                                <input class="form-control input-nama required mb-2 rounded1xl" placeholder="Nama Lengkap" required v-model="nama" autocomplete="new-text">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="nik">NIK</label>
                            <div class="input-container w-100">
                                <input class="form-control input-nama required mb-2 rounded1xl" id="nik" inputmode="numeric" placeholder="NIK" required v-model="nik" maxlength="16" autocomplete="new-text">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="no-telp">Nomor Telepon</label>
                            <div class="input-container w-100">
                                <vue-tel-input v-model="no_telp" :class="'input-nama rounded1xl'" id="no-telp" :inputOptions="inputOptions" :mode="'international'" @validate="onValidate" required></vue-tel-input>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="email">Email</label>
                            <div class="input-container w-100">
                                <input class="form-control input-nama required mb-2 rounded1xl" id="email" inputmode="email" placeholder="Email" required v-model="email" autocomplete="new-text">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="tempat-lahir">Tempat Lahir</label>
                            <div class="input-container w-100">
                                <input class="form-control input-nama mb-2 rounded1xl" id="tempat-lahir" placeholder="Tempat Lahir" required v-model="tempat_lahir">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="tanggal-lahir">Tanggal Lahir</label>
                            <div class="input-containerw-100">
                                <input type="date" class="form-control input-nama mb-2 rounded1xl" id="tanggal-lahir" inputmode="date" placeholder="Tanggal Lahir" required v-model="tanggal_lahir" :max="maxDate">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1">Jenis Kelamin</label>
                            <div class="d-flex mb-3">
                                <div class="d-flex align-items-center me-3">
                                    <input type="radio" class="form-check-input me-2" :value="'Laki-laki'" id="kelaminL" v-model="jenis_kelamin" autocomplete="off" required>
                                    <div class=""> Laki-laki</div>
                                </div>
                                <div class="d-flex align-items-center me-3">
                                    <input type="radio" class="form-check-input me-2" :value="'Perempuan'" id="kelaminP" v-model="jenis_kelamin" autocomplete="off" required>
                                    <div class=""> Perempuan</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="alamat">Alamat</label>
                            <div class="input-container w-100">
                                <textarea class="form-control input-nama required mb-2 rounded1xl" id="alamat" placeholder="Alamat" required v-model="alamat"></textarea>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="pendidikan">Pendidikan Terakhir</label>
                            <div class="input-container w-100">
                                <select class="form-control" v-model="pendidikan_terakhir" id="pendidikan" required>
                                    <option value="">Pilih</option>
                                    <option value="SD">SD</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMA">SMA</option>
                                    <option value="S1">S1</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                </select>
                            </div>
                        </div>
                        <!-- 
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="kota">Kota</label>
                            <div class="input-container w-100">
                                <select class="form-control" v-model="kota" id="kota" required>
                                    <option value="">Pilih</option>
                                    <option v-for="(item,index) in kokab" :value="item" :key="index">{{ item }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="kota">Gerai</label>
                            <div class="input-container w-100">
                                <select class="form-control" v-model="gerai_id" id="kota" required>
                                    <option value="">Pilih</option>
                                    <option v-for="(item,index) in gerais" :value="item.id" :key="index">{{ item.nama_gerai }}</option>
                                </select>
                            </div>
                        </div>
                         -->
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="nama">Nama Pengguna</label>
                            <div class="input-container w-100">
                                <input class="form-control input-nama required mb-2 rounded1xl" placeholder="Nama Pengguna" required v-model="username" autocomplete="new-text">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="tempat-lahir">Password</label>
                            <div class="input-container w-100 p-relative">
                                <input class="form-control input-nama required mb-2 rounded1xl" :type="showInput ? 'text' : 'password'" id="password'" placeholder="Password" required v-model="password" autocomplete="new-password" ref="inputPassword">
                                <i class="bx bx-low-vision vision" @click="showInput = !showInput"></i>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="tempat-lahir">Foto Diri</label>
                            <div class="input-container w-100 p-relative">
                                <input type="file" class="input-file" @change="readInputFile" id="foto-diri" accept=".jpg, .jpeg, .png">
                               <nuxt-img :src="imgPlaceholder" :alt="'foto diri'" class="rounded1xl w-25 foto-diri"></nuxt-img>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="text-bold required ms-1" for="tempat-lahir">Foto KTP</label>
                            <div class="input-container w-100 p-relative">
                                <input type="file" class="input-file" @change="readInputFileKtp" id="foto-ktp" accept=".jpg, .jpeg, .png">
                               <nuxt-img :src="imgPlaceholder2" :alt="'foto ktp'" class="rounded1xl w-50 foto-ktp"></nuxt-img>
                            </div>
                        </div>
                        <div class="input-container w-100 mt-4 p-relative">
                            <input type="submit" class="btn btn-donate w-100 rounded2xl text-bold shadow-sm text-white text-password" :value="submitted ? '' : 'DAFTAR'" :disabled="submitted">
                            <div class="absolute-0 w-100 d-flex justify-content-center">
                                <span class="spinner" v-show="submitted"></span>
                            </div>
                            
                        </div>
                    </form>
                    <div class="text-danger text-center mb-4">{{error}}</div>
                    <div class="d-flex justify-content-between"><div>Sudah mempunyai akun? </div><nuxt-link class="btn btn-sm btn-default" :to="simUrl">Login</nuxt-link></div>
                    
                </div>
              </div>
            </div>
          </div>

</template>

<script setup>
    const config = useRuntimeConfig();
    const props = defineProps({
        kokab:Array,
        gerais:Array
    })
    const { $moment } = useNuxtApp();
    const router = useRouter();
    const simUrl = config.public.dashboardUrl;
    const form = ref(null);
    const imgPlaceholder = ref('/assets/images/no-image-portrait.jpg');
    const imgPlaceholder2 = ref('/assets/images/no-image.webp');
    const nama = ref('');
    const nik = ref('');
    const no_telp = ref('');
    const email = ref('');
    const tempat_lahir = ref('');
    const tanggal_lahir = ref('');
    const jenis_kelamin = ref('');
    const alamat = ref('');
    const countryCode = ref('');
    const pendidikan_terakhir = ref('');
    const kota = ref('');
    const showInput = ref(false);
    const username = ref('');
    const password = ref('');
    const foto_diri = ref('');
    const foto_ktp = ref('');
    const gerai_id = ref('');
    const maxDate = ref($moment().subtract(13,'years').format('YYYY-MM-DD'))
    const inputOptions = {
        placeholder:'Masukan nomor telepon atau',
        required:true,
        showdialcode:true
    }
    const onValidate = (phoneObject)=>{
        countryCode.value = phoneObject.country;
    }
    const error = ref('');
    const submitted = ref(false);
  
    const submitRegister = ()=>{
        let formData = new FormData();
        formData.append('nama',nama.value);
        formData.append('email',email.value);
        formData.append('no_telp',no_telp.value);
        formData.append('tempat_lahir',tempat_lahir.value);
        formData.append('tanggal_lahir',tanggal_lahir.value);
        formData.append('jenis_kelamin',jenis_kelamin.value);
        formData.append('alamat',alamat.value);
        formData.append('kota',kota.value);
        formData.append('username',username.value);
        formData.append('foto_diri',foto_diri.value);
        formData.append('foto_ktp',foto_ktp.value);
        formData.append('jenis_kelamin',jenis_kelamin.value);
        formData.append('pendidikan_terakhir',pendidikan_terakhir.value);
        formData.append('nik',nik.value);
        formData.append('password',password.value);
        formData.append('gerai_id',gerai_id.value);
        if(!submitted.value){
            submitted.value = true;
            $fetch(`${config.public.baseUrl}front-end/register-referral`,{
                method:'post',
                body:formData
            }).then(response=>{
                console.log(response)
                submitted.value = false;
                if(response.status == 1){
                   let data = JSON.stringify(response.data);
                   var encodedStringBtoA = btoa(data);
                   router.push({
                    path:'/register-sukses',
                    query:{
                        data:encodedStringBtoA
                    }
                   })
                }else{
                    error.value = response.message;
                }
            })
        }
    }
    const readInputFile = (event)=>{
        imgPlaceholder.value = URL.createObjectURL(event.target.files[0]);
        foto_diri.value = event.target.files[0];

    }
    const readInputFileKtp = (event)=>{
        imgPlaceholder2.value = URL.createObjectURL(event.target.files[0]);
        foto_ktp.value = event.target.files[0];
    }

    const clearForm = ()=>{
        nama.value = '';
        no_telp.value = '';
        password.value = '';
        error.value = '';
    }

   
</script>

<style>
    .vision{
        position:absolute;
        right:10px;
        top:10px;
        cursor:pointer;
    }
    .foto-diri{
        aspect-ratio: 4/6;
        object-fit: cover;
    }
    .foto-ktp{
        aspect-ratio: 6/4;
        object-fit: cover;
    }
    .input-file{
        height: 100%;
        opacity: 0;
        position: absolute;
        cursor: pointer;
    }
</style>