<template>
  <div class="titles">
    <!-- <div class="title">Have both appeared in the following films and television</div> -->
    <transition-group name="fade" tag="div">
      <div v-if="movies.length > 0" key="film" class="is-size-4">Shared film credits</div>
      <div class="title" v-for="title in movies" :key="title.id">
        <a :href="getImdbLink(title.imdb_id)" target="_blank">
          <img
            class="image"
            :title="title.title"
            :src="getTitlePoster(title.poster_path)"
            @error="imgError"
          />
        </a>
      </div>
      <div v-if="tv.length > 0" key="tv" class="is-size-4">Shared television credits</div>
      <div class="title" v-for="title in tv" :key="title.id">
        <a :href="getImdbLink(title.imdb_id)" target="_blank">
          <img
            class="image"
            :title="title.name"
            :src="getTitlePoster(title.poster_path)"
            @error="imgError"
          />
        </a>
      </div>
    </transition-group>
  </div>
</template>

<script>
import tmdb from "../services/axios";
export default {
  props: {
    duplicateTitles: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      movies: [],
      tv: []
    };
  },
  watch: {
    duplicateTitles: function() {
      if (this.duplicateTitles)
        this.duplicateTitles.forEach(title => {
          if (title.type === "movie") {
            tmdb.movieSearch(title.id).then(response => {
              this.movies.push(response);
            });
          }
          if (title.type === "tv") {
            tmdb.tvSearch(title.id).then(response => {
              tmdb.tvExtIdSearch(response.id).then(tvRes => {
                response.imdb_id = tvRes.imdb_id;
                this.tv.push(response);
              });
            });
          }
        });
    }
  },
  methods: {
    getTitlePoster: function(poster) {
      return `http://image.tmdb.org/t/p/w92/${poster}`;
    },
    getImdbLink(imdbId) {
      if (imdbId) return `https://www.imdb.com/title/${imdbId}`;
    },
    imgError: function(img) {
      img.target.src = require("../assets/images/default_title_92w.png");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.filmIcon {
  display: inline-block;
  top: 60%;
  -ms-transform: translateY(-60%);
  transform: translateY(-60%);
}
.titles {
  padding-bottom: 5rem;
}
.title {
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
  display: inline-block;
  margin: 0 10px !important;
}
.title img {
  border-radius: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   transform: translateX(10px);
  opacity: 0;
}
</style>


