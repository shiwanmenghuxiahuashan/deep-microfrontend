<script setup>
import { ref } from 'vue';
const nameAttr = ref('micro-frontend');
let customDom = null;
const changeAttributesHandler = () => {
  nameAttr.value = 'micro-frontend-' + Number.parseInt(Math.random() * 100);
  if (!customDom) {
    customDom = document.querySelector('micro-frontend');
  }
  customDom.setAttribute('name', nameAttr.value);
};
</script>

<template>
  <div class="common-dev-container">
    <section>
      <h1>Custom element（自定义元素）</h1>
      <p>
        <a
          href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components"
          target="_blank"
          rel="noopener noreferrer">
          MDN文档
        </a>
      </p>
    </section>
    <div>
      <button @click="changeAttributesHandler">change name Attributes</button>
      <micro-frontend
        name="dev1"
        url="http://localhost:3000"
        >
        111
        </micro-frontend
      >
    </div>
  </div>
</template>
