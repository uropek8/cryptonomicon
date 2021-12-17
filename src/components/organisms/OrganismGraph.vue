<template>
  <section class="relative">
    <atom-title
      class="text-lg leading-6 font-medium text-gray-900 my-8"
      tag="h3"
      :content="selectedTicker.name + ' ' + '- USD'"
    />
    <molecule-graph v-model="maxGraphElements" :items="normalizedGraph" />
    <atom-slot-btn class="absolute top-0 right-0" type="button" :handleClick="handleTickerClose">
      <atom-close-svg />
    </atom-slot-btn>
  </section>
</template>

<script>
import AtomTitle from "../atoms/AtomTitle.vue";
import AtomSlotBtn from "../atoms/AtomSlotBtn.vue";
import AtomCloseSvg from "../atoms/AtomCloseSvg.vue";
import MoleculeGraph from "../molecules/MoleculeGraph.vue";

export default {
  name: "OrganismGraph",
  components: {
    AtomTitle,
    AtomSlotBtn,
    AtomCloseSvg,
    MoleculeGraph,
  },
  props: {
    normalizedGraph: {
      type: Array,
    },
    selectedTicker: {
      type: [Object, null],
    },
    handleTickerClose: {
      type: Function,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  emits: {
    "update:modelValue": null,
  },
  computed: {
    maxGraphElements: {
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
