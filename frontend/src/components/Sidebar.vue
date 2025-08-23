<template>
  <aside :class="['sidebar', { collapsed }]">
    <button class="toggle-btn" @click="collapsed = !collapsed" aria-label="切换侧边栏">
      <span v-if="collapsed">»</span>
      <span v-else>«</span>
    </button>
    <nav v-if="!collapsed" class="nav">
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/about">关于</RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
const collapsed = ref(false)
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  transition: width .25s ease;
  display: flex;
  flex-direction: column;
  padding: 12px;
}
.sidebar.collapsed {
  width: 56px;
}
.toggle-btn {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  align-self: flex-end;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}
a {
  text-decoration: none;
  color: var(--text);
}
a.router-link-active {
  font-weight: 600;
}
</style>