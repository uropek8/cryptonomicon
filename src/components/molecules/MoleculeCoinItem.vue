<template>
  <div
    v-for="item in items"
    :key="item.name"
    class="overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
    :class="[{ 'border-2': selectedTicker === item }, isPricedTicker ? 'bg-white' : 'bg-red-100']"
    @click="handleSelectTicker(item)"
  >
    <div class="px-4 py-5 sm:p-6 text-center" :class="{ 'bg-red-100': item.price === '-' }">
      <dt class="text-sm font-medium text-gray-500 truncate">{{ item.name }} - USD</dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        {{ formatPrice(item.price) }}
      </dd>
    </div>
    <div class="w-full border-t border-gray-200"></div>
    <atom-btn
      class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
      :item="item"
      @click="handleDelete(item)"
    >
      <template v-slot:content>
        <atom-remove-svg />
        Удалить
      </template>
    </atom-btn>
  </div>
</template>

<script>
import AtomRemoveSvg from "../atoms/AtomRemoveSvg.vue";
import AtomBtn from "../atoms/AtomBtn.vue";

export default {
  name: "MoleculeCoinItem",
  components: {
    AtomRemoveSvg,
    AtomBtn,
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
