import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/HomePage.vue'),
      meta: {
        label: '首页',
        topNav: true,
        order: 1
      },
      children: [
        {
          path: 'custom-element',
          name: 'custom-element',
          meta: {
            label: '自定义元素'
          },
          component: () => import('./views/CustomElementPage.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        label: '关于我们',
        topNav: true,
        order: 2
      },
      component: () => import('./views/AboutPage.vue')
    }
  ]
});
export { router };
