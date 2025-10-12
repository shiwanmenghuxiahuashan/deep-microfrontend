<script setup>
import { defineMicroFrontendCustomElement } from 'micro-frontend';

defineMicroFrontendCustomElement('micro-frontend');
</script>

<template>
  <div class="common-dev-container">
    <section>
      <h1>Custom element（自定义元素）</h1>
      <p>
        <a
          href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components"
          target="_blank"
          rel="noopener noreferrer"
          >MDN文档
        </a>
      </p>
    </section>
    <div>
      <micro-frontend
        name="micro-frontend"
        url="http://localhost:3000"></micro-frontend>
    </div>
  </div>
</template>
