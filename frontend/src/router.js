import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Post from './pages/Post.vue'
import About from './pages/About.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/post/:slug', name: 'post', component: Post, props: true },
  { path: '/about', name: 'about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router