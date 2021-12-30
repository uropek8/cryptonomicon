<template>
  <span
    class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
  >
    {{ content }}
  </span>
</template>

<script>
export default {
  name: "AtomBadge",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
