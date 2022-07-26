<template>
  <section class="card-content flex-column">
    <div class="image-content">
      <ul class="info-list flex-column">
        <InfoTooltip
          v-for="(info, index) in animalData.informationTooltip"
          :key="index"
          :icon="info.icon"
          :text="info.text"
        ></InfoTooltip>
      </ul>
      <img :src="animalData.image" @load="isLoadImage" alt="animal image"/>
    </div>
    <ul class="text-list flex-column">
      <InfoText
        v-for="(info, index) in animalData.informationText"
        :key="index"
        :title="info.title"
        :text="info.text"
      ></InfoText>
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue";
import InfoTooltip from "./InfoTooltip.vue";
import InfoText from "./InfoText.vue";

const props = defineProps({
  animal: Object,
});

const emit = defineEmits(['loadImage'])

const isLoadImage = () => emit('loadImage', true);

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

.text-list {
  row-gap: 8px;
}
</style>
