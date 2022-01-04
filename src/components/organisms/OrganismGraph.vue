<template>
  <section class="relative">
    <atom-title
      class="text-lg leading-6 font-medium text-gray-900 my-8"
      tag="h3"
      :content="tickerName + ' - USD'"
    />
    <molecule-graph v-model:graph="modelGraph" />
    <atom-btn class="absolute top-0 right-0" type="button" @click="handleGraphClose">
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
    tickerName: {
      type: String,
      default: "",
    },
    graph: {
      type: Array,
    },
  },
  emits: {
    "update:graph": null,
    "close-graph": null,
  },
  computed: {
    modelGraph: {
      get() {
        return this.graph;
      },
      set(value) {
        this.$emit("update:graph", value);
      },
    },
  },
  methods: {
    handleGraphClose() {
      this.$emit("close-graph");
    },
  },
};
</script>
