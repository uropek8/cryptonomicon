<template>
  <atom-label for="wallet" content="Тикер" />
  <div class="mt-1 relative rounded-md shadow-md">
    <atom-input
      class="w-full"
      type="text"
      name="wallet"
      id="wallet"
      ref="tickerInput"
      v-model="inputValue"
      @keydown.enter="handleAddTicker"
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
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: {
    "update:modelValue": null,
    "add-ticker": null,
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
  methods: {
    handleAddTicker() {
      this.$emit("add-ticker");
    }
  }
};
</script>

<style></style>
