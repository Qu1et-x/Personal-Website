<template>
  <div class="layout">
    <Sidebar />
    <div class="main">
      <TopBar />
      <main class="content">
        <RouterView v-slot="{ Component }"
          ><transition name="fade-slide" mode="out-in"
            ><component :is="Component" /></transition
        ></RouterView>
      </main>
    </div>
  </div>
</template>
<script setup>
import Sidebar from "@/components/Sidebar.vue";
import TopBar from "@/components/TopBar.vue";
</script>
<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
