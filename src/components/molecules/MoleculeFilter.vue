<template>
  <p>
    {{ name }}:
    <!-- <input
      v-model="filter"
      class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
      type="text"
    /> -->
    <atom-input
      class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
      type="text"
      v-model="inputValue"
    />
    <!-- <button
      v-if="page > 1"
      @click="page = page - 1"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Назад
    </button> -->
    <atom-btn
      v-if="page > 1"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      type="button"
      content="Назад"
      :handleClick="handleClickBack"
    />
    <!-- <button
      v-if="hasNextPage"
      @click="page = page + 1"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Вперед
    </button> -->
    <atom-btn
      v-if="hasNextPage"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      type="button"
      content="Вперед"
      :handleClick="handleClickNext"
    />
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
      default: "",
    },
    inputFilter: {
      type: String,
      default: "",
    },
    currentPage: {
      type: String,
      default: "1",
    },
    hasNextPage: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    "update:modelValue": null,
  },
  computed: {
    inputValue: {
      get() {
        return this.inputFilter;
      },
      set(value) {
        this.$emit("update:inputFilter", value);
      },
    },
    page: {
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
      this.page = this.page - 1;
    },
    handleClickNext() {
      this.page = this.page + 1;
    },
  },
};
</script>

<style></style>
