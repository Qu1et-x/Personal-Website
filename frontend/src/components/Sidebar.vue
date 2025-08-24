<template>
  <aside class="sidebar">
    <SidebarItem 
      v-for="item in items" 
      :key="item.label" 
      :icon="item.icon" 
      :label="item.label"
      :isActive="item.label === activeItem"
      @select="() => selectItem(item.label)"
    />
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'

const items = [
  { icon: 'mdi:view-dashboard-outline', label: 'Dashboard' },
  { icon: 'mdi:note-outline', label: 'Posts' },
  { icon: 'mdi:account-outline', label: 'Profile' },
  { icon: 'mdi:cog-outline', label: 'Settings' }
]

const activeItem = ref('Dashboard')

function selectItem(label) {
  activeItem.value = label
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: var(--sidebar-bg, #f9fafb);
  border-right: 1px solid #e5e7eb;
  height: 100vh;
  padding-top: 20px;
}
</style>
