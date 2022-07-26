<template>
  <main>
    <LoadingComponent v-if="!state.loaded"></LoadingComponent>
    <section v-show="state.loaded">
      <ButtonIcon
        @click="getAnimalByIndex"
        :icon="'mdi-chevron-left'"
        v-if="lenght > 1 && state.index != 0 && !state.buttonsMobileVisibility"
      ></ButtonIcon>
      <CardAnimal
        :animal="state.animal"
        @loadImage="loadImage"
        :isMobile="state.buttonsMobileVisibility"
      ></CardAnimal>
      <ButtonIcon
        @click="getAnimal"
        :icon="'mdi-chevron-right'"
        v-if="!state.buttonsMobileVisibility"
      ></ButtonIcon>
      <div class="button-mobile" v-if="state.buttonsMobileVisibility">
        <ButtonIcon
          @click="getAnimalByIndex"
          v-if="lenght > 1 && state.index != 0"
          :icon="'mdi-chevron-left'"
        >
        </ButtonIcon>
        <ButtonIcon @click="getAnimal" :icon="'mdi-chevron-right'"></ButtonIcon>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useIndex } from "./js";
import CardAnimal from "./components/CardAnimal.vue";
import LoadingComponent from "./components/LoadingComponent.vue";
import { useStore } from "./store/store";
import ButtonIcon from "./components/ButtonIcon.vue";

const { axios } = useIndex();
const store = useStore();

const state = reactive({
  animal: {},
  loaded: false,
  index: -1,
  buttonsMobileVisibility: false,
});

const lenght = computed(() => store.getAnimals.length);
const media = window.matchMedia("screen and (max-width: 768px)");

const resize = (value) => (state.buttonsMobileVisibility = value);

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

resize(media.matches);
window.addEventListener("resize", () => resize(media.matches));
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

button{
  outline: none;
  border: none;
  cursor: pointer;
}

main {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
}

.button-mobile {
  position: absolute;
  margin: 0 auto;
  bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
}

@media screen and (max-width: 768px) {
  main > section {
    width: 100%;
    height: 100vh;
  }
}
</style>
