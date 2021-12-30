<template>
  <section class="relative">
    <atom-title
      class="text-lg leading-6 font-medium text-gray-900 my-8"
      tag="h3"
      :content="selectedTicker.name + ' ' + '- USD'"
    />
    <molecule-graph v-model="maxGraphElements" :items="normalizedGraph" />
    <atom-btn class="absolute top-0 right-0" type="button" @click="handleTickerClose">
      <template v-slot:content>
        <atom-close-svg />
      </template>
    </atom-btn>
  </section>
</template>

<script>
import AtomTitle from "../atoms/AtomTitle.vue";
import AtomBtn from "../atoms/AtomBtn.vue";
import AtomCloseSvg from "../atoms/AtomCloseSvg.vue";
import MoleculeGraph from "../molecules/MoleculeGraph.vue";

export default {
  name: "OrganismGraph",
  components: {
    AtomTitle,
    AtomBtn,
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
