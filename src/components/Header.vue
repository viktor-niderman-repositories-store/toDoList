<script setup lang="ts">

import {RouterLink} from "vue-router";
</script>

<template>
  <header class="bg-neutral-700 p-2">
    <nav class="flex justify-end">
      <RouterLink to="/" class="nav-item text-white decoration-0">Home</RouterLink>
      <RouterLink to="/about"  class="nav-item text-white decoration-0">About</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
  .nav-item {
    padding: 0 2rem;
  }
  .nav-item:hover {
    text-decoration: underline;
  }
</style>
