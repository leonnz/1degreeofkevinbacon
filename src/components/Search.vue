<template>
  <div>
    <div class="field name-field">
      <p class="control has-icons-right">
        <input
          v-model="personName"
          class="input is-medium is-danger"
          type="text"
          aria-label="Enter the name of an individual that has worked in films or television."
          :placeholder="placeHolderName"
          @keyup="searchPerson(personName)"
          @keyup.down="resultsDownButton(0)"
          spellcheck="false"
          ref="input"
        />
        <span v-show="personName" class="icon is-small is-right clear-icon">
          <a @click="clearSearch">
            <i class="fas fa-times"></i>
          </a>
        </span>
      </p>
      <div class="results-ctn">
        <transition name="fade" tag="div">
          <div v-if="personResults.length !== 0" class="field results">
            <article
              @click="setPerson(result)"
              v-for="(result, index) in filteredResults"
              :key="index"
            >
              <div
                class="media result"
                :ref="'result' + index"
                tabindex="0"
                @keyup.down="resultsDownButton(index + 1)"
                @keyup.up="resultsUpButton(index - 1)"
                @keyup.enter="setPerson(result)"
              >
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img
                      :src="getPersonPhoto(result.profile_path)"
                      @error="imgError"
                    />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ result.name }}</strong>
                      <br />
                      {{
                        result.known_for
                          .map(title => {
                            return title.original_name
                              ? title.original_name
                              : title.title;
                          })
                          .join(", ")
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import tmdb from "../services/axios";
export default {
  props: {
    otherPerson: {
      type: Object,
      required: false
    },
    placeHolderName: {
      type: String,
      required: true
    }
  },
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
    clearSearch: function() {
      this.personName = "";
      this.$refs.input.focus();
      this.personResults = [];
      this.$emit("clearPerson");
    },
    resultsDownButton: function(index) {
      if (index < this.personResults.length) {
        let result = `result${index}`;
        this.$refs[result][0].focus();
      }
    },
    resultsUpButton: function(index) {
      console.log(index);
      if (index === -1) {
        this.$refs.input.focus();
      } else {
        let result = `result${index}`;
        this.$refs[result][0].focus();
      }
    },
    getPersonPhoto: function(photo) {
      return `http://image.tmdb.org/t/p/w92/${photo}`;
    },
    searchPerson: function(person) {
      if (person.length > 2) {
        tmdb.personSearch(person).then(response => {
          this.personResults = response.results.slice(0, 5);
        });
      }
    },
    imgError: function(img) {
      img.target.src = require("../assets/images/default_person_64w.svg");
    },
    setPerson({ name, id, profile_path }) {
      this.$emit("clearPerson");
      this.personResults.length = 0;
      this.personName = name;

      tmdb.personIdSearch(id).then(response => {
        this.$emit("confirmPerson", {
          personName: name,
          personId: id,
          personPic: profile_path,
          personImdbId: response.imdb_id
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.name-field {
  margin-bottom: 0.25rem !important;
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
}
.clear-icon {
  pointer-events: initial !important;
}
.results-ctn {
  position: relative;
  width: 100%;
}
.results {
  width: 100%;
  position: absolute;
  z-index: 1;
  color: #1f1f1f;
  // padding: 0.5rem;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid var(--mainColor);
  overflow: hidden;
  //   box-shadow: 0 0 10px var(--shadowColor1), 5px 5px 10px var(--shadowColor2);
  p {
    height: 100%;
    color: #1f1f1f;
  }
  img {
    border-radius: 5px;
  }
}

.result {
  padding: 0.5rem;
  border-bottom: 1px solid #efefef;
  // margin-top: 1rem;
}

.result:focus {
  background: #e1e1e1;
  // outline: none;
  outline: 1px solid var(--mainColor);
}

.fade-enter-active {
  transition: opacity 0.5s linear;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
