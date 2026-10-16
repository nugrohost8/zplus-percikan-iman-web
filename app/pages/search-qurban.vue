<template>
    <div class="d-flex justify-content-center">
        <div class="page">
            <HomeHeaderWhite />
            <section class="pt-56 bg-white full-page">
                <div class="px-4">
                    <div class="row">
                        <div class="col-md-12 text-center mt-5">
                            <h2 class="text-heading text-center">Cek Status Qurban</h2>

                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="col-sm-12">
                            <form class="p-relative my-4" @submit.prevent="searchQurban">
                                <div class="text-center text-muted">Masukan nama pequrban</div>
                                <input class="w-100 form-control text-sm rounded1xl" v-model="keyword" type="text" name="" placeholder="Nama Pequrban atau nomor qurban">
                                <div class="search_icon" @click="searchQurban"><i class="bx bx-search"></i></div>
                            </form>
                            <div class="d-flex" v-if="submitted">
                                <img src="/assets/images/loader.gif" alt="loading" title="loading" class="m-auto">
                            </div>
                            <table class="table mt-3" v-if="qurban.length > 0">
                                <thead>
                                    <tr>
                                        <th>Nama Pequrban</th>
                                        <th>Jenis Hewan</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="q in qurban" :key="q.id" >
                                        <td>{{q.nama_pequrban}}</td>
                                        <td>{{q.jenis_hewan}}</td>
                                        <td class="text-link" @click="displayDetail(q)">Detail</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="search-result" :class="{'d-none':detail == null}">
                                <div class="row my-4 justify-content-center px-0 px-sm-2">
                                    <div class="col-lg-12">
                                        <div class="stepper-wrapper">
                                            <div class="stepper-item" id="step1" :class="{completed:stepOneState,final:stepIndex == 0}">
                                                <div class="step-counter"><nuxt-img class="step-icon" preload loading="lazy" :src="'/assets/images/cart1.svg'" />
                                                </div>
                                                <div class="step-name">
                                                    <div class="step1 text-center">Dipesan</div>
                                                    <div id="tgl-dipesan" class="step-title text-center"></div>
                                                </div>
                                            </div>
                                            <div class="stepper-item" id="step2" :class="{completed:stepTwoState,final:stepIndex == 1}">
                                                <div class="step-counter"><nuxt-img class="step-icon" preload loading="lazy" :src="'/assets/images/paper.svg'" />
                                                </div>
                                                <div class="step-name">
                                                    <div class="step2 text-center">Diverifikasi</div>
                                                    <div id="tgl-diverifikasi" class="step-title text-center"></div>
                                                </div>
                                            </div>
                                            <div class="stepper-item" id="step3" :class="{completed:stepThreeState,final:stepIndex == 2}">
                                                <div class="step-counter"><nuxt-img class="step-icon" preload loading="lazy" :src="'/assets/images/sheep1.svg'" />
                                                </div>
                                                <div class="step-name">
                                                    <div class="step2 text-center">Disalurkan</div>
                                                    <div id="tgl-penyaluran" class="step-title text-center"></div>
                                                </div>
                                            </div>
                                            <div class="stepper-item" id="step4" :class="{completed:stepFourState,final:stepIndex == 3}">
                                                <div class="step-counter"><nuxt-img class="step-icon" preload loading="lazy" :src="'/assets/images/check.svg'" />
                                                </div>
                                                <div class="step-name">
                                                    <div class="step2 text-center">Dipotong</div>
                                                    <div id="tgl-pemotongan" class="step-title text-center"></div>
                                                </div>
                                            </div>
                                            <div class="stepper-item" id="step5" :class="{completed:stepFiveState,final:stepIndex == 4}">
                                                <div class="step-counter">
                                                    <nuxt-link :to="config.public.dashboardUrl + 'export/sertifikat-qurban'" id="link-cert">
                                                        <nuxt-img preload loading="lazy" class="step-icon" :src="'/assets/images/download.svg'" />
                                                    </nuxt-link>
                                                </div>
                                                <div class="step-name">
                                                    <div class="step2 text-center">Sertifikat</div>
                                                    <div id="tgl-sertifikat" class="step-title text-center"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="col-lg-12" id="info-qurban">
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Donatur</label>
                                                        <div id="nama-donatur" class="col-lg-8">{{donatur?.nama_lengkap}}</div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Nama Pequrban</label>
                                                        <div class="col-lg-8" id="nama-pequrban">{{ detail?.nama_pequrban }}</div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Jenis Hewan</label>
                                                        <div class="col-lg-8" id="jenis-hewan">{{ detail?.jenis_hewan }}</div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Jumlah Paket</label>
                                                        <div class="col-lg-8" id="jenis-hewan">{{ detail?.jumlah_paket }}</div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Penyaluran</label>
                                                        <div class="col-lg-8" id="lokasi-pemotongan">
                                                            <div v-for="(penyaluran,index) in detail?.penyaluran_qurban" :key="penyaluran.id">
                                                                <div class="t-bold bg-grey px-2 py-1">{{ index + 1 }}.</div>
                                                                <div class="form-inline mb-2 row">
                                                                    <label class="col-lg-4 fw-semibold">Lokasi Pemotongan</label>
                                                                    <div class="col-lg-8" id="lokasi-pemotongan">
                                                                        {{ penyaluran.lokasi_pemotongan?.kota }}
                                                                    </div>
                                                                </div>
                                                                <div class="form-inline mb-2 row">
                                                                    <label class="col-lg-4 fw-semibold">Alamat Pemotongan</label>
                                                                    <div class="col-lg-8" id="alamat-pemotongan">{{ penyaluran.alamat_lokasi_pemotongan }}</div>
                                                                </div>
                                                                <div class="form-inline mb-2 row">
                                                                    <label class="col-lg-4">Tanggal Pemotongan</label>
                                                                    <div class="col-lg-8" id="tanggal-pemotongan">{{ penyaluran.tanggal_pemotongan }}</div>
                                                                </div>
                                                                <div class="form-inline mb-2 row">
                                                                    <label class="col-lg-4 fw-semibold">Waktu Pemotongan</label>
                                                                    <div class="col-lg-8" id="waktu-pemotongan">{{ penyaluran.waktu_pemotongan }}</div>
                                                                </div>
                                                                <div class="form-inline mb-2 row" v-if="penyaluran.status == 2">
                                                                    <label class="col-lg-4 fw-semibold">Sertifikat qurban</label>
                                                                    <div class="col-lg-8" id="link-sertifikat">
                                                                        <nuxt-link :to="config.public.dashboardUrl + 'api/download-sertifikat-qurban?nomor_qurban=' + 
                                                                            keyword + '&penyaluran_id='+penyaluran.id" target="_blank" class="text-primary">
                                                                            <i class="bx bx-download me-2"></i>Download Sertifikat
                                                                        </nuxt-link>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Paket</label>
                                                        <div class="col-lg-8" id="nama-paket">{{ detail?.paket_qurban?.nama_paket }}</div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Jml. Disalurkan</label>
                                                        <div class="col-lg-8" id="jumlah">{{ penyaluranQurban?.length }}</div>
                                                    </div>
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-4 fw-semibold">Total</label>
                                                        <div class="col-lg-8" id="total">{{ $formatRupiah(detail?.nominal) }}</div>
                                                    </div>
                                                    <!-- 
                                                    <div class="form-inline mb-2 row">
                                                        <label class="col-lg-3 fw-semibold">Bukti Setor Donasi</label>
                                                        <div class="col-lg-9" id="link-kwitansi">

                                                        </div>
                                                    </div>
                                                    -->
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </div>
</template>
<script setup>
    const {
        $bus,
        $formatNumber,
        $moment
    } = useNuxtApp();

    const detail = ref(null);
    const config = useRuntimeConfig();
    const qurban = ref([]);
    const keyword = ref(useRoute().query.keyword);
    const submitted = ref(false);
    
    const statusQurban = ref([]);
    const donatur = ref(null);
    const penyaluranQurban = ref([]);
    const stepOneState = ref(false);
    const stepTwoState = ref(false);
    const stepThreeState = ref(false);
    const stepFourState = ref(false);
    const stepFiveState = ref(false);
    const stepIndex = ref(0);
    const nomor_qurban = ref('');

    const { data, status, error, refresh, clear} = await useFetch(`${config.public.baseUrl}front-end/search-info-qurban`, {
        method: 'POST',
        lazy: true,
        body: {
            keyword: keyword.value
        }
    }, {
        initialCache: false
    }).catch((error) => {
        console.log(error);
    });
    if (status.value == 'success') {
        let resp = data.value;
        console.log("Data",resp);
        if(resp.status == 1){
            qurban.value = resp.data;
        }
    }
    
    const displayDetail = (item) => {
        resetStep();
        detail.value = item;
        statusQurban.value = item.status;
        donatur.value = item.donatur;
        penyaluranQurban.value = item.penyaluran_qurban;
        statusQurban.value.forEach(state=>{
            if(state.status == 'Dipesan'){
                stepOneState.value = true;
                stepIndex.value = 0;
            }else if(state.status == 'Diverifikasi'){
                stepTwoState.value = true;
                stepIndex.value = 1;
            }else if(state.status == 'Disalurkan'){
                stepThreeState.value = true;
                stepIndex.value = 2;
            }else if(state.status == 'Dipotong'){
                stepFourState.value = true;
                stepIndex.value = 3;
            }else if(state.status == 'Generate'){
                stepFiveState.value = true;
                stepIndex.value = 4;
            }
        })
    }

    const resetStep = ()=>{
        stepOneState.value = false;
        stepTwoState.value = false;
        stepThreeState.value = false;
        stepFourState.value = false;
        stepFiveState.value = false;
        stepIndex.value = 0;
    }


    const downloadFile = async (nomor_qurban) => {
        window.open(`${config.public.baseUrl}download-sertifikat-qurban?nomor_qurban=${nomor_qurban}`)
    }

    watch(data,newValue=>{
        qurban.value = newValue.data
    })
</script>

<style>
    .search_icon {
        position: absolute;
        right: 10px;
        top: 24px;
    }
    .fw-semibold{
        font-weight: 600;
    }
</style>