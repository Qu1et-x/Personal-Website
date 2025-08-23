import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),
  actions: {
    async fetchMe() {
      try {
        this.loading = true
        const res = await fetch('/api/me', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          this.user = data.user || null
        } else {
          this.user = null
        }
      } finally {
        this.loading = false
      }
    },
    loginWithGitHub() {
      window.location.href = '/auth/github'
    },
    async logout() {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
      this.user = null
    }
  }
})