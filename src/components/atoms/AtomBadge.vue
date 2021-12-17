<template>
  <span
    class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
    v-for="item in items"
    :key="item.Symbol"
    @click="handleChoice(item.Symbol)"
  >
    {{ item.Symbol }}
  </span>
</template>

<script>
export default {
  name: "AtomBadge",
  props: {
    handleChoice: {
      type: Function,
      required: true,
    },
    items: {
      type: Array,
    },
  },
};
</script>

<style></style>
