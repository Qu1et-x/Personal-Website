<template>
  <button class="theme-toggle" @click="toggleTheme">
    <Icon 
      :icon="isDark ? 'mdi:weather-night' : 'mdi:white-balance-sunny'"
      :class="['icon', { 'rotate': animating }]"
    />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useThemeStore } from '../store/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.theme === 'dark')

const animating = ref(false)

function toggleTheme() {
  animating.value = true
  themeStore.toggleTheme()
  setTimeout(() => animating.value = false, 500)
}
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.icon {
  font-size: 24px;
  transition: transform 0.5s ease, color 0.5s ease;
}
.icon.rotate {
  transform: rotate(360deg) scale(1.2);
}
:deep(.mdi-white-balance-sunny) {
  color: #facc15; /* 黄色太阳 */
}
:deep(.mdi-weather-night) {
  color: #60a5fa; /* 蓝色月亮 */
}
</style>
