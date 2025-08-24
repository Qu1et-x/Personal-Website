<template><section><h2>Settings</h2><div class='row'><label class='lbl'><input type='checkbox' v-model='follow' @change='onToggle'/>跟随系统自动切换主题</label><small class='hint'>开启后，主题将随系统深浅色变化；手动点击太阳/月亮会自动关闭此选项。</small></div></section></template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useThemeStore } from '@/store/theme'
const theme=useThemeStore(); const follow=ref(theme.followSystem)
watchEffect(()=>{ follow.value=theme.followSystem })
function onToggle(){ theme.setFollowSystem(follow.value) }
</script>
<style scoped>.row{display:flex;flex-direction:column;gap:6px}.lbl{display:flex;align-items:center;gap:8px}.hint{color:var(--muted)}</style>
