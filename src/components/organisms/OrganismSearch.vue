<template>
  <section>
    <div class="flex flex-col items-start">
      <div class="max-w-xs">
        <molecule-input v-model="searchCoin" @add-ticker="addTicker" />
      </div>
      <molecule-choice
        v-if="filteredNames?.length"
        :filteredNames="filteredNames"
        @select-bage="updateFromBage"
      />
      <atom-text
        v-if="isCoinErrors"
        class="mt-1 text-red-600"
        :content="isFalsyName ? 'Такого тикера нет в списке' : 'Такой тикер уже добавлен'"
      />
    </div>
    <atom-btn
      class="btn-main disabled:opacity-50"
      type="button"
      :disabled="isCoinErrors"
      @click="addTicker"
    >
      <template v-slot:content>
        <atom-add-svg />
        Добавить
      </template>
    </atom-btn>
  </section>
</template>

<script>
import { getCoinsNames, getAddedTickers } from "../../storage/storage";
import MoleculeInput from "../molecules/MoleculeInput.vue";
import MoleculeChoice from "../molecules/MoleculeChoice.vue";
import AtomBtn from "../atoms/AtomBtn.vue";
import AtomAddSvg from "../atoms/AtomAddSvg.vue";
import AtomText from "../atoms/AtomText.vue";

export default {
  name: "OrganismSearch",
  components: {
    MoleculeInput,
    MoleculeChoice,
    AtomBtn,
    AtomAddSvg,
    AtomText,
  },
  emits: {
    "add-ticker": null,
  },
  data() {
    return {
      searchCoin: "",
      allCoinsNames: [],
    };
  },
  created() {
    getCoinsNames().then((res) => (this.allCoinsNames = res));
  },
  computed: {
    filteredNames() {
      if (this.searchCoin !== "") {
        return this.allCoinsNames
          .filter((name) => name.toUpperCase().includes(this.searchCoin.toUpperCase()))
          .slice(0, 4);
      } else {
        return null;
      }
    },
    isCoinErrors() {
      return (this.isFalsyName || this.isNewTicker) && this.searchCoin !== "";
    },
    isFalsyName() {
      const correctCoin = this.allCoinsNames.find((name) => name === this.searchCoin.toUpperCase());

      return correctCoin ? false : true;
    },
    isNewTicker() {
      const tickersData = getAddedTickers();
      let newTicker = null;

      if (tickersData) {
        if (tickersData.length) {
          newTicker = tickersData.find((ticker) => ticker.name === this.searchCoin.toUpperCase());
        }
      }

      return newTicker ? true : false;
    },
  },
  methods: {
    addTicker() {
      const currentTicker = {
        name: this.searchCoin.toUpperCase(),
        price: "-",
      };

      this.$emit("add-ticker", currentTicker);

      this.searchCoin = "";
    },
    updateFromBage(tickerName) {
      this.searchCoin = tickerName;
    },
  },
};
</script>
