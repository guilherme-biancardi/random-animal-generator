<template>
  <button @click="emit('click')">
    <MaterialIcon :icon="icon"></MaterialIcon>
  </button>
</template>

<script setup>
import MaterialIcon from "./MaterialIcon.vue";

const emit = defineEmits(['click'])

defineProps({
  icon: String
})
</script>

<style scoped>
button {
  background-color: #ffffff;
  color: var(--green);
  box-shadow: var(--shadow);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 2.5em;
}
</style>