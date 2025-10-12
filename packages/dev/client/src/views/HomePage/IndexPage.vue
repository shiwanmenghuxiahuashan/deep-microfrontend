<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import SubNav from '@/components/SubNav.vue';

const router = useRouter();

const homeRoute = router.getRoutes().find((route) => route.name === 'home');
// 获取首页的子路由
const homeChildren = computed(() => {
  return homeRoute?.children || [];
});

// 获取所有顶级路由
const topLevelRoutes = computed(() => {
  return router
    .getRoutes()
    .filter((route) => route.meta?.topNav === true)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0));
});
</script>

<template>
  <div class="client-page home-page">
    <!-- 展示子路由导航 -->
    <div class="home-page-slide-nav">
      <SubNav
        :base-path="homeRoute.path"
        :routes="homeChildren"
        type="vertical"
        custom-class="demo-nav" />
    </div>
    <div class="home-page-body">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;

  &-slide-nav {
    justify-self: start;
    width: 220px;
    height: inherit;
    background-color: var(--white-color);
    padding: var(--common-padding, 20px);
  }
  &-body {
    justify-self: end;
    flex: 1;
    height: inherit;
    padding: var(--common-padding, 20px);
    overflow: auto;
  }
}
</style>
