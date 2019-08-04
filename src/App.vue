<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/theme.scss";
html,
body {
  background: #eee;
  color: #141414;
  min-height: 100vh;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
