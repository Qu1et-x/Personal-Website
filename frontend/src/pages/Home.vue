<template>
  <section>
    <h2>最新文章</h2>
    <ul class="list">
      <li v-for="post in posts" :key="post.slug">
        <RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink>
        <small>{{ post.date }}</small>
      </li>
    </ul>
  </section>
</template>

<script setup>
const posts = [
  { slug: 'hello-vue-blog', title: '用 Vue 打造你的个人博客', date: '2025-08-01' },
  { slug: 'dark-mode', title: '优雅适配系统暗色模式', date: '2025-08-10' }
]
</script>

<style scoped>
.list {
  display: grid;
  gap: 12px;
  padding: 0;
  list-style: none;
}
li {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--border);
  padding: 12px;
  border-radius: 8px;
}
a {
  color: var(--text);
  text-decoration: none;
}
small { opacity: .7; }
</style>