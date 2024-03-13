<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 5px;
  height: 3px;
  border-radius: 50%;
}
::-webkit-scrollbar-thumb { 
  // border-radius: 5px;
  background-color: #ddd;
}
::-webkit-scrollbar-track { 
  // box-shadow: inset 0 0 5px #ddd;
  background: #fff;
  // border-radius: 5px;
}
</style>
