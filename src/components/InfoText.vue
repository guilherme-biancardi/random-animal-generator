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

@media screen and (max-height: 568px) {
  h2 {
    font-size: 1.12em;
  }

  p {
    font-size: 0.92em;
  }
}
</style>
