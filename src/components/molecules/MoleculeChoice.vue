<template>
  <div class="flex bg-white shadow-md p-1 mt-2 rounded-md shadow-md flex-wrap">
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
    filteredNames: {
      type: Array,
      required: false,
    },
  },
  emits: {
    "select-bage": null,
  },
  methods: {
    handleBadgeClick(coin) {
      this.$emit("select-bage", coin.toLowerCase());
    },
  },
};
</script>
