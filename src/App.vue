<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
  <div class="d-flex flex-direction-column main">
    <Header />
    <RouterView class="grow-1 view" />
    <Footer />
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
}
.view {
  overflow: scroll;
}
</style>
