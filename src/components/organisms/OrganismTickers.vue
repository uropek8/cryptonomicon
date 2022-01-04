<template>
  <molecule-filter
    name="Фильтр"
    v-model:filter-coin="filterCoin"
    v-model:current-page="page"
    :hasNextPage="hasNextPage"
  />
  <atom-line />
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <molecule-coin-item
      :items="paginatedTickers"
      :selectedTicker="selectedTicker"
      @select-ticker="selectTicker"
      @remove-ticker="removeTicker"
    />
  </dl>
  <atom-line />
</template>

<script>
import MoleculeFilter from "../molecules/MoleculeFilter.vue";
import MoleculeCoinItem from "../molecules/MoleculeCoinItem.vue";
import AtomLine from "../atoms/AtomLine.vue";

export default {
  name: "OrganismTickers",
  components: {
    MoleculeFilter,
    MoleculeCoinItem,
    AtomLine,
  },
  props: {
    tickers: {
      type: Array,
    },
    selectedTicker: {
      type: [Object, null],
      default: null,
    },
  },
  emits: {
    "update:tickers": null,
    "select-ticker": (ticker) => ticker.name && ticker.price,
    "remove-ticker": (ticker) => ticker.name && ticker.price,
  },
  data() {
    return {
      filterCoin: "",
      page: 1,
    };
  },
  mounted() {
    const urlData = Object.fromEntries(new URL(window.location).searchParams.entries());

    if (urlData.filter) {
      this.filterCoin = urlData.filter;
    }
    if (urlData.page) {
      this.page = Number(urlData.page);
    }
  },
  computed: {
    modelTickers: {
      get() {
        return this.tickers;
      },
      set(value) {
        this.$emit("update:tickers", value);
      },
    },
    pageStateOptions() {
      return {
        filter: this.filterCoin,
        page: this.page,
      };
    },
    startPageIdx() {
      return 6 * (this.page - 1);
    },
    endPageIdx() {
      return 6 * this.page;
    },
    filteredTickers() {
      return this.modelTickers.filter((ticker) =>
        ticker.name.includes(this.filterCoin.toUpperCase())
      );
    },
    hasNextPage() {
      return this.filteredTickers.length > this.endPageIdx;
    },
    paginatedTickers() {
      return this.filteredTickers.slice(this.startPageIdx, this.endPageIdx);
    },
  },
  methods: {
    selectTicker(ticker) {
      this.$emit("select-ticker", ticker);
    },
    removeTicker(ticker) {
      this.$emit("remove-ticker", ticker);
    },
  },
  watch: {
    paginatedTickers() {
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },
    filterCoin() {
      this.page = 1;
    },
    pageStateOptions(val) {
      history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${val.filter}&page=${val.page}`
      );
    },
  },
};
</script>
