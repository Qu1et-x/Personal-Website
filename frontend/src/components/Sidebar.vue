<template>
  <aside :class="['sidebar', { collapsed }]">
    <div class="toggle-row">
      <button
        class="collapse-btn"
        @click="toggleCollapse"
        :title="collapsed ? '展开侧栏' : '收起侧栏'"
      >
        <Icon
          :icon="
            collapsed ? 'mdi:chevron-double-right' : 'mdi:chevron-double-left'
          "
          class="chev"
        />
      </button>
    </div>
    <nav class="nav">
      <RouterLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
        @click="onNavClick(item)"
      >
        <SidebarItem
          :icon="item.icon"
          :label="item.label"
          :active="route.path === item.path"
          :collapsed="collapsed"
        />
      </RouterLink>
    </nav>
  </aside>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import SidebarItem from "./SidebarItem.vue";
const route = useRoute();
const collapsed = ref(false);
const items = [
  { path: "/", label: "Home", icon: "mdi:home-outline" },
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "mdi:view-dashboard-outline",
  },
  { path: "/posts", label: "Posts", icon: "mdi:note-outline" },
  { path: "/profile", label: "Profile", icon: "mdi:account-outline" },
  { path: "/settings", label: "Settings", icon: "mdi:cog-outline" },
];
function toggleCollapse() {
  collapsed.value = !collapsed.value;
}
function onNavClick(item) {
  if (item.path === "/") collapsed.value = true;
}
</script>
<style scoped>
.sidebar {
  width: var(--sidebar-expanded-w);
  min-width: 220px;
  max-width: 360px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, min-width 0.25s ease;
}
.sidebar.collapsed {
  width: var(--sidebar-collapsed-w);
  min-width: var(--sidebar-collapsed-w);
}
.toggle-row {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.collapse-btn {
  border: 1px solid var(--border);
  background: transparent;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
}
.chev {
  font-size: 18px;
  color: var(--icon);
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
}
.nav-item {
  text-decoration: none;
}
</style>
