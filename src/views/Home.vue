<template>
  <div class="home">
    <Header />
    <InputForm />
  </div>
</template>

<script>
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";

export default {
  name: "home",
  components: { Header, InputForm }
};
</script>

<style lang="scss" scoped>
</style>

