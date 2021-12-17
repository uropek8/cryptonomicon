<template>
  <label :for="forId" class="block text-sm font-medium text-gray-700">{{ content }}</label>
</template>

<script>
export default {
  name: "AtomLabel",
  props: {
    forId: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  }
};
</script>

<style></style>
