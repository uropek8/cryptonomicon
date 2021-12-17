<template>
  <div
    class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
  >
    <atom-loader-svg />
  </div>
</template>

<script>
import AtomLoaderSvg from "../atoms/AtomLoaderSvg.vue";

export default {
  name: "MoleculeLoader",
  components: {
    AtomLoaderSvg,
  },
};
</script>

<style></style>
