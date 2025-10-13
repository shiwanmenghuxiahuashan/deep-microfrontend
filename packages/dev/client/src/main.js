import { createApp } from 'vue';
import { microFrontend } from 'micro-frontend';
import './style.scss';
import { router } from './router';
import App from './App.vue';
microFrontend.start({
  lifeCycles: {
    created() {
      console.log('created 全局监听');
    },
    beforemount() {
      console.log('beforemount 全局监听');
    },
    mounted() {
      console.log('mounted 全局监听');
    },
    unmount() {
      console.log('unmount 全局监听');
    },
    error() {
      console.log('error 全局监听');
    }
  }
});
createApp(App).use(router).mount('#app');
