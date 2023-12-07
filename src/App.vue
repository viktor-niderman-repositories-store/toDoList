<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
  <div class="flex flex-col h-vh100">
    <Header />
    <RouterView class="overflow-x-scroll flex-grow" />
    <Footer />
  </div>
</template>

<style scoped>
.h-vh100 {
  height: 100vh;
}
</style>
