<template><header class='topbar'><h1 class='title' @click="$router.push('/')">My Blog</h1><div class='right'><ThemeToggle/></div></header></template>
<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
<style scoped>.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border);background:var(--topbar-bg)}.title{margin:0;font-size:18px;color:var(--text);cursor:pointer}.right{display:flex;align-items:center;gap:8px}</style>
