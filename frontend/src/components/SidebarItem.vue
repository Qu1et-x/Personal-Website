<template><div class='sidebar-item' :class='{active}'> <Icon :icon='icon' class='menu-icon'/><span class='menu-text' v-if='!collapsed'>{{ label }}</span></div></template>
<script setup>
import { Icon } from '@iconify/vue'
defineProps({ icon:String, label:String, active:Boolean, collapsed:Boolean })
</script>
<style scoped>.sidebar-item{display:flex;align-items:center;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background .2s ease,transform .2s ease,gap .2s ease;gap:10px;color:var(--text)}.sidebar-item:hover{background:rgba(127,127,127,.08);transform:translateX(2px)}.sidebar-item.active{background:rgba(127,127,127,.14)}.menu-icon{font-size:20px;color:var(--icon);transition:transform .2s ease,margin-right .2s ease}.menu-text{transition:transform .2s ease}.sidebar-item:hover .menu-text,.sidebar-item.active .menu-text{transform:scale(1.08)}.sidebar-item:hover .menu-icon,.sidebar-item.active .menu-icon{transform:translateX(-2px)}</style>
