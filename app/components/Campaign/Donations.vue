<template>
    <div>
        <div class="d-flex py-2">
            <div class="text-bold flex-grow-1">Donasi</div>

        </div>
        <div class="card-grey" v-for="(donasi,index) in donations" :key="index">
            <div class="card-body">

            </div>
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    donations: {
      type: Array,
      required: true,
    },
  });

  const { donations } = props;

</script>

<style>

</style>