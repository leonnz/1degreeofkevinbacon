<template>
  <footer class="footer foot">
    <div class="content has-text-centered">
      <p>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
        <br />
        <a title="Link to TMDB website" href="https://www.themoviedb.org/">
          <img
            width="200"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
          />
        </a>
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
