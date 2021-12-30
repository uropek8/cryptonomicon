<template>
  <div
    v-if="filteredNames?.length"
    class="flex bg-white shadow-md p-1 mt-2 rounded-md shadow-md flex-wrap"
  >
    <atom-badge
      v-for="coin in filteredNames"
      :key="coin"
      :content="coin"
      @click="handleBadgeClick(coin)"
    />
  </div>
</template>

<script>
import AtomBadge from "../atoms/AtomBadge.vue";

export default {
  name: "MoleculeChoice",
  components: {
    AtomBadge,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    allCoinsNames: {
      type: Array,
      required: true,
    },
  },
  emits: {
    "update:modelValue": null,
  },
  methods: {
    handleBadgeClick(coin) {
      this.$emit("update:modelValue", coin.toLowerCase());
    },
  },
  computed: {
    filteredNames() {
      if (this.modelValue !== "") {
        return this.allCoinsNames
          .filter((name) => name.toUpperCase().includes(this.modelValue.toUpperCase()))
          .slice(0, 4);
      } else {
        return null;
      }
    },
  },
};
</script>

<style></style>
