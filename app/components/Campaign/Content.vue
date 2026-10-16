<template>
  <div class="bg-white pb-4">
    <div class="description p-3 text-justify text-sm" :class="{ 'description-collapse' : collapse}" v-html="campaign.content" ref="descriptionRef"></div>
    <div class="text-center" v-show="shouldShow">
        <button class="btn btn-sm btn-default border-1 card-radius text-green text-sm px-3" @click="toggleCollapse" data-label="Selengkapnya">{{ collapseText }}</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    campaign:Object,
  })
  const collapse = ref(false)
  const descriptionRef = ref(null);
  const shouldShow = ref(false);
  const collapseText = ref('Selengkapnya');
  function toggleCollapse(){
    collapse.value = !collapse.value;
    if(collapse.value){
         collapseText.value = "Selengkapnya"
       
    }else{
        collapseText.value = "Lebih Sedikit"
    }
}
onMounted(()=>{
    let height = descriptionRef.value.clientHeight;
    if(!isNaN(height)){
        if(height > 340){
            collapse.value = true;
            shouldShow.value = true;
        }
    }
    //console.log(descriptionRef.value.$el.clientHeight)
})
</script>

<style>

</style>