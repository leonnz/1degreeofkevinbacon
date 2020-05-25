<template>
  <div class="container">
    <div class="columns is-half-tablet inputs">
      <div class="column">
        <Search
          placeHolderName="Kevin Bacon"
          @confirmPerson="confirmPerson1"
          @clearPerson="clearPerson1"
          :otherPerson="person2"
        />
      </div>
      <div class="column">
        <Search
          placeHolderName="Tom Cruise"
          @confirmPerson="confirmPerson2"
          @clearPerson="clearPerson2"
          :otherPerson="person1"
        />
      </div>
    </div>
    <div v-if="person1 && person2" class="columns is-half-tablet main">
      <div class="column">
        <Results :personsConfirmed="[person1, person2]" />
      </div>
    </div>
    <div class="column about" v-if="!person1 || !person2">
      <p>
        Based on the concept of
        <a
          class="wiki-link"
          href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon"
          target="blank"
          >Six Degrees of Kevin Bacon</a
        >
        where any two people on Earth are six or fewer acquaintance links apart,
        this website reveals which film and television celebrities (including
        directors and producers) have a
        <i>1&#176;</i> degree of seperation through a shared movie or television
        credit. Talk shows, news, reality shows and documentaries are not
        included.
      </p>
    </div>
  </div>
</template>

<script>
// import tmdb from "../services/axios";
import Search from "./Search";
import Results from "./Results";

export default {
  components: {
    Search,
    Results
  },
  data() {
    return {
      person1: null,
      person2: null
    };
  },

  methods: {
    test: function() {
      console.log(this.person1Confirmed, this.person2Confirmed);
    },
    confirmPerson1: function(person) {
      this.person1 = person;
      console.log(this.person1);
    },
    confirmPerson2: function(person) {
      this.person2 = person;
      console.log(this.person2);
    },
    clearPerson1: function() {
      this.person1 = null;
    },
    clearPerson2: function() {
      this.person2 = null;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 769px) and (max-width: 1250px), print {
  .is-half-tablet {
    flex: none;
    width: 90% !important;
  }
}
.inputs {
  width: 60%;
  margin: auto;
}
.main {
  width: 60%;
  z-index: 0;
  margin: auto;
}

.wiki-link {
  color: var(--mainColor);
}

.about {
  text-align: center;
  width: 800px;
  margin: 0 auto;
}
</style>
