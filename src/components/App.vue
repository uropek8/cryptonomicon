<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <molecule-loader v-if="isLoader" />
    <div class="container">
      <organism-top-filter
        v-model="searchCoin"
        v-model:coin-tickers="tickers"
        :addTicker="addTicker"
      />
      <template v-if="tickers.length">
        <molecule-filter
          name="Фильтр"
          :hasNextPage="hasNextPage"
          v-model:input-filter="filterCoin"
          v-model:current-page="page"
        />
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <molecule-coin-item
            :items="paginatedTickers"
            :selectedTicker="selectedTicker"
            :isPricedTicker="isPricedTicker"
            :handleSelectTicker="handleSelectTicker"
            :handleDelete="handleDelete"
          />
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
      </template>
      <template v-if="selectedTicker">
        <organism-graph
          :selectedTicker="selectedTicker"
          v-model="maxGraphElements"
          :normalizedGraph="normalizedGraph"
          :handleTickerClose="handleTickerClose"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { subscribeToTicker, unsubscribeToTicker } from "../api/api";
import { getCoinsNames } from "../storage/storage";
import OrganismTopFilter from "./organisms/OrganismTopFilter.vue";
import OrganismGraph from "./organisms/OrganismGraph.vue";
import MoleculeLoader from "./molecules/MoleculeLoader.vue";
import MoleculeFilter from "./molecules/MoleculeFilter.vue";
import MoleculeCoinItem from "./molecules/MoleculeCoinItem.vue";

export default {
  name: "App",
  components: {
    OrganismTopFilter,
    OrganismGraph,
    MoleculeLoader,
    MoleculeFilter,
    MoleculeCoinItem,
  },
  data() {
    return {
      searchCoin: "",
      filterCoin: "",
      maxGraphElements: 1,

      tickers: [],
      selectedTicker: null,

      graph: [],
      allCoinsNames: [],

      isLoader: true,
      page: 1,

      isPricedTicker: true,
    };
  },

  async created() {
    const windowData = Object.fromEntries(new URL(window.location).searchParams.entries());

    if (windowData.filter) {
      this.filterCoin = windowData.filter;
    }

    if (windowData.page) {
      this.page = Number(windowData.page);
    }

    const tickersData = localStorage.getItem("cryptonomicon-list");

    if (tickersData) {
      this.tickers = JSON.parse(tickersData);
      this.tickers.forEach((ticker) => {
        subscribeToTicker(ticker.name, (newPrice) => this.updateTicker(ticker.name, newPrice));
      });
    }

    // let coinsNamesData = localStorage.getItem("coins-names");

    // if (coinsNamesData) {
    //   coinsNamesData = JSON.parse(coinsNamesData);
    // } else {
    //   coinsNamesData = await getCoinsList();

    //   localStorage.setItem("coins-names", JSON.stringify(coinsNamesData));
    // }

    this.isLoader = false;
    this.allCoinsNames = await getCoinsNames();
  },

  computed: {
    startPageIdx() {
      return 6 * (this.page - 1);
    },

    endPageIdx() {
      return 6 * this.page;
    },

    filteredTickers() {
      return this.tickers.filter((ticker) => ticker.name.includes(this.filterCoin.toUpperCase()));
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.startPageIdx, this.endPageIdx);
    },

    hasNextPage() {
      return this.filteredTickers.length > this.endPageIdx;
    },

    normalizedGraph() {
      const minValue = Math.min(...this.graph);
      const maxValue = Math.max(...this.graph);

      if (minValue === maxValue) {
        return this.graph.map(() => 50);
      }
      return this.graph.map((price) => 5 + ((price - minValue) * 95) / (maxValue - minValue));
    },

    pageStateOptions() {
      return {
        filter: this.filterCoin,
        page: this.page,
      };
    },
  },

  methods: {
    updateTicker(tickerName, price) {
      this.tickers
        .filter((t) => t.name === tickerName)
        .forEach((t) => {
          if (t === this.selectedTicker) {
            this.graph.push(price);

            while (this.graph.length > this.maxGraphElements) {
              this.graph.shift();
            }
          }

          t.price = price;
        });
    },

    async updateTickers() {
      if (!this.tickers.length) {
        return;
      }
    },

    addTicker(currentTicker) {
      this.filterCoin = "";

      subscribeToTicker(currentTicker.name, (newPrice) =>
        this.updateTicker(currentTicker.name, newPrice)
      );
    },

    handleDelete(tickerToRemove) {
      this.tickers = this.tickers.filter((el) => el !== tickerToRemove);

      if (this.selectedTicker === tickerToRemove) {
        this.selectedTicker = null;
      }

      unsubscribeToTicker(tickerToRemove.name);
    },

    handleSelectTicker(tickerEl) {
      this.selectedTicker = tickerEl;
    },

    handleTickerClose() {
      if (this.selectedTicker) {
        this.selectedTicker = null;
      }
    },
  },

  watch: {
    tickers() {
      localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
    },

    selectedTicker() {
      this.graph = [];
    },

    paginatedTickers() {
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },

    filter() {
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
