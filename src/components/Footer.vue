<template>
  <footer class="footer foot">
    <div class="content has-text-centered">
      <p>
        &copy;
        <a
          title="Leon Lau LinkedIn link"
          target="blank"
          href="https://www.linkedin.com/in/leonlaunz/"
        >
          Leon Lau
        </a>
      </p>
    </div>
    <div className="content has-text-centered">
      <p>
        Did you find this tool useful/fun/feeling nice?

        <a
          target="blank"
          title="Paypal link"
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=UHK5G657T7SJY&currency_code=USD&source=url"
        >
          Buy me a coffee </a
        >:)
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
  color: #888;
  background: #eee;
  // background: var(--mainColor);
  a {
    color: var(--mainColor);
  }
}
</style>
