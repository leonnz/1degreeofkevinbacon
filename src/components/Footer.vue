<template>
  <footer class="footer foot">
    <div class="content has-text-centered">
      <p>
        <a href="mailto:leondotlau@gmail.com">by Leon Lau</a>
      </p>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
$footer-padding: 1rem 1rem !default;
.foot {
  padding: $footer-padding;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
  background: var(--mainColor);
  a {
    color: red;
  }
}
</style>
