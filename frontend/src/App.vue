<template>
  <MainLayout />
</template>

<script setup>
import { onMounted } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import { useThemeStore } from './store/theme'

const themeStore = useThemeStore()
onMounted(() => themeStore.initTheme())
</script>