<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <molecule-loader v-if="isLoader" />
    <div class="container">
      <organism-search @add-ticker="addTicker" />
      <template v-if="tickers.length">
        <organism-tickers
          v-model:tickers="tickers"
          :selectedTicker="selectedTicker"
          @select-ticker="selectTicker"
          @remove-ticker="removeTicker"
        />
      </template>
      <template v-if="selectedTicker">
        <organism-graph
          v-model:graph="graph"
          :ticker-name="tickerName"
          @close-graph="closeGraph"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { subscribeToTicker, unsubscribeToTicker } from "../api/api";
import { getAddedTickers } from "../storage/storage";
import OrganismSearch from "./organisms/OrganismSearch.vue";
// import OrganismTickers from "./organisms/OrganismTickers.vue";
import OrganismTickers from "./organisms/OrganismTickers.vue";
import OrganismGraph from "./organisms/OrganismGraph.vue";
import MoleculeLoader from "./molecules/MoleculeLoader.vue";

export default {
  name: "App",
  components: {
    OrganismSearch,
    // OrganismTickers,
    OrganismTickers,
    OrganismGraph,
    MoleculeLoader,
  },
  data() {
    return {
      // searchCoin: "",
      // filterCoin: "",
      // maxGraphBars: 1,

      tickers: [],
      selectedTicker: null,

      graph: [],
      // allCoinsNames: [],

      isLoader: true,
      // page: 1,
    };
  },

  created() {
    const tickersData = getAddedTickers();

    // const tickersData = localStorage.getItem("cryptonomicon-list");

    if (tickersData) {
      this.tickers = tickersData;

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
    // this.allCoinsNames = await getCoinsNames();
  },

  computed: {
    tickerName() {
      return this.selectedTicker?.name || "";
    },
    // startPageIdx() {
    //   return 6 * (this.page - 1);
    // },
    // endPageIdx() {
    //   return 6 * this.page;
    // },
    // filteredTickers() {
    //   return this.tickers.filter((ticker) => ticker.name.includes(this.filterCoin.toUpperCase()));
    // },
    // paginatedTickers() {
    //   return this.filteredTickers.slice(this.startPageIdx, this.endPageIdx);
    // },
    // hasNextPage() {
    //   return this.filteredTickers.length > this.endPageIdx;
    // },
    // normalizedGraph() {
    //   const minValue = Math.min(...this.graph);
    //   const maxValue = Math.max(...this.graph);
    //   if (minValue === maxValue) {
    //     return this.graph.map(() => 50);
    //   }
    //   return this.graph.map((price) => 5 + ((price - minValue) * 95) / (maxValue - minValue));
    // },
    // pageStateOptions() {
    //   return {
    //     filter: this.filterCoin,
    //     page: this.page,
    //   };
    // },
  },

  methods: {
    updateTicker(tickerName, price) {
      this.tickers
        .filter((t) => t.name === tickerName)
        .forEach((t) => {
          if (t === this.selectedTicker) {
            this.graph.push(price);

            // while (this.graph.length > this.maxGraphBars) {
            //   this.graph.shift();
            // }
          }

          t.price = price;
        });
    },

    // async updateTickers() {
    //   if (!this.tickers.length) {
    //     return;
    //   }
    // },

    addTicker(currentTicker) {
      this.tickers = [...this.tickers, currentTicker];
      // this.filterCoin = "";

      subscribeToTicker(currentTicker.name, (newPrice) =>
        this.updateTicker(currentTicker.name, newPrice)
      );
    },

    selectTicker(ticker) {
      this.selectedTicker = ticker;
    },

    removeTicker(tickerToRemove) {
      this.tickers = this.tickers.filter((el) => el !== tickerToRemove);

      if (this.selectedTicker === tickerToRemove) {
        this.selectedTicker = null;
      }

      unsubscribeToTicker(tickerToRemove.name);
    },

    closeGraph() {
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
    // paginatedTickers() {
    //   if (this.paginatedTickers.length === 0 && this.page > 1) {
    //     this.page -= 1;
    //   }
    // },

    // filterCoin() {
    //   this.page = 1;
    // },

    // pageStateOptions(val) {
    //   history.pushState(
    //     null,
    //     document.title,
    //     `${window.location.pathname}?filter=${val.filter}&page=${val.page}`
    //   );
    // },
  },
};
</script>
