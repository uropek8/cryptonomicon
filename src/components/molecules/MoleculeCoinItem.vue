<template>
  <div
    v-for="item in items"
    :key="item.name"
    class="overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
    :class="[{ 'border-2': selectedTicker === item }, isPricedTicker ? 'bg-white' : 'bg-red-100']"
    @click="handleSelectTicker(item)"
  >
    <div class="px-4 py-5 sm:p-6 text-center">
      <dt class="text-sm font-medium text-gray-500 truncate">{{ item.name }} - USD</dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        {{ formatPrice(item.price) }}
      </dd>
    </div>
    <div class="w-full border-t border-gray-200"></div>
    <!-- <button
      @click.stop="handleDelete(t)"
      class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#718096"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        ></path></svg
      >Удалить
    </button> -->
    <atom-slot-btn
      class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
      content="Удалить"
      :item="item"
      :handleClick="handleDelete"
    >
      <atom-remove-svg />
    </atom-slot-btn>
  </div>
</template>

<script>
import AtomRemoveSvg from "../atoms/AtomRemoveSvg.vue";
import AtomSlotBtn from "../atoms/AtomSlotBtn.vue";

export default {
  name: "MoleculeCoinItem",
  components: {
    AtomRemoveSvg,
    AtomSlotBtn,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedTicker: {
      type: Object,
    },
    isPricedTicker: {
      type: Boolean,
      default: false,
    },
    handleSelectTicker: {
      type: Function,
      required: true,
    },
    handleDelete: {
      type: Function,
      required: true,
    },
  },
  methods: {
    formatPrice(price) {
      if (price === "-") {
        return price;
      }
      return price > 1 ? Number(price).toFixed(2) : Number(price).toPrecision(2);
    },
  },
};
</script>

<style></style>
