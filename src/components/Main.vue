<template>
  <div class="container">
    <div class="columns is-half-tablet inputs">
      <div class="column column-override">
        <Search
          placeHolderName="Kevin Bacon"
          @confirmPerson="confirmPerson1"
          @clearPerson="clearPerson1"
          :otherPerson="person2"
        />
      </div>
      <div class="column column-override">
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
          class="link"
          href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon"
          target="blank"
          >Six Degrees of Kevin Bacon</a
        >
        where any two people on Earth are six or fewer acquaintance links apart,
        this website reveals which film and television celebrities (including
        directors and producers) have a
        <i>1&#176;</i> degree of seperation through a shared movie or television
        credit. <br />Talk shows, news, reality shows and documentaries are not
        included.
      </p>
      <!-- <p>
        by
        <a
          title="Leon Lau LinkedIn link"
          target="blank"
          href="https://www.linkedin.com/in/leonlaunz/"
        >
          Leon Lau
        </a>
      </p>
      <br />
      <p>
        Did you find this site useful/fun/feeling nice?

        <a
          class="link"
          target="blank"
          title="Paypal link"
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=UHK5G657T7SJY&currency_code=USD&source=url"
        >
          Buy me a coffee </a
        >, thank you for your support.
      </p> -->
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
    Results,
  },
  data() {
    return {
      person1: null,
      person2: null,
    };
  },

  methods: {
    test: function () {
      console.log(this.person1Confirmed, this.person2Confirmed);
    },
    confirmPerson1: function (person) {
      this.person1 = person;
    },
    confirmPerson2: function (person) {
      this.person2 = person;
    },
    clearPerson1: function () {
      this.person1 = null;
    },
    clearPerson2: function () {
      this.person2 = null;
    },
  },
  mounted() {},
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

.link {
  color: var(--mainColor);
}

.about {
  text-align: center;
  width: 800px;
  margin: 0 auto;
}

.column-override {
  padding: 0 0.75rem 0.75rem 0.75rem;
}
</style>
