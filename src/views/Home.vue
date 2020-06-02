<template>
  <div class="home">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default {
  name: "home",
  components: { Header, Main, Footer }
};
</script>

<style>
.home {
  min-height: 100vh;
  position: relative;
}
</style>
