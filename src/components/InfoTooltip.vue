<template>
  <li class="tooltip">
    <MaterialIcon :icon="icon"></MaterialIcon>
    <p>{{ text }}</p>
  </li>
</template>

<script setup>
import MaterialIcon from "./MaterialIcon.vue";
defineProps({
  icon: String,
  text: String,
});
</script>

<style scoped>
@import url("../../node_modules/@mdi/font/css/materialdesignicons.css");

.tooltip {
  width: max-content;
  display: flex;
  align-items: center;
  column-gap: 8px;
  background-color: #4fd6ad;
  color: #ffffff;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 0.95em;
  border-radius: 4px;
  box-shadow: var(--shadow);
}

.tooltip i {
  font-size: 1.4em;
}

@media screen and (max-height: 568px){
  .tooltip{
    font-size: 0.85em;
  }
}
</style>
