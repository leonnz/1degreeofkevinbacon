<template>
  <div class="titles">
    <!-- <div class="title">Have both appeared in the following films and television</div> -->

    <div v-if="movies.length > 0" key="film" class="is-size-4">
      <p>Shared film credits</p>
    </div>
    <div v-else key="no-film" class="is-size-4">
      <p>No shared film credits</p>
      <i class="fas fa-ban"></i>
    </div>

    <transition-group name="fade" tag="div">
      <div class="title" v-for="title in movies" :key="title.id">
        <a :href="getImdbLink(title.imdb_id)" target="_blank">
          <img
            class="image"
            :title="title.title + ' - Link to IMDB'"
            :src="getTitlePoster(title.poster_path)"
            @error="imgError"
          />
        </a>
      </div>
    </transition-group>
    <div v-if="tv.length > 0" key="tv" class="is-size-4">
      <p>Shared television credits</p>
    </div>
    <div v-else key="no-tv" class="is-size-4">
      <p>No shared television credits</p>
      <i class="fas fa-ban"></i>
    </div>
    <transition-group name="fade" tag="div">
      <div class="title" v-for="title in tv" :key="title.id">
        <a :href="getImdbLink(title.imdb_id)" target="_blank">
          <img
            class="image"
            :title="title.name + ' - Link to IMDB'"
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
              if (this.filterFilmGenres(response.genres) != true) {
                this.movies.push(response);
              }
            });
          }
          if (title.type === "tv") {
            tmdb.tvSearch(title.id).then(response => {
              tmdb.tvExtIdSearch(response.id).then(tvRes => {
                response.imdb_id = tvRes.imdb_id;

                // filter out talk show, reality, news tv shows, and other weird shows
                if (
                  response.type != "Talk Show" &&
                  response.type != "Reality" &&
                  this.filterOtherTvGenres(response.genres) != true &&
                  this.filterOtherTvShows(response.name) != true
                ) {
                  this.tv.push(response);
                  console.log(response);
                }
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
    },
    filterOtherTvGenres: genres => {
      let otherShowTypes = false;
      genres.forEach(genre => {
        if (
          genre.name == "Talk" ||
          genre.name == "News" ||
          genre.name == "Reality" ||
          genre.name == "Documentary"
        ) {
          otherShowTypes = true;
        }
      });
      return otherShowTypes;
    },
    filterOtherTvShows: name => {
      let otherTvShows = false;
      if (name == "Live from Studio Five") {
        otherTvShows = true;
      }
      return otherTvShows;
    },

    filterFilmGenres: genres => {
      let otherShowTypes = false;
      genres.forEach(genre => {
        if (genre.name == "Documentary") {
          otherShowTypes = true;
        }
      });
      return otherShowTypes;
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
