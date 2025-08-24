import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({ followSystem: JSON.parse(localStorage.getItem('followSystem') ?? 'true'), theme: 'light' }),
  actions: {
    applyTheme(theme){ document.documentElement.setAttribute('data-theme', theme) },
    toggleTheme(){ this.followSystem=false; localStorage.setItem('followSystem','false'); this.theme=this.theme==='dark'?'light':'dark'; this.applyTheme(this.theme); localStorage.setItem('theme_override', this.theme) },
    setFollowSystem(v){ this.followSystem=v; localStorage.setItem('followSystem', JSON.stringify(v)); if(v){ localStorage.removeItem('theme_override'); this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'; } else { this.theme = localStorage.getItem('theme_override') || this.theme } this.applyTheme(this.theme) },
    initTheme(){ const savedFollow=localStorage.getItem('followSystem'); this.followSystem=savedFollow?JSON.parse(savedFollow):true; const savedOverride=localStorage.getItem('theme_override'); if(!this.followSystem && savedOverride){ this.theme=savedOverride } else { this.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light' } this.applyTheme(this.theme); const mq=window.matchMedia('(prefers-color-scheme: dark)'); const listener=(e)=>{ if(!this.followSystem) return; this.theme=e.matches?'dark':'light'; this.applyTheme(this.theme) }; if(mq.addEventListener) mq.addEventListener('change', listener); else if(mq.addListener) mq.addListener(listener) }
  }
})
