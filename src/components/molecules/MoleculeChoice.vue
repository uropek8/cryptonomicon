<template>
  <div class="flex bg-white shadow-md p-1 mt-4 rounded-md shadow-md flex-wrap">
    <atom-badge :items="filteredNames" :handleChoice="handleChoice" />
  </div>
  <atom-text v-if="isError" class="text-red-600" content="Такой тикер уже добавлен" />
</template>

<script>
import AtomBadge from "../atoms/AtomBadge.vue";
import AtomText from "../atoms/AtomText.vue";

export default {
  name: "MoleculeChoice",
  components: {
    AtomBadge,
    AtomText,
  },
  props: {
    handleChoice: {
      type: Function,
      required: true,
    },
    filteredNames: {
      type: Array,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
