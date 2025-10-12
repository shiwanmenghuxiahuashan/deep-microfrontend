<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
console.log(router.getRoutes());
// 动态获取顶级路由（排除重定向路由和子路由）
const topLevelRoutes = computed(() => {
  return router
    .getRoutes()
    .filter((route) => route.meta?.topNav === true)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
    .map((route) => ({
      name: route.meta?.label || route.name,
      path: route.path
    }));
});
</script>

<template>
  <div class="client-container">
    <div class="client-header">
      <div class="client-header-brand">基座应用（Vue3 + Vite）</div>
      <div class="client-header-nav">
        <router-link
          v-for="item in topLevelRoutes"
          :key="item.name"
          :to="item.path"
          class="nav-link">
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <div class="clien-body">
      <router-view />
    </div>
  </div>
</template>
