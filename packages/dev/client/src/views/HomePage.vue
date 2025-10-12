<script setup>
const intro = '欢迎测试基座首页'
</script>

<template>
  <div class="home-hero">
    <h1>基座首页</h1>
    <p>{{ intro }}</p>
  </div>
</template>

<style>
.home-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 24px;
  color: #333;
}
</style>
