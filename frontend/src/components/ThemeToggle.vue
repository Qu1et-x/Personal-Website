<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :title="isDark ? '切换到浅色' : '切换到深色'"
  >
    <Icon
      :icon="isDark ? 'mdi:weather-night' : 'mdi:white-balance-sunny'"
      :class="['icon', { rotate: animating }]"
    />
  </button>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useThemeStore } from "@/store/theme";
const theme = useThemeStore();
const isDark = computed(() => theme.theme === "dark");
const animating = ref(false);
onMounted(() => {
  theme.initTheme();
});
function toggleTheme() {
  animating.value = true;
  theme.toggleTheme();
  setTimeout(() => (animating.value = false), 450);
}
</script>
<style scoped>
.theme-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  line-height: 0;
}
.icon {
  font-size: 22px;
  color: var(--icon);
  transition: transform 0.45s ease, color 0.25s ease;
}
.icon.rotate {
  transform: rotate(360deg) scale(1.15);
}
:deep(.mdi-white-balance-sunny) {
  color: #facc15;
}
:deep(.mdi-weather-night) {
  color: #60a5fa;
}
</style>
