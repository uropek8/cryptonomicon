<template>
  <p class="text-sm">
    {{ content }}
  </p>
</template>

<script>
export default {
  name: "AtomText",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
