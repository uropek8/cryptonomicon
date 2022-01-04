<template>
  <input
    class="search-input"
    v-model.trim="inputValue"
  />
</template>

<script>
export default {
  name: "AtomInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: {
    "update:modelValue": null,
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
