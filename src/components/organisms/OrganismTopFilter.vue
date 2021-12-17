<template>
  <section>
    <div class="flex flex-col items-start">
      <div class="max-w-xs">
        <molecule-input v-model="inputValue" :handleAdd="handleClick" />
      </div>
      <molecule-choice
        v-if="inputValue && filteredNames.length"
        :filteredNames="filteredNames"
        :isError="isError"
        :handleChoice="handleChoice"
      />
    </div>
    <atom-slot-btn
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      content="Добавить"
      :handleClick="handleClick"
    >
      <atom-add-svg />
    </atom-slot-btn>
  </section>
</template>

<script>
import MoleculeInput from "../molecules/MoleculeInput.vue";
import MoleculeChoice from "../molecules/MoleculeChoice.vue";
import AtomSlotBtn from "../atoms/AtomSlotBtn.vue";
import AtomAddSvg from "../atoms/AtomAddSvg.vue";

export default {
  name: "OrganismTopFilter",
  components: {
    MoleculeInput,
    MoleculeChoice,
    AtomSlotBtn,
    AtomAddSvg,
  },
  props: {
    handleClick: {
      type: Function,
      required: true,
    },
    handleChoice: {
      type: Function,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    filteredNames: {
      type: Array,
    },
    isError: {
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
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style></style>
