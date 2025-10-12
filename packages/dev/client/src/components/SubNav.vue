<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// 定义组件props
const props = defineProps({
  basePath: {
    type: String,
    default: ''
  },
  // 要渲染的路由列表
  routes: {
    type: Array,
    required: true,
    default: () => []
  },
  // 导航类型：'horizontal' | 'vertical'
  type: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  // 是否显示子路由
  showChildren: {
    type: Boolean,
    default: false
  },
  // 自定义样式类名
  customClass: {
    type: String,
    default: ''
  }
});

const router = useRouter();
const route = useRoute();

// 计算当前激活的路由
const isActiveRoute = (routePath) => {
  return route.path === routePath || route.path.startsWith(routePath + '/');
};

// 处理路由点击
const handleRouteClick = (routePath) => {
  router.push([props.basePath, routePath].join('/'));
};

// 计算导航样式类
const navClass = computed(() => {
  const baseClass = 'sub-nav';
  const typeClass = `sub-nav--${props.type}`;
  const customClass = props.customClass ? ` ${props.customClass}` : '';
  return `${baseClass} ${typeClass}${customClass}`;
});
</script>

<template>
  <nav :class="navClass">
    <template
      v-for="routeItem in routes"
      :key="routeItem.path">
      <!-- 主路由项 -->
      <div class="sub-nav__item">
        <div
          class="sub-nav__link"
          :class="{ 'sub-nav__link--active': isActiveRoute(routeItem.path) }"
          @click="handleRouteClick(routeItem.path)">
          {{ routeItem.meta?.label || routeItem.name }}
        </div>

        <!-- 子路由列表 -->
        <template
          v-if="
            showChildren && routeItem.children && routeItem.children.length > 0
          ">
          <div class="sub-nav__children">
            <router-link
              v-for="child in routeItem.children"
              :key="child.path"
              :to="`${routeItem.path}/${child.path}`"
              class="sub-nav__child-link"
              :class="{
                'sub-nav__child-link--active': isActiveRoute(
                  `${routeItem.path}/${child.path}`
                )
              }">
              {{ child.meta?.label || child.name }}
            </router-link>
          </div>
        </template>
      </div>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.sub-nav {
  display: flex;
  gap: var(--nav-gap, 20px);

  &--horizontal {
    flex-direction: row;
    align-items: center;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &__item {
    position: relative;
    width: 100%;
  }

  &__link {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
    color: var(--text-color, #333);
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: var(--primary-color, #009688);
      background-color: rgba(0, 150, 136, 0.1);
    }

    &--active {
      color: var(--primary-color, #009688);
      background-color: rgba(0, 150, 136, 0.15);
      font-weight: 600;
    }
  }

  &__children {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: var(--white-color, #fff);
    border: 1px solid var(--shadow-color, #f0f1f2);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;

    .sub-nav--horizontal & {
      display: none;
    }

    .sub-nav--horizontal .sub-nav__item:hover & {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .sub-nav--vertical & {
      position: static;
      margin-top: 8px;
      margin-left: 16px;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      border: none;
      background-color: transparent;
    }
  }

  &__child-link {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
    color: var(--text-color, #333);
    font-size: 14px;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
      color: var(--primary-color, #009688);
      background-color: rgba(0, 150, 136, 0.1);
    }

    &--active {
      color: var(--primary-color, #009688);
      background-color: rgba(0, 150, 136, 0.15);
      font-weight: 600;
    }

    .sub-nav--vertical & {
      padding: 6px 12px;
      font-size: 13px;
    }
  }
}
</style>
