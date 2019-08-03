<template>
  <div>
    <div class="field name-field">
      <input
        v-model="personName"
        class="input is-medium"
        type="text"
        :placeholder="placeHolderName"
        @keyup="searchPerson(personName)"
        spellcheck="false"
      />
    </div>
    <transition name="fade" tag="div">
      <div v-if="personResults.length !== 0" class="field results">
        <article
          @click="setPerson(result)"
          v-for="(result, index) in filteredResults"
          :key="index"
          class="media"
        >
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="getPersonPhoto(result.profile_path)" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ result.name }}</strong>
                <br />
                {{ result.known_for.map(title => {
                return title.original_name ? title.original_name : title.title
                }).join(", ") }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </transition>
  </div>
</template>

<script>
import tmdb from "../services/axios";
export default {
  props: ["otherPerson", "placeHolderName"],
  data() {
    return {
      personName: "",
      personResults: []
    };
  },
  computed: {
    // Filter results so you can't select the same person you have already selected.
    filteredResults: function() {
      if (this.otherPerson) {
        return this.personResults.filter(
          result => result.id !== this.otherPerson.personId
        );
      }
      return this.personResults;
    }
  },
  methods: {
    getPersonPhoto: function(photo) {
      return `http://image.tmdb.org/t/p/w92/${photo}`;
    },
    searchPerson: function(person) {
      this.$emit("clearPerson");
      if (person.length > 2) {
        tmdb.personSearch(person).then(response => {
          this.personResults = response.results
            .filter(result => result.popularity >= 1)
            .slice(0, 5);
        });
      }
    },
    setPerson(person) {
      this.personResults.length = 0;
      this.personName = person.name;
      this.$emit("confirmPerson", {
        personName: person.name,
        personId: person.id,
        personPic: person.profile_path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.name-field {
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
}
.results {
  width: 100%;
  color: #1f1f1f;
  padding: 0.5rem;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);

  p {
    height: 100%;
    color: #1f1f1f;
  }
  img {
    border-radius: 5px;
  }
}
.fade-enter-active {
  transition: opacity 0.5s linear;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

