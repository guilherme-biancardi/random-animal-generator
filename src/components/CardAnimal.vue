<template>
  <article class="card-content flex-column">
    <div class="image-content">
      <button
        class="btn-menu"
        v-if="isMobile"
        @click="state.infoVisibility = !state.infoVisibility"
      >
        <MaterialIcon :icon="state.icons[state.infoVisibility]"></MaterialIcon>
      </button>
      <a :href="animalData.image" target="_blank" class="image-link"
        ><MaterialIcon :icon="'mdi-fullscreen'"></MaterialIcon
      ></a>
      <ul class="info-list flex-column" v-if="state.infoVisibility">
        <InfoTooltip
          v-for="(info, index) in animalData.informationTooltip"
          :key="index"
          :icon="info.icon"
          :text="info.text"
        ></InfoTooltip>
      </ul>
      <img :src="animalData.image" @load="isLoadImage" alt="animal image" />
    </div>
    <ul class="text-list flex-column">
      <InfoText
        v-for="(info, index) in animalData.informationText"
        :key="index"
        :title="info.title"
        :text="info.text"
      ></InfoText>
    </ul>
  </article>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import InfoTooltip from "./InfoTooltip.vue";
import InfoText from "./InfoText.vue";
import MaterialIcon from "./MaterialIcon.vue";

const props = defineProps({
  animal: Object,
  isMobile: Boolean,
});

const state = reactive({
  infoVisibility: true,
  icons: {
    true: "mdi-menu-up",
    false: "mdi-menu-down",
  },
});

onMounted(() => (state.infoVisibility = !props.isMobile));

watch(
  computed(() => props.isMobile),
  (val) => (state.infoVisibility = !val)
);

const emit = defineEmits(["loadImage"]);

const isLoadImage = () => emit("loadImage", true);

const animalData = computed(() => {
  const {
    image_link,
    geo_range,
    lifespan,
    length_min,
    length_max,
    weight_min,
    weight_max,
    name,
    latin_name,
    habitat,
    diet,
  } = props.animal;

  return {
    image: image_link,
    informationTooltip: [
      {
        icon: "mdi-map-marker",
        text: geo_range,
      },
      {
        icon: "mdi-clock-outline",
        text: `${lifespan} years`,
      },
      {
        icon: "mdi-ruler",
        text: `${length_min}-${length_max}ft`,
      },
      {
        icon: "mdi-weight-pound",
        text: `${weight_min}-${weight_max}lbs`,
      },
    ],
    informationText: [
      {
        title: "name",
        text: name,
      },
      {
        title: "Species",
        text: latin_name,
      },
      {
        title: "Habitat",
        text: habitat,
      },
      {
        title: "Diet",
        text: diet,
      },
    ],
  };
});
</script>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}

.card-content {
  width: 385px;
  padding: 14px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: var(--shadow);
  row-gap: 4px;
}

.image-content {
  position: relative;
  height: max-content;
}

.image-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: top left;
  border-radius: 12px;
}

.info-list {
  position: absolute;
  top: -6px;
  left: -40px;
  row-gap: 8px;
}

.image-link{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border-radius: 8px;
  background-color: #ffffff;
  color: var(--green);
  right: 4px;
  bottom: 8px;
  font-size: 1.6em;
  opacity: .7;
}

.image-link:hover{
  opacity: 1;
}

.text-list {
  row-gap: 8px;
}

.btn-menu {
  position: absolute;
  left: -8px;
  top: -4px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--green);
  color: white;
  font-size: 2em;
}

@media screen and (max-width: 768px) {
  .card-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .image-content img {
    height: 200px;
  }

  .info-list {
    left: -6px;
    top: 50px;
  }

  .btn-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-height: 568px) {
  .image-content img {
    height: 175px;
  }

  .info-list {
    row-gap: 5px;
  }
}
</style>
