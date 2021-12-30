<template>
  <section>
    <div class="flex flex-col items-start">
      <div class="max-w-xs">
        <molecule-input v-model="searchValue" :handleAdd="handleAddTicker" />
      </div>
      <molecule-choice v-model="searchValue" :allCoinsNames="allCoinsNames" />
      <atom-text
        v-if="isCoinErrors"
        class="mt-1 text-red-600"
        :content="isFalsyName ? 'Такого тикера нет в списке' : 'Такой тикер уже добавлен'"
      />
    </div>
    <atom-btn
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
      type="button"
      :disabled="isCoinErrors"
      @click="handleAddTicker"
    >
      <template v-slot:content>
        <atom-add-svg />
        Добавить
      </template>
    </atom-btn>
  </section>
</template>

<script>
import { getCoinsNames } from "../../storage/storage";
import MoleculeInput from "../molecules/MoleculeInput.vue";
import MoleculeChoice from "../molecules/MoleculeChoice.vue";
import AtomBtn from "../atoms/AtomBtn.vue";
import AtomAddSvg from "../atoms/AtomAddSvg.vue";
import AtomText from "../atoms/AtomText.vue";

export default {
  name: "OrganismTopFilter",
  components: {
    MoleculeInput,
    MoleculeChoice,
    AtomBtn,
    AtomAddSvg,
    AtomText,
  },
  props: {
    addTicker: {
      type: Function,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    coinTickers: {
      type: Array,
    },
  },
  emits: {
    "update:modelValue": null,
    "update:coinTickers": null,
  },
  data() {
    return {
      allCoinsNames: [],
    };
  },
  async created() {
    this.allCoinsNames = await getCoinsNames();
  },
  computed: {
    searchValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    modelTickers: {
      get() {
        return this.coinTickers;
      },
      set(value) {
        this.$emit("update:coinTickers", value);
      },
    },
    isCoinErrors() {
      return (this.isFalsyName || this.isNewTicker) && this.searchValue !== "";
    },
    isFalsyName() {
      const correctCoin = this.allCoinsNames.find(
        (name) => name === this.searchValue.toUpperCase()
      );

      return correctCoin ? false : true;
    },
    isNewTicker() {
      let newTicker = null;

      if (this.modelTickers.length) {
        newTicker = this.modelTickers.find(
          (ticker) => ticker.name === this.searchValue.toUpperCase()
        );
      }

      return newTicker ? true : false;
    },
  },
  methods: {
    handleAddTicker() {
      const currentTicker = {
        name: this.searchValue.toUpperCase(),
        price: "-",
      };
      
      this.modelTickers = [...this.modelTickers, currentTicker];
      this.searchValue = "";
      
      this.addTicker(currentTicker);
    },
  },
};
</script>

<style></style>
