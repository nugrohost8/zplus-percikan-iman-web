<template>
    <div class="bg-white p-3">
        <div class="fundraiser">
            <div class="row">
                <div class="col-4 min-h-100 d-flex justify-content-center align-items-center">
                    <SvgSpeaker/>
                </div>
                <div class="col-8 d-flex flex-column min-h-100 p-2 p-sm-4">
                    <div class="flex-grow-1 text-sm">
                        Ayo ikut berkontribusi dalam gerakan #gemapeduli! Ajak lebih banyak orang untuk mewujudkan program kebaikan ini.
                    </div>
                    <nuxt-link class="btn btn-sm btn-fundraiser rounded1xl mt-4" :to="'/register-fundraiser'">Jadi Fundraiser <i class='bx bx-chevron-right'></i></nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { $bus} = useNuxtApp();
    const openFundRaiser = ()=>{
        $bus.$emit('open-fundraiser');
    }
</script>

<style>


</style>