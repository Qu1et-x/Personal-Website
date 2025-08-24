<template>
  <div 
    class="sidebar-item" 
    :class="{ active: isActive }" 
    @click="onClick"
  >
    <Icon :icon="icon" class="menu-icon"/>
    <span class="menu-text">{{ label }}</span>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  icon: String,
  label: String,
  isActive: Boolean
})

const emit = defineEmits(['select'])
function onClick() {
  emit('select')
}
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.menu-icon {
  font-size: 20px;
  margin-right: 8px;
  transition: transform 0.3s ease, margin-right 0.3s ease;
}
.menu-text {
  font-size: 16px;
  transition: transform 0.3s ease;
}
.sidebar-item:hover .menu-text,
.sidebar-item.active .menu-text {
  transform: scale(1.1);
}
.sidebar-item:hover .menu-icon,
.sidebar-item.active .menu-icon {
  transform: translateX(-2px);
  margin-right: 12px;
}
</style>
