<template>
  <component :is="tag">{{ content }}</component>
</template>

<script>
export default {
  name: "AtomTitle",
  props: {
    tag: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
