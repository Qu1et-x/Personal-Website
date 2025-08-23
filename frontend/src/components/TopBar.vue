<template>
  <header class="topbar">
    <h1 class="title" @click="$router.push('/')">My Blog</h1>
    <div class="right">
      <button class="theme-btn" @click="theme.toggleTheme()">切换主题</button>
      <div v-if="auth.user" class="user">
        <img :src="auth.user.avatarUrl" alt="" />
        <span>{{ auth.user.username }}</span>
        <button @click="auth.logout()">退出</button>
      </div>
      <button v-else @click="auth.loginWithGitHub()">GitHub 登录</button>
    </div>
  </header>
</template>

<script setup>
import { useThemeStore } from '@/store/theme'
import { useAuthStore } from '@/store/auth'
const theme = useThemeStore()
const auth = useAuthStore()
auth.fetchMe()
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.title {
  cursor: pointer;
  margin: 0;
  font-size: 18px;
}
.right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.theme-btn {
  border: 1px solid var(--border);
  background: transparent;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.user {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>