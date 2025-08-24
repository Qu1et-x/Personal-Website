<template><section class='home'><div class='hero'><img class='avatar' :src='avatar' alt='avatar'/></div><h2>最新文章</h2><ul class='list'><li v-for='post in posts' :key='post.slug'><RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink><small>{{ post.date }}</small></li></ul></section></template>
<script setup>
const avatar='https://avatars.githubusercontent.com/u/583231?v=4'
const posts=[{slug:'hello-vue-blog',title:'用 Vue 打造你的个人博客',date:'2025-08-01'},{slug:'dark-mode',title:'优雅适配系统暗色模式',date:'2025-08-10'}]
</script>
<style scoped>.hero{display:flex;justify-content:center;align-items:center;margin:10vh 0 6vh}.avatar{width:140px;height:140px;border-radius:50%;border:4px solid var(--border);box-shadow:0 8px 24px rgba(0,0,0,.08)}.list{display:grid;gap:12px;padding:0;list-style:none}li{display:flex;justify-content:space-between;align-items:center;border:1px solid var(--border);padding:12px;border-radius:10px}a{color:var(--text);text-decoration:none}small{opacity:.7}</style>
