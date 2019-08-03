<template>
  <div class="container" style="height: auto;">
    <div v-if="!duplicateTitles" class="balls searching">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div v-if="duplicateTitles" class="tile is-ancestor personsCtn">
      <div class="tile">
        <div class="personCtn">
          <img
            :title="personsConfirmed[0].personName"
            :src="getPersonPhoto(personsConfirmed[0].personPic)"
          />
          <p class="is-size-4">{{ personsConfirmed[0].personName }}</p>
        </div>
      </div>
      <div class="centerAnd searching">
        <div>and</div>
      </div>
      <div class="tile">
        <div class="personCtn">
          <img
            :title="personsConfirmed[1].personName"
            :src="getPersonPhoto(personsConfirmed[1].personPic)"
          />
          <p class="is-size-4">{{ personsConfirmed[1].personName }}</p>
        </div>
      </div>
    </div>
    <Titles :duplicateTitles="duplicateTitles" />
  </div>
</template>

<script>
import tmdb from "../services/axios";
import Titles from "../components/Titles";

export default {
  props: ["personsConfirmed"],
  components: {
    Titles
  },
  data() {
    return {
      person1Titles: [],
      person2Titles: []
    };
  },

  computed: {
    duplicateTitles: function() {
      if (this.person1Titles.length > 0 && this.person2Titles.length > 0) {
        let allTitles = this.person1Titles.concat(this.person2Titles);
        let uniq = allTitles
          .map(title => {
            return {
              count: 1,
              id: title.id,
              type: title.type
            };
          })
          .reduce((a, b) => {
            a[b.id] = (a[b.id] || 0) + b.count;
            return a;
          }, {});
        let duplicates = Object.keys(uniq).filter(a => uniq[a] > 1);

        let filteredTitles = allTitles.filter(a =>
          duplicates.includes(a.id.toString())
        );

        let uniqueFilteredTitles = Array.from(
          new Set(filteredTitles.map(a => a.id))
        ).map(id => {
          let title = filteredTitles.find(a => a.id === id);
          return title;
        });

        return uniqueFilteredTitles;
      }
    }
  },
  methods: {
    getPersonPhoto: function(photo) {
      return `http://image.tmdb.org/t/p/w92/${photo}`;
    },
    getFilmography: function() {
      tmdb
        .personFilmSearch(this.personsConfirmed[0].personId)
        .then(response => {
          const all = response.cast.concat(response.crew);
          this.person1Titles = Array.from(new Set(all.map(a => a.id))).map(
            id => {
              let title = all.find(a => a.id === id);
              return { id: title.id, type: title.media_type };
            }
          );
        });
      tmdb
        .personFilmSearch(this.personsConfirmed[1].personId)
        .then(response => {
          const all = response.cast.concat(response.crew);
          this.person2Titles = Array.from(new Set(all.map(a => a.id))).map(
            id => {
              let title = all.find(a => a.id === id);
              return { id: title.id, type: title.media_type };
            }
          );
        });
    }
  },
  mounted() {
    if (this.personsConfirmed.length == 2) {
      this.getFilmography();
    }
  }
};
</script>

<style lang="scss" scoped>
.searching {
  margin: auto;
}
.personsCtn {
  text-align: center;
}
.personCtn {
  //   color: #ffffff;
  background: none;
  min-width: 90%;
  margin: 0 auto;

  p {
    // text-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
  }

  img {
    // border: 1px solid yellow;
    border-radius: 5px;
    // box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
  }
}
.balls {
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: var(--mainColor);
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
.centerAnd {
  color: white;
  font-size: 1.5rem;
  height: 5rem;
  width: 5rem;
  position: relative;
  background-color: var(--mainColor);
  border-radius: 50%;
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);

  div {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
</style>