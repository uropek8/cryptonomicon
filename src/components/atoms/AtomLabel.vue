<template>
  <label class="block text-sm font-medium text-gray-700">{{ content }}</label>
</template>

<script>
export default {
  name: "AtomLabel",
  props: {
    content: {
      type: String,
      default: "",
    },
  }
};
</script>
