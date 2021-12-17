<template>
  <button @click="onClick">
    <slot></slot>
    {{ content }}
  </button>
</template>

<script>
export default {
  name: "AtomSlotBtn",
  props: {
    content: {
      type: String,
    },
    handleClick: {
      type: Function,
      required: true,
    },
    item: {
      type: Object,
    },
  },
  methods: {
    onClick(e) {
      if (this.item) {
        e.stopPropagation();

        this.handleClick(this.item);
      } else {
        this.handleClick();
      }
    },
  },
};
</script>

<style></style>
