<template>
  <div class="home">
    <Header />
    <InputForm />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import Footer from "@/components/Footer";

export default {
  name: "home",
  components: { Header, InputForm, Footer }
};
</script>

<style>
.home {
  min-height: 100vh;
  position: relative;
}
</style>



