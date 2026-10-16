<template>
    <input
      ref="input"
      :id="id"
      :placeholder="placeholder"
      :class="inputClass || 'form-control'"
      :required="required"
      :disabled="disabled"
      :readonly="readOnly"

    />
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import AutoNumeric from "autonumeric";

const props = defineProps({
  modelValue: [String, Number,Array],
  id: String,
  placeholder: String,
  options: Object,
  currencySymbol: String,
  inputClass:String,
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: false },
  flex: { type: Boolean, default: false },
  decimalPlaces: { type: Number, default: 0 },
  maximumValue: { type: Number, default: 1000000000 },
});

const emit = defineEmits(["update:modelValue"]);
const input = ref(null);
let autoNumericInstance = null;

onMounted(() => {
  autoNumericInstance = new AutoNumeric(input.value, props.modelValue || 0, {
    digitGroupSeparator: ".",
    decimalCharacter: ",",
    decimalPlaces: props.decimalPlaces,
    currencySymbol: props.currencySymbol || "Rp ",
    currencySymbolPlacement: "p",
    watchExternalChanges: true,
    modifyValueOnWheel: false,
    minimumValue:0,
    maximumValue:props.maximumValue,
    ...props.options,
  });

  input.value.addEventListener("input", () => {
    emit("update:modelValue", autoNumericInstance.getNumber());
  });
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (autoNumericInstance && newValue !== autoNumericInstance.getNumber()) {
      autoNumericInstance.set(newValue);
    }
  }
);

onBeforeUnmount(() => {
  if (autoNumericInstance) {
    autoNumericInstance.remove();
  }
});
</script>
