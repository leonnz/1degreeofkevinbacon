<template>
  <div class="titles">
    <div>
      <!-- <i class="fas fa-film fa-7x"></i>
      <i class="far fa-tv-retro fa-7x"></i>

      <i class="material-icons">tv</i>-->
    </div>
    <transition-group name="fade" tag="div">
      <div class="title" v-for="title in movies" :key="title.id">
        <a :href="getImdbLink(title.imdb_id)" target="_blank">
          <img :title="title.title" :src="getTitlePoster(title.poster_path)" />
        </a>
      </div>
      <div class="title" v-for="title in tv" :key="title.id">
        <a :href="getImdbLink(title.imdb_id)" target="_blank">
          <img :title="title.name" :src="getTitlePoster(title.poster_path)" />
        </a>
      </div>
    </transition-group>
  </div>
</template>

<script>
import tmdb from "../services/axios";
export default {
  props: ["duplicateTitles"],
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
      return `http://image.tmdb.org/t/p/w154/${poster}`;
    },
    getImdbLink(imdbId) {
      if (imdbId) return `https://www.imdb.com/title/${imdbId}`;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.titles {
  flex-wrap: wrap;
  justify-content: center;
  color: #ffffff;
}

.title {
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
  display: inline-block;
  margin: 0 10px;
}
div.title + div.title {
  //   margin-left: 20px;
}
.title img {
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


