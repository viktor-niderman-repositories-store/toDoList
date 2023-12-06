<script setup lang="ts">

import {RouterLink} from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="nav-item">Home</RouterLink>
      <RouterLink to="/about"  class="nav-item">About</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
  header {
    background-color: #2a2929;
    padding: 10px;
  }
  nav {
    display: flex;
    justify-content: flex-end;
  }
  .nav-item {
    padding: 0 2rem;
    color: white;
    text-decoration: none;
  }
</style>
