<template>
  <div
    v-for="item in items"
    :key="item.name"
    class="overflow-hidden shadow rounded-lg border-2 border-transparent border-solid cursor-pointer bg-white"
    :class="{ 'border-purple-800': selectedTicker?.name === item.name }"
    @click="handleSelect(item)"
  >
    <div class="px-4 py-5 sm:p-6 text-center" :class="{ 'bg-red-100': item.price === '-' }">
      <dt class="text-sm font-medium text-gray-500 truncate">{{ item.name }} - USD</dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        {{ formatedPrice(item.price) }}
      </dd>
    </div>
    <div class="w-full border-t border-gray-200"></div>
    <atom-btn
      class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
      :item="item"
      @click.stop="handleRemove(item)"
    >
      <template v-slot:content>
        <atom-remove-svg />
        Удалить
      </template>
    </atom-btn>
  </div>
</template>

<script>
// import { unsubscribeToTicker } from "../../api/api";
import { formatedPrice } from "../../utils/formatter";
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
      type: [Object, null],
      default: null,
    },
    // coinTickers: {
    //   type: Array,
    // },
  },
  emits: {
    // "update:selectedTicker": null,
    // "update:coinTickers": null,
    "select-ticker": ticker => ticker.name && ticker.price,
    "remove-ticker": null,
  },
  // computed: {
  //   modelTicker: {
  //     get() {
  //       return this.selectedTicker;
  //     },
  //     set(value) {
  //       this.$emit("update:selectedTicker", value);
  //     },
  //   },
  //   modelTickers: {
  //     get() {
  //       return this.coinTickers;
  //     },
  //     set(value) {
  //       this.$emit("update:coinTickers", value);
  //     },
  //   },
  // },
  methods: {
    formatedPrice,
    // formatPrice(price) {
    //   if (price === "-") {
    //     return price;
    //   }
    //   return price > 1 ? Number(price).toFixed(2) : Number(price).toPrecision(2);
    // },
    handleSelect(ticker) {
      // this.modelTicker = ticker;
      this.$emit("select-ticker", ticker);
    },
    handleRemove(ticker) {
      // this.modelTickers = this.modelTickers.filter((el) => el !== ticker);

      // if (this.modelTicker === ticker) {
      //   this.modelTicker = null;
      // }
      this.$emit("remove-ticker", ticker);

      // unsubscribeToTicker(ticker);
    },
  },
};
</script>

