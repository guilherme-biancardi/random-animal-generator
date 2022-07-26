<template>
  <li>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </li>
</template>

<script setup>
defineProps({
  title: String,
  text: String,
});
</script>

<style scoped>
h2 {
  text-transform: capitalize;
  font-size: 1.22em;
}

p {
  font-size: 1.02em;
}
</style>
