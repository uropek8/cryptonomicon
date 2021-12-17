<template>
  <button @click="handleClick">
    {{ content }}
  </button>
</template>

<script>
export default {
  name: "AtomBtn",
  props: {
    content: {
      type: String,
      default: "",
    },
    handleClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style></style>
