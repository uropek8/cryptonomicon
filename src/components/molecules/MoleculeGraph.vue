<template>
  <div class="flex items-end border-gray-600 border-b border-l h-64" ref="graph">
    <atom-graph-line
      v-for="(item, idx) in items"
      :key="idx"
      :style="{ height: `${item}%`, width: `${$options.GRAPH_ELEMENT_WIDTH}px` }"
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
    items: {
      type: Array,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  emits: {
    "update:modelValue": null,
  },
  GRAPH_ELEMENT_WIDTH,
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
  mounted() {
    this.checkMaxGraphElements();
    window.addEventListener("resize", this.checkMaxGraphElements);
  },
  methods: {
    checkMaxGraphElements() {
      if (!this.$refs.graph) {
        return;
      }

      this.maxGraphElements = this.$refs.graph.clientWidth / GRAPH_ELEMENT_WIDTH;
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMaxGraphElements);
  },
};
</script>

<style></style>
