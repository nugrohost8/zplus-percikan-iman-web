<template>
  <div class="modal-overlay" v-if="isWarningVisible" @click="closeModal">
      <div class="page d-flex justify-content-center">
          <div class="page">
              <div class="modal-content w-auto" @click.stop>
                  <div class="p-2">
                      <slot></slot>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "modal-md",
  },
  modalId: {
    type: String,
    required: true,
  },
})
const isWarningVisible = ref(false);
const { $bus } = useNuxtApp();

const closeModal = () => {
  isWarningVisible.value = false;
  $bus.$emit('onModalClosed');
};

onMounted(() => {
  $bus.$on("openModal", (payload) => {
    if (payload?.id === props.modalId) {
      isWarningVisible.value = true;
    }
  });

  $bus.$on("closeModal", (payload) => {
    if (payload?.id === props.modalId) {
      isWarningVisible.value = false;
    }
  });
});
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>