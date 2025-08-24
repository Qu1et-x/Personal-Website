<template><article class='post'><h1>{{ title }}</h1><p class='muted'>发布日期：{{ date }}</p><p>这是示例文章内容。你可以把这里替换为 Markdown 渲染的正文。</p></article></template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route=useRoute()
const map={ 'hello-vue-blog':{title:'用 Vue 打造你的个人博客',date:'2025-08-01'}, 'dark-mode':{title:'优雅适配系统暗色模式',date:'2025-08-10'} }
const title=computed(()=> (map[route.params.slug]?.title ?? '未命名文章'))
const date=computed(()=> (map[route.params.slug]?.date ?? '—'))
</script>
<style scoped>.post{max-width:760px}.muted{color:var(--muted)}</style>
