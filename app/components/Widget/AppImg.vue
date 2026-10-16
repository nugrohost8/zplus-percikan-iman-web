<script setup lang="ts">
const props = defineProps({
  height: Number,
  width: Number,
  src: String,
  quality: {
    type: Number,
    default: 80,
  },
  alt: {
    type: String,
    default: "Sedekahku Percikan Iman",
  },
  lazy: {
    type: Boolean,
    default: true,
  },
});
const imageRef = ref();
const currentSrc = ref("/no-image.webp");
const fallbackSrc = "/no-image.webp";
const handleError = (event: any) => {
  currentSrc.value = fallbackSrc;
};
watch(
  () => props.src,
  (newValue) => {
    if (newValue) {
      currentSrc.value = newValue;
    }
  },
  { immediate: true },
);
</script>
<template>
  <NuxtImg
    ref="imageRef"
    :src="currentSrc"
    format="webp"
    :quality="quality ?? 80"
    :width="width"
    :height="height"
    :alt="alt ?? 'Sedekahku Percikan Iman'"
    :loading="lazy ? 'lazy' : 'eager'"
    @error="handleError"
    preload
  >
  </NuxtImg>
</template>
