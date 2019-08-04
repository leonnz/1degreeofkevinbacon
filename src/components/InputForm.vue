<template>
  <div class="container">
    <div class="columns is-half-tablet main">
      <div class="column">
        <Search
          placeHolderName="e.g Leon Lau"
          @confirmPerson="confirmPerson1"
          @clearPerson="clearPerson1"
          :otherPerson="person2"
        />
      </div>
      <div class="column">
        <Search
          placeHolderName="e.g Kevin Bacon"
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
  </div>
</template>

<script>
import tmdb from "../services/axios";
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
.main {
  // margin: auto !important;
}
</style>
