<template>
  <header class="topbar">
    <h1 class="title">My Blog</h1>
    <ThemeToggle />
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: var(--topbar-bg, #fff);
}
.title {
  font-size: 20px;
  font-weight: bold;
}
</style>
