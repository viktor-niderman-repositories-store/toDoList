<script setup lang="ts">
import IconGitHub from "@/components/icons/IconGitHub.vue";
</script>

<template>
  <footer>
    <div></div>
    <div>© Viktor Niderman</div>
    <div>
      <a href="https://github.com/viktor-niderman" target="_blank">
        <IconGitHub class="fill-white icon"/>
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  color: white;
  background-color: #2a2929;
  padding: .2rem 1rem;
  display: flex;
  justify-content: space-between;
}
.icon {
  max-height: 24px;
}
</style>
