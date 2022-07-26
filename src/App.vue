<template>
  <main>
      <LoadingComponent v-if="!state.loaded"></LoadingComponent>

    <button
      @click="getAnimalByIndex"
      v-if="state.loaded && lenght > 1 && state.index != 0"
    >
      <MaterialIcon :icon="'mdi-chevron-left'"></MaterialIcon>
    </button>
      <CardAnimal
        :animal="state.animal"
        v-show="state.loaded"
        @loadImage="loadImage"
      ></CardAnimal>
    <button @click="getAnimal" v-if="state.loaded">
      <MaterialIcon :icon="'mdi-chevron-right'"></MaterialIcon>
    </button>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useIndex } from "./js";
import CardAnimal from "./components/CardAnimal.vue";
import MaterialIcon from "./components/MaterialIcon.vue";
import LoadingComponent from "./components/LoadingComponent.vue";
import { useStore } from "./store/store";

const { axios } = useIndex();
const store = useStore();

const state = reactive({
  animal: {},
  loaded: false,
  index: -1,
});

const lenght = computed(() => store.getAnimals.length);

const getAnimalByIndex = () => {
  state.index -= 1;
  state.animal = store.getAnimal(state.index);
};

const getAnimal = async () => {
  state.loaded = false;
  state.index += 1;

  if (!store.getAnimal(state.index)) {
    const { data } = await axios.get("/rand");
    store.setAnimal(data);
  }

  state.animal = store.getAnimal(state.index);
};

const loadImage = (value) => (state.loaded = value);

onMounted(getAnimal);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "IBM Plex Sans", sans-serif;

  --green: #4fd6ad;
  --shadow: 6px 8px 8px rgba(0, 0, 0, 0.07);
}

ul {
  list-style: none;
}

main {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  background-color: #f0f0f0;
}

button {
  outline: none;
  border: none;
  background-color: #ffffff;
  color: var(--green);
  box-shadow: var(--shadow);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 2.5em;
  cursor: pointer;
}
</style>
