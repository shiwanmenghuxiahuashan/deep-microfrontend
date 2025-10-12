<script setup>
const list = [
  { name: '首页', path: '/home' },
  { name: 'Vite 子应用', path: '/learn-vite' },
  { name: '关于我们', path: '/about' },
]
const msgHandler = () => {
  alert('未实现')
}
</script>

<template>
  <div class="client-container">
    <div class="client-header">
      <div class="client-header-brand">基座应用（Vue3 + Vite）</div>
      <div class="client-header-nav">
        <router-link v-for="item in list" :key="item.name" :to="item.path" class="nav-link">{{ item.name }}</router-link>
        <button @click="msgHandler">通信测试</button>
      </div>
    </div>
    <div class="clien-body">
      <router-view />
    </div>
  </div>
</template>
