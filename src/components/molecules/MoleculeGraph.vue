<template>
  <div class="flex items-end border-gray-600 border-b border-l h-64" ref="graph">
    <atom-graph-line
      v-for="(bar, idx) in normalizedGraph"
      :key="idx"
      :style="{ height: `${bar}%`, width: `${$options.GRAPH_ELEMENT_WIDTH}px` }"
    />
  </div>
</template>

<script>
import AtomGraphLine from "../atoms/AtomGraphLine.vue";

const GRAPH_ELEMENT_WIDTH = 40;

export default {
  name: "MoleculeGraph",
  components: {
    AtomGraphLine,
  },
  props: {
    graph: {
      type: Array,
    },
  },
  emits: {
    "update:graph": null,
  },
  data() {
    return {
      maxGraphBars: 1,
    };
  },
  GRAPH_ELEMENT_WIDTH,
  computed: {
    modelGraph: {
      get() {
        return this.graph;
      },
      set(value) {
        this.$emit("update:graph", value);
      },
    },
    normalizedGraph() {
      const minValue = Math.min(...this.modelGraph);
      const maxValue = Math.max(...this.modelGraph);

      if (minValue === maxValue) {
        return this.modelGraph.map(() => 50);
      }

      return this.modelGraph.map((bar) => 5 + ((bar - minValue) * 95) / (maxValue - minValue));
    },
  },
  mounted() {
    this.checkMaxGraphElements();

    window.addEventListener("resize", this.checkMaxGraphElements);
  },
  methods: {
    checkMaxGraphElements() {
      if (!this.$refs.graph) {
        return;
      }

      this.maxGraphBars = this.$refs.graph.clientWidth / this.$options.GRAPH_ELEMENT_WIDTH;
    },
  },
  watch: {
    normalizedGraph() {
      if (this.modelGraph.length > this.maxGraphBars) {
        this.modelGraph.shift();
      }
    },
    maxGraphBars(newVal, oldVal) {
      if (newVal < oldVal) {
        const endGraphIdx = Number((this.maxGraphBars).toFixed());
        this.modelGraph = this.modelGraph.slice(0, endGraphIdx);
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMaxGraphElements);
  },
};
</script>
