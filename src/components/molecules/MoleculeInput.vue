<template>
  <atom-label forId="wallet" content="Тикер" />
  <div class="mt-1 relative rounded-md shadow-md">
    <!-- <input
      v-model="ticker"
      @keydown.enter="add"
      type="text"
      name="wallet"
      id="wallet"
      ref="tickerInput"
      class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
      placeholder="Например DOGE"
    /> -->
    <atom-input
      class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
      type="text"
      name="wallet"
      id="wallet"
      v-model="inputValue"
      @keydown.enter="handleAdd"
      placeholder="Например DOGE"
    />
  </div>
</template>

<script>
import AtomLabel from "../atoms/AtomLabel.vue";
import AtomInput from "../atoms/AtomInput.vue";

export default {
  name: "MoleculeInput",
  components: { AtomLabel, AtomInput },
  props: {
    handleAdd: {
      type: Function,
      required: true,
    },
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

<style></style>
