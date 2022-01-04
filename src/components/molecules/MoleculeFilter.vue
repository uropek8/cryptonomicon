<template>
  <p>
    {{ name }}:
    <atom-input type="text" v-model="modelFilter" />
    <atom-btn v-if="modelPage > 1" class="btn-main mx-2" type="button" @click="handleClickBack">
      <template v-slot:content>Назад</template>
    </atom-btn>
    <atom-btn v-if="hasNextPage" class="btn-main mx-2" type="button" @click="handleClickNext">
      <template v-slot:content>Вперед</template>
    </atom-btn>
  </p>
</template>

<script>
import AtomBtn from "../atoms/AtomBtn.vue";
import AtomInput from "../atoms/AtomInput.vue";

export default {
  name: "MoleculeFilter",
  components: {
    AtomInput,
    AtomBtn,
  },
  props: {
    name: {
      type: String,
      default: "Фильтр",
    },
    filterCoin: {
      type: String,
      default: "",
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    hasNextPage: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    "update:filterCoin": null,
    "update:currentPage": null,
  },
  computed: {
    modelFilter: {
      get() {
        return this.filterCoin;
      },
      set(value) {
        this.$emit("update:filterCoin", value);
      },
    },
    modelPage: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit("update:currentPage", value);
      },
    },
  },
  methods: {
    handleClickBack() {
      this.modelPage = this.modelPage - 1;
    },
    handleClickNext() {
      this.modelPage = this.modelPage + 1;
    },
  },
};
</script>
