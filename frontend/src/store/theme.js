import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }),
  actions: {
    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme(this.theme)
      localStorage.setItem('theme_override', this.theme)
    },
    initTheme() {
      const saved = localStorage.getItem('theme_override')
      if (saved) {
        this.theme = saved
      } else {
        this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      this.applyTheme(this.theme)
      // Listen system theme change
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = (e) => {
        const override = localStorage.getItem('theme_override')
        if (override) return
        this.theme = e.matches ? 'dark' : 'light'
        this.applyTheme(this.theme)
      }
      // modern browsers use 'change', Safari might require addEventListener
      if (mq.addEventListener) {
        mq.addEventListener('change', listener)
      } else if (mq.addListener) {
        mq.addListener(listener)
      }
    }
  }
})