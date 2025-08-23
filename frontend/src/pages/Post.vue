<template>
  <article>
    <h2>{{ title }}</h2>
    <p class="meta">发布日期：{{ date }}</p>
    <div class="content">
      <p>这里是示例文章 <strong>{{ slug }}</strong> 的正文内容占位。</p>
    </div>

    <section class="comments">
      <h3>评论</h3>
      <div v-if="!auth.user" class="login-tip">
        <p>登录后即可发表评论。</p>
        <button @click="auth.loginWithGitHub()">使用 GitHub 登录</button>
      </div>

      <form v-else class="comment-form" @submit.prevent="submitComment">
        <textarea v-model="content" placeholder="写下你的评论..." rows="4"></textarea>
        <button :disabled="sending || !trimmed" type="submit">
          {{ sending ? '发送中...' : '发表评论' }}
        </button>
      </form>

      <ul class="comment-list">
        <li v-for="c in comments" :key="c.id">
          <img :src="c.avatarUrl" alt="" />
          <div class="body">
            <div class="head">
              <strong>{{ c.username }}</strong>
              <small>{{ new Date(c.createdAt).toLocaleString() }}</small>
            </div>
            <p>{{ c.content }}</p>
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
const route = useRoute()
const slug = route.params.slug
const auth = useAuthStore()

const title = slug === 'hello-vue-blog' ? '用 Vue 打造你的个人博客' : '优雅适配系统暗色模式'
const date = slug === 'hello-vue-blog' ? '2025-08-01' : '2025-08-10'

const comments = ref([])
const content = ref('')
const sending = ref(false)
const trimmed = computed(() => content.value.trim().length > 0)

async function loadComments() {
  const res = await fetch(`/api/comments?postId=${encodeURIComponent(slug)}`, { credentials: 'include' })
  if (res.ok) {
    const data = await res.json()
    comments.value = data.comments || []
  }
}

async function submitComment() {
  if (!trimmed.value) return
  sending.value = true
  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ postId: slug, content: content.value.trim() })
    })
    if (res.ok) {
      content.value = ''
      await loadComments()
    } else {
      alert('发表评论失败')
    }
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  loadComments()
  auth.fetchMe()
})
</script>

<style scoped>
.meta { opacity: .7; }
.comments { margin-top: 32px; }
.login-tip {
  border: 1px dashed var(--border);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.comment-form {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}
.comment-form textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  background: var(--input-bg);
  color: var(--text);
}
.comment-form button {
  justify-self: end;
  border: 1px solid var(--border);
  background: transparent;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.comment-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}
.comment-list li {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px;
}
.comment-list img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.head {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
</style>