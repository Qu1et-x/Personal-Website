import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Post from './pages/Post.vue'

const Blank = (name) => ({ name, template: `<section><h2 style='margin-top:0'>${name}</h2><p style='opacity:.7'>（占位页面，可后续填充）</p></section>` })

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/dashboard', name: 'dashboard', component: Blank('Dashboard') },
  { path: '/posts', name: 'posts', component: Blank('Posts') },
  { path: '/profile', name: 'profile', component: Blank('Profile') },
  { path: '/settings', name: 'settings', component: () => import('./pages/Settings.vue') },
  { path: '/post/:slug', name: 'post', component: Post, props: true },
  { path: '/about', name: 'about', component: Blank('About') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({ history: createWebHistory(), routes })
