<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/theme.scss";
html,
body {
  height: 100%;
  // background: #211f47;
  background: #eee;
  color: #141414;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
